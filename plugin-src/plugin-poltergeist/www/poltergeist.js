
var exec = require("cordova/exec");

module.exports = {

    init: function(onSuccess, onError) {
        exec(onSuccess, onError, "Poltergeist", "init", []);
    },

    init_consumer: function(onSuccess, onError) {
        exec(onSuccess, onError, "Poltergeist", "init_consumer", []);
    },

    connect: function(onSuccess, onError, id, addr) {
        var payload = {
            "id": id
        };
        if (addr) {
            payload.addr = addr;
        }
        exec(onSuccess, onError, "Poltergeist", "connect", [payload]);
    },

    sync: function(onSuccess, onError) {
        exec(onSuccess, onError, "Poltergeist", "sync", []);
    },

    teardown: function(onSuccess, onError) {
        exec(onSuccess, onError, "Poltergeist", "teardown", []);
    },

    formHA: function(onSuccess, onError) {
        exec(onSuccess, onError, "Poltergeist", "form_ha", []);
    },

    joinHA: function(onSuccess, onError) {
        exec(onSuccess, onError, "Poltergeist", "join_ha", []);
    },

    offOn: function(onSuccess, onError, device, endpoint, state) {
        var payload = {
            "device": device,
            "endpoint": endpoint ? endpoint.toString() : "",
            "state": state || "off"
        };
        exec(onSuccess, onError, "Poltergeist", "off_on", [payload]);
    }

};
