
var exec = require("cordova/exec");

module.exports = {

    scan: function(onSuccess, onError) {
        exec(onSuccess, onError, "Wifi", "scan", []);
    },

    results: function(onSuccess, onError) {
        exec(onSuccess, onError, "Wifi", "results", []);
    },

    add: function(onSuccess, onError, ssid, password) {
        var payload = {
            "ssid": ssid,
            "password": password
        };
        exec(onSuccess, onError, "Wifi", "add", [payload]);
    },

    connect: function(onSuccess, onError, ssid) {
        var payload = {
            "ssid": ssid
        };
        exec(onSuccess, onError, "Wifi", "connect", [payload]);
    },

    disconnect: function(onSuccess, onError) {
        exec(onSuccess, onError, "Wifi", "disconnect", []);
    },

    current: function(onSuccess, onError) {
        exec(onSuccess, onError, "Wifi", "current", []);
    }

};
