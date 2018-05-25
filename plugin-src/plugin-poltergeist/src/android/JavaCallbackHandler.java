package com.presciense.poltergeist;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;

import android.util.Log;

public class JavaCallbackHandler implements JavaCallback {
    private static final String TAG = "Callback";
    private CallbackContext context;

    protected JavaCallbackHandler(CallbackContext c) {
        context = c;
    }

    public void handle(String json) {
        Log.v(TAG, "json=" + json);

        PluginResult result = new PluginResult(PluginResult.Status.OK, json);
        result.setKeepCallback(true);
        context.sendPluginResult(result);
    }
}
