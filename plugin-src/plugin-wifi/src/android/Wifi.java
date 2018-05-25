package com.presciense.wifi;

import android.annotation.SuppressLint;
import java.util.List;

import android.net.NetworkInfo;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiEnterpriseConfig;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiInfo;
import android.net.wifi.SupplicantState;
import android.content.Context;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

@SuppressLint("DefaultLocale")
public class Wifi extends CordovaPlugin {

    private CallbackContext callback;
    private Context context;
    private WifiManager wifiManager;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        context = cordova.getActivity().getApplicationContext();
        wifiManager = getWifiManager();
        wifiManager.setWifiEnabled(true);
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        callback = callbackContext;

        if (action.equalsIgnoreCase("scan")) {
            if (wifiManager.startScan()) {
                return ok();
            }
            return err("Unable to start scan");
        }

        if (action.equalsIgnoreCase("results")) {
            List<ScanResult> results = wifiManager.getScanResults();
            JSONArray json = new JSONArray();

            for (ScanResult result : results) {
                JSONObject network = new JSONObject();
                try {
                    network.put("level", wifiManager.calculateSignalLevel(result.level, 4));
                    network.put("ssid", result.SSID);
                    network.put("capabilities", result.capabilities);
                    json.put(network);

                } catch (JSONException e) {
                    return err(e.toString());
                }
            }

            return ok(json, false);
        }

        if (action.equalsIgnoreCase("add")) {
            String ssid = getJSONProperty(args.getJSONObject(0), "ssid");
            String password = getJSONProperty(args.getJSONObject(0), "password");

            if (password.length() < 8) {
                return err("Your password is at least 8 characters long");
            }

            WifiConfiguration wifiConfig = new WifiConfiguration();
            wifiConfig.SSID = String.format("\"%s\"", ssid);

            if (password == null || password.isEmpty()) {
                wifiConfig.allowedKeyManagement.set(WifiConfiguration.KeyMgmt.NONE);
            } else {
                wifiConfig.preSharedKey = String.format("\"%s\"", password);
            }

            int id = getNetworkId(ssid);

            if (id < 0) {
                id = wifiManager.addNetwork(wifiConfig);
            } else {
                wifiManager.updateNetwork(wifiConfig);
            }

            wifiManager.disconnect();
            wifiManager.enableNetwork(id, true);

            SupplicantState state = wifiManager.getConnectionInfo().getSupplicantState();
            return ok(state.toString(), false);
        }

        if (action.equalsIgnoreCase("connect")) {
            String ssid = getJSONProperty(args.getJSONObject(0), "ssid");
            int id = getNetworkId(ssid);

            if (id < 0) {
                return err("SSID not in known networks");
            }

            wifiManager.disableNetwork(id);
            wifiManager.enableNetwork(id, true);

            SupplicantState state = wifiManager.getConnectionInfo().getSupplicantState();
            return ok(state.toString(), false);
        }

        if (action.equalsIgnoreCase("disconnect")) {
            wifiManager.disconnect();
            return ok();
        }

        if (action.equalsIgnoreCase("current")) {
            WifiInfo info = wifiManager.getConnectionInfo();

            if (info == null) {
                return err("No connection info available");
            }

            String ssid = info.getSSID();

            if (ssid == null || ssid.isEmpty()) {
                return err("No ssid");
            }

            int rssi = wifiManager.getConnectionInfo().getRssi();
            int level = wifiManager.calculateSignalLevel(rssi, 4);

            JSONObject current = new JSONObject();
            try {
                current.put("rssi", level);
                current.put("ssid", unornamate(ssid));

            } catch (JSONException e) {
                return err(e.toString());
            }

            return ok(current, false);
        }

        return err("Invalid action: " + action);
    }

    private int getNetworkId(String ssid) {
        for (WifiConfiguration c : wifiManager.getConfiguredNetworks()) {
            if (c.SSID.equalsIgnoreCase(ssid)) {
                return c.networkId;
            }
        }
        return -1;
    }

    private String getJSONProperty(JSONObject json, String property) throws JSONException {
        if (json.has(property)) {
            return json.getString(property);
        }
        return null;
    }

    private WifiManager getWifiManager() {
        return (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
    }

    private String unornamate(String ssid) {
        ssid = ssid.replaceFirst("^\"", "");
        return ssid.replaceFirst("\"$", "");
    }

    private boolean ok() {
        return ok(false);
    }

    private boolean ok(boolean keepCallback) {
        PluginResult result = new PluginResult(PluginResult.Status.OK);
        result.setKeepCallback(keepCallback);
        callback.sendPluginResult(result);
        return true;
    }

    private boolean ok(JSONArray json, boolean keepCallback) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, json);
        result.setKeepCallback(keepCallback);
        callback.sendPluginResult(result);
        return true;
    }

    private boolean ok(JSONObject json, boolean keepCallback) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, json);
        result.setKeepCallback(keepCallback);
        callback.sendPluginResult(result);
        return true;
    }

    private boolean ok(String msg, boolean keepCallback) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, msg);
        result.setKeepCallback(keepCallback);
        callback.sendPluginResult(result);
        return true;
    }

    private boolean err(String msg) {
        PluginResult result = new PluginResult(PluginResult.Status.ERROR, msg);
        callback.sendPluginResult(result);
        return false;
    }

}
