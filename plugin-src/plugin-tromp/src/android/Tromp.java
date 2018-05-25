package com.presciense.tromp;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.os.PowerManager;
import android.os.RecoverySystem;
import android.os.Build;
import android.util.Log;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import java.util.Timer;
import java.util.TimerTask;
import java.io.BufferedReader;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.HttpURLConnection;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

public class Tromp extends CordovaPlugin {

    private static final String TAG = "TROMP";
    private static final int BUFFER_SIZE = 8192;
    private static final String DOWNLOAD_DIR = "/cache";
    private static final String CERT_DIR = "system/etc/presciense/";
    private static final String FILE_TMP_EXT = ".tmp";
    private static final String BUILD_FILE = "/system/etc/presciense/buildnumber";
    private static final String BASE_URI = "https://ota.dev.polaris.prescien.se/";
    private static final String START_URI = BASE_URI + "firmware/start";
    private static final String SUCCESS_URI = BASE_URI + "firmware/success";
    private static final String CHECK_URI = BASE_URI + "check_for_updates";
    private static Context context;
    private static String eui;
    private static String build;
    private static String method = "diff";
    private static String newVersion = "edge";
    private static Boolean downloading = false;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        context = cordova.getActivity().getApplicationContext();

        eui = getEUI();
        Log.v(TAG, "EUI: " + eui);

        build = getBuild();
        Log.v(TAG, "Build: " + build);

        scheduleChecks();
        // notifySuccess();
    }

    private void scheduleChecks() {
        Log.v(TAG, "Scheduling checks");
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                Log.v(TAG, "Running update task");
                if (downloading) {
                    Log.v(TAG, "Download already in progress");
                } else {
                    cleanTmpFiles();
                    check();
                }
            }
        }, 0, 60000); // 1 min for testing
    }

    private static String getBuild() {
        BufferedReader reader = null;

        try {
            reader = new BufferedReader(new FileReader(BUILD_FILE));
            return reader.readLine();

        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            return "0";

        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
            }
        }
    }

    private static String getEUI() {
        try {
            for (File file : new File(CERT_DIR).listFiles()) {
                if (!file.isFile()) {
                    continue;
                }

                String name = file.getName();
                int pos = name.indexOf(".key.pem");
                if (pos == -1) {
                    continue;
                }
                return name.substring(0, pos);
            }
            return "0000000000000000";

        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            return "0000000000000000";
        }
    }

    private void check() {
        try {
            URL url = new URL(CHECK_URI + "?eui=" + eui + "&version=" + build);
            Log.v(TAG, "Downloading manifest: " + url);

            HttpURLConnection request = (HttpURLConnection) url.openConnection();
            request.connect();

            InputStream in = (InputStream)request.getContent();
            JSONObject json = new JSONObject(streamToString(in));

            String downloadUrl;

            if (!json.isNull("url")) {
                Log.v(TAG, "Diff update is available");
                downloadUrl = json.getString("url");
                method = "diff";
            } else if (!json.isNull("url_full")) {
                Log.v(TAG, "Full update is available");
                downloadUrl = json.getString("url_full");
                method = "full";
            } else {
                Log.v(TAG, "No diff or full update is available");
                return;
            }

            if (!json.isNull("new_version")) {
                newVersion = json.getString("new_version");
            }

            Log.v(TAG, "Downloading update: " + downloadUrl);
            download(downloadUrl);

        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

    private void cleanTmpFiles() {
        Log.v(TAG, "Cleaning any .tmp files");

        File dir = new File(DOWNLOAD_DIR);
        File[] files = dir.listFiles(new GenericExtFilter(FILE_TMP_EXT));

        for (File file : files) {
            if (!file.isDirectory()) {
                boolean result = file.delete();
                Log.v(TAG, "Deleted:" + result);
            }
        }
    }

    private void download(String url) {
        downloading = true;

        InputStream in = null;
        OutputStream out = null;
        File tmp = null;
        final String ota = DOWNLOAD_DIR + "/ota.zip";

        try {
            tmp = File.createTempFile("ota", FILE_TMP_EXT, new File(DOWNLOAD_DIR));
            in = new URL(url).openStream();
            out = new BufferedOutputStream(new FileOutputStream(tmp));
            copyStream(in, out);
            out.close();
            out = null;

            tmp.renameTo(new File(ota));
            tmp = null;

            final Runnable updater = new Runnable() {
                public void run() {
                    Log.v(TAG, "Running update");
                    update(ota);
                }
            };
            updater.run();

        } catch (IOException e) {
            Log.e(TAG, e.getMessage());

        } finally {
            if (tmp != null) {
                try {
                    tmp.delete();
                    tmp = null;
                } catch (Exception e) {
                    Log.d(TAG, e.getMessage());
                }
            }
            if (in != null) {
                try {
                    in.close();
                    in = null;
                } catch (Exception e) {
                    Log.d(TAG, e.getMessage());
                }
            }
            if (out != null) {
                try {
                    out.close();
                    out = null;
                } catch (Exception e) {
                    Log.d(TAG, e.getMessage());
                }
            }
            downloading = false;
            Log.v(TAG, "Clean up done");
        }
    }

    private static void copyStream(InputStream in, OutputStream out) {
        byte[] buffer = new byte[BUFFER_SIZE];
        int count = 0;

        try {
            while ((count = in.read(buffer, 0, BUFFER_SIZE)) != -1) {
                out.write(buffer, 0, count);
            }

        } catch (IOException e) {
            Log.e(TAG, e.getMessage());
        }
    }

    private static String streamToString(InputStream in) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        StringBuilder sb = new StringBuilder();

        String line = null;
        try {
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                Log.e(TAG, e.getMessage());
            }
        }
        return sb.toString();
    }

    private boolean update(String zipPath) {
        File file = new File(zipPath);
        File publicKeys = new File("/system/etc/presciense/otacerts.zip");

        try  {
            Log.v(TAG, "Performing update");
            RecoverySystem.verifyPackage(file, null, publicKeys);
            RecoverySystem.installPackage(context, file);

            notifyStart();
            return true;

        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }

        return false;
    }

    private void notifyStart() {
        try {
            URL url = new URL(START_URI + "?eui=" + eui
                + "&from=" + build + "&to=" + newVersion + "&method=" + method);
            HttpURLConnection request = (HttpURLConnection) url.openConnection();
            request.setRequestMethod("PUT");
            request.getResponseCode();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

    private void notifySuccess() {
        try {
            URL url = new URL(SUCCESS_URI + "?eui=" + eui + "&to=" + build);
            HttpURLConnection request = (HttpURLConnection) url.openConnection();
            request.setRequestMethod("PUT");
            request.getResponseCode();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

    public class GenericExtFilter implements FilenameFilter {
    	private String ext;

    	public GenericExtFilter(String ext) {
    		this.ext = ext;
    	}

    	public boolean accept(File dir, String name) {
    		return (name.endsWith(ext));
    	}
    }

}
