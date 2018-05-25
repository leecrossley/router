package com.presciense.poltergeist;

import android.annotation.SuppressLint;

import android.app.Activity;
import android.os.Bundle;
import android.content.Context;
import android.util.Log;

import java.io.File;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

@SuppressLint("DefaultLocale")
public class Poltergeist extends CordovaPlugin implements PoltergeistThreadListener {

    private static final String TAG = "POLTERGEIST";
    private CallbackContext context;
    private SWIGTYPE_p_Client client;

    static {
        System.loadLibrary("consumer_client");
        System.loadLibrary("consumer_client_wrap");
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        if (polaris()) {
            startService();
        }
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        context = callbackContext;

        if (action.equalsIgnoreCase("init")) {
            try {
                JavaCallbackHandler callback = new JavaCallbackHandler(context);
                client = consumer_client.init_ihd("/data/local/certs/gateway/", callback, (short)4);
                return ok(true);

            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
                return err("Unable to initialise client");
            }
        }

        if (action.equalsIgnoreCase("init_consumer")) {
            try {
                JavaCallbackHandler callback = new JavaCallbackHandler(context);
                String filesPath = cordova.getActivity().getFilesDir().getAbsolutePath();
                String oort = "mqtt.dev.polaris.prescien.se:8883";

                client = consumer_client.init_mobile(filesPath, filesPath, oort, callback, (short)4);
                return ok(true);

            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
                return err("Unable to initialise client");
            }
        }

        if (client == null) {
            return err("Client not initialised");
        }

        if (action.equalsIgnoreCase("sync")) {
            consumer_client.sync_all_available_devices(client);
            return ok();
        }

        if (action.equalsIgnoreCase("teardown")) {
            consumer_client.teardown(client);
            client = null;
            return ok();
        }

        if (action.equalsIgnoreCase("form_ha")) {
            consumer_client.form_ha_network(client);
            return ok();
        }

        if (action.equalsIgnoreCase("join_ha")) {
            consumer_client.permit_join(client, (short)255);
            return ok();
        }

        if (action.equalsIgnoreCase("off_on")) {
            String state = getJSONProperty(args.getJSONObject(0), "state");
            String device = getJSONProperty(args.getJSONObject(0), "device");
            short endpoint = Short.parseShort(getJSONProperty(args.getJSONObject(0), "endpoint"));

            if (state.equalsIgnoreCase("on")) {
                consumer_client.on_off_turn_on(client, device, endpoint);
            } else {
                consumer_client.on_off_turn_off(client, device, endpoint);
            }
            return ok();
        }

        return err("Invalid action: " + action);
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);

        if (client != null) {
            consumer_client.teardown(client);
            client = null;
        }
    }

    private boolean polaris() {
        Log.d(TAG, android.os.Build.MODEL);
        return true; // android.os.Build.MODEL == "sercomm23_gw_m";
    }

    private void startService() {
        final String[] cmd = new String[] {
            "/data/local/p",
            "-c",
            "/data/local/poltergeist.toml",
            "-l",
            "debug"
        };

        PoltergeistThread thread = new PoltergeistThread() {
            public void doRun() {
                int exitCode = 0;
                try {
                    Process p = Runtime.getRuntime().exec(cmd, null, new File("/data/local"));
                    BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        // log the logs
                        Log.v(TAG, line);
                    }
                    exitCode = p.waitFor();
                } catch (Exception e) {
                    Log.e(TAG, e.getMessage());
                } finally {
                    if (exitCode != 0) {
                        Log.d(TAG, "Exit code: " + exitCode);
                    }
                }
            }
        };

        //thread.start();
        //thread.addListener(this);
    }

    public void onThreadExit(Thread thread) {
        startService();
    }

    private String getJSONProperty(JSONObject json, String property) throws JSONException {
        if (json.has(property)) {
            return json.getString(property);
        }
        return null;
    }

    private boolean ok() {
        return ok(false);
    }

    private boolean ok(boolean keepCallback) {
        PluginResult result = new PluginResult(PluginResult.Status.OK);
        result.setKeepCallback(keepCallback);
        context.sendPluginResult(result);
        return true;
    }

    private boolean err(String msg) {
        PluginResult result = new PluginResult(PluginResult.Status.ERROR, msg);
        context.sendPluginResult(result);
        return false;
    }

}
