var cordova = (function () {
    "use strict";

    var cordova = {};

    cordova.m_addEventListener = document.addEventListener;

    document.addEventListener = function (e, handler, capture) {
        if (e.toLowerCase() === "deviceready") {
            if ((typeof (handler) === "undefined") || (typeof (handler) !== "function")) {
                return;
            }
            var loaded = function () {
                document.removeEventListener("DOMContentLoaded", loaded, false);
                setTimeout(handler, 500);
            };
            document.addEventListener("DOMContentLoaded", loaded, false);
        } else {
            cordova.m_addEventListener.call(document, e, handler, capture);
        }
    };

    return cordova;
}());

window.device = {
    uuid: "Test",
    platform: "android",
    model: "sercomm23_gw_m",
    isVirtual: true
};

window.wifi = (function () {
    "use strict";

    var wifi = {};
    var results = [];

    wifi.scan = function (a, b) {
        console.log("wifi.scan()");
        setTimeout(a);
        setTimeout(function () {
            results = [{
                "ssid": "test 1",
                "level": 0,
                "capabilities": "[WPA2]"
            }, {
                "ssid": "test 2",
                "level": 2,
                "capabilities": "[NONE]"
            }, {
                "ssid": "",
                "level": 1,
                "capabilities": "[WEP]"
            }];
        }, 2000);
    };

    wifi.results = function (a, b) {
        console.log("wifi.results()");
        setTimeout(function () {
            a(results);
        });
    };

    wifi.add = function (a, b, c, d) {
        console.log("wifi.add(" + c + " " + d + ")");
        setTimeout(a);
    };

    wifi.current = function (a, b) {
        if (Math.random() >= 0.5) {
            return setTimeout(b);
        }
        if (Math.random() >= 0.5) {
            return setTimeout(a.bind(this, {"ssid": "test 1", "rssi": 3}));
        }
        return setTimeout(a.bind(this, {"ssid": "test 2", "rssi": 1}));
    };

    return wifi;
}());

cordova.plugins = {};

cordova.plugins.Keyboard = (function () {
    "use strict";

    var keyboard = {};

    keyboard.disableScroll = function (a) {
        console.log("cordova.plugins.Keyboard.disableScroll(" + a + ")");
    };

    return keyboard;
}());

cordova.plugins.market = (function () {
    "use strict";

    var market = {};

    market.open = function (a) {
        console.log("Open: " + a);
    };

    return market;
}());

var plugins = {};

plugins.insomnia = (function () {
    "use strict";

    var insomnia = {};

    insomnia.keepAwake = function () {
        console.log("insomnia.keepAwake");
    };

    return insomnia;
}());

plugins.pushNotification = (function () {
    var pushNotification = {};

    pushNotification.onDeviceReady = function (a) {
        console.log(JSON.stringify(a));
    };

    pushNotification.registerDevice = function (a, b) {
        if (a) {
            setTimeout(a, 10);
        }
    };

    return pushNotification;
}());

var AndroidFullScreen = (function () {
    var AndroidFullScreen = {};

    AndroidFullScreen.immersiveMode = function () {
        console.log("AndroidFullScreen.immersiveMode()");
    };

    return AndroidFullScreen;
}());

plugins.uniqueDeviceID = (function () {
    "use strict";

    var uniqueDeviceID = {};

    uniqueDeviceID.get = function (a) {
        setTimeout(a.bind(null, "Test"), 10);
    };

    return uniqueDeviceID;
}());

plugins.nativepagetransitions = (function () {
    "use strict";

    var nativepagetransitions = {};

    nativepagetransitions.slide = function (a) {
        console.log("cordova.plugins.nativepagetransitions.slide(" + JSON.stringify(a) + ")");
    };

    nativepagetransitions.executePendingTransition = function () {
        console.log("cordova.plugins.nativepagetransitions.executePendingTransition()");
    };

    return nativepagetransitions;
}());

plugins.CallNumber = (function () {
    var CallNumber = {};

    CallNumber.callNumber = function (a, b, c) {
        alert("Calling " + c);
    };

    return CallNumber;
}());

navigator.splashscreen = (function () {
    "use strict";

    var splashscreen = {};

    splashscreen.hide = function () {
    };

    splashscreen.show = function () {
    };

    return splashscreen;
}());

navigator.notification = (function () {
    "use strict";

    var notification = {};

    notification.alert = function (message, callback) {
        window.alert(message);
        if (callback) {
            callback();
        }
    };

    notification.confirm = function (message, callback, title, actions) {
        var buttons = [];
        for (var i = 0; i < actions.length; i += 1) {
            buttons.push({
                text: actions[i],
                onClick: callback.bind(this, i + 1)
            });
        }
        window.f7app.modal({
            title: title,
            buttons: buttons,
            verticalButtons: true
        });
    };

    notification.prompt = function (message, callback, title, buttonLabels, defaultText) {
        setTimeout(function() {
            var result = window.prompt(message, defaultText || "");
            if (callback) {
                if (result === null) {
                    callback({ buttonIndex: 2, input1: "" });
                }
                else {
                    callback({ buttonIndex: 1, input1: result });
                }
            }
        }, 0);
    };

    notification.vibrate = function (message) {
        console.log("navigator.notification.vibrate()");
    };

    notification.beep = function (count) {
        console.log("navigator.notification.beep('" + count + "')");
    };

    return notification;
}());

var StatusBar = (function () {
    "use strict";

    var StatusBar = {};

    StatusBar.hide = StatusBar.show = function () {};

    StatusBar.styleLightContent = function () {
    };

    StatusBar.styleDefault = function () {
    };

    StatusBar.styleBlackOpaque = function () {
    };

    return StatusBar;
}());

var getrouteripaddress = (function () {
    "use strict";

    var getrouteripaddress = {};

    getrouteripaddress.getRouterIPAddress = function (cb) {
        cb("localhost:9006");
    };

    return getrouteripaddress;
}());

var portsip = (function () {
    "use strict";

    var portsip = {};

    portsip.login = function (a, b, c) {
        console.log("portsip.login");
        setTimeout(a, 1000);
    };

    portsip.call = function (a, b, c) {
        console.log("portsip.call " + c);
    };

    return portsip;
}());

var SocialVk = (function () {
    "use strict";

    var vk = {};

    vk.init = function (a, b, c) {
        console.log("Init " + a);
        setTimeout(b, 100);
    };

    vk.login = function (a, b, c) {
        console.log("Permissions " + a.join(" "));
        setTimeout(b, 100);
    };

    vk.logout = function (a, b) {
        setTimeout(a, 100);
    };

    return vk;
}());

navigator.app = (function () {
    "use strict";

    var app = {};

    app.exitApp = function () {
        console.log("App exit forced");
    };

    return app;
}());

var Connection = {
    WIFI: "wifi",
    UNKNOWN: "unknown"
};

navigator.connection = {
    type: Connection.UNKNOWN
};

var ThreeDeeTouch = (function () {
    "use strict";

    var ThreeDeeTouch = {};

    ThreeDeeTouch.isAvailable = function (a) {
        a(false);
    };

    return ThreeDeeTouch;
}());

var hockeyapp = (function () {
    var hockeyapp = {};

    hockeyapp.start = function (a, b, c) {
        console.log("hockeyapp.start(" + c + ")");
        if (Math.random() >= 0.5) {
            return setTimeout(a);
        }
        return setTimeout(b);
    };

    hockeyapp.setUserName = function (a, b, c) {
        console.log("hockeyapp.setUserName(" + c + ")");
        if (Math.random() >= 0.5) {
            return setTimeout(a);
        }
        return setTimeout(b);
    };

    hockeyapp.feedback = function (a) {
        console.log("hockeyapp.feedback()");
    };

    hockeyapp.forceCrash = function () {
        console.log("hockeyapp.forceCrash()");
    };

    return hockeyapp;
}());

var poltergeist = (function () {
    var poltergeist = {};
    var callbk;

    var lanPolt = {
        "poltergeistavailable": {
            "have_credentials": true,
            "id": "0000000000000000",
            "location": {
                "addr": "192.168.1.123:8883",
                "type": "lan"
            }
        }
    };

    var connecting = {
        "connectionstatuschanged": {
            "status": "connecting",
            "type": {
                "type": "lan"
            }
        }
    };

    var connected = {
        "connectionstatuschanged": {
            "status": "connected",
            "type": {
                "type": "loopback"
            }
        }
    };

    var deviceChange = {
    	"devicestatechanged": [{
    		"attributes": {
    			"deviceinfo": {
    				"commands": [],
    				"prototype": "gateway"
    			},
    			"hanetwork": {
    				"channels": "0x7FFF800",
    				"extendedpanid": "4c49d1515c3cb08d",
    				"joinmethod": "EMBER_USE_MAC_ASSOCIATION",
    				"networkmanagerid": "0x0",
    				"networkupdateid": "0x0",
    				"panid": "0x2",
    				"radiochannel": 11.0,
    				"radiotxpower": 7.0
    			}
    		},
    		"thingName": "0022080000000002"
    	}, {
    		"attributes": {
    			"ac_current_divisor": 1.0,
    			"ac_current_multiplier": 1.0,
    			"active_power": -1.0,
    			"connectivity": {
    				"lqi": 255.0,
    				"rssi": -58.0
    			},
    			"deviceinfo": {
    				"commands": [{
    					"command": "OnOrOff",
    					"endpoint": 1.0
    				}],
    				"prototype": "centralite_3200"
    			},
    			"manufacturer_name": "CentraLite Systems",
    			"measurement_type": 0.0,
    			"model_identifier": "3200-gb",
    			"on_off": false,
    			"rms_current": {
    				"unitofmeasure": "A",
    				"value": 16
    			},
    			"rms_voltage": {
    				"unitofmeasure": "V",
    				"value": 240.0
    			}
    		},
    		"thingName": "000d6f000bbc51f3"
    	}]
    }

    poltergeist.init = function (a, b) {
        console.log("poltergeist.init()");
        if (Math.random() >= 0.5) {
            callbk = a;
            return setTimeout(callbk.bind(this, JSON.stringify(connected)));
        }
        return setTimeout(b.bind(this, "Unable to init"));
    };

    poltergeist.init_consumer = function (a, b) {
        console.log("poltergeist.init_consumer()");

        if (callbk) {
            return setTimeout(b.bind(this, "Client already initialised"));
        }

        if (Math.random() >= 0.5) {
            return setTimeout(b.bind(this, "Random error"));
        }

        callbk = a;
        setTimeout(callbk);

        setTimeout(callbk.bind(this, JSON.stringify(lanPolt)), 2000);
    };

    poltergeist.sync = function (a, b) {
        console.log("poltergeist.sync()");
        if (Math.random() >= 0.5) {
            setInterval(() => {
                var current = Math.floor(Math.random()*(15 - 2 + 1) + 2);
                deviceChange.devicestatechanged[1].attributes.rms_current.value = current;
                callbk(JSON.stringify(deviceChange));
            }, 5000);
            return;
        }
        return setTimeout(b.bind(this, "Unable to sync"));
    };

    poltergeist.connect = function (a, b, c, d) {
        console.log("poltergeist.connect(" + c + ", " + d + ")");

        if (!callbk) {
            return setTimeout(b.bind(this, "Client not initialised"));
        }

        if (Math.random() >= 0.5) {
            return setTimeout(callbk.bind(this, JSON.stringify(connecting)), 150);
        }

        return setTimeout(b.bind(this, "Unable to connect"));
    };

    poltergeist.teardown = function (a, b) {
        console.log("poltergeist.teardown()");
        if (Math.random() >= 0.5) {
            callbk = null;
            return setTimeout(a);
        }
        return setTimeout(b);
    };

    return poltergeist;
}());

var analytics = (function () {
    var analytics = {};

    analytics.startTrackerWithId = function (a) {
        console.log("analytics.startTrackerWithId(" + a + ")");
    };

    analytics.trackView = function (a) {
        console.log("analytics.trackView(" + a + ")");
    };

    analytics.trackEvent = function (a, b, c, d, e) {
        console.log("analytics.trackEvent(" + a + ", " + b + ", " + c + ")");
    };

    analytics.setUserId = function (a) {
        console.log("analytics.setUserId(" + a + ")");
    };

    return analytics;
}());

window.ContactFindOptions = function () {};

navigator.contacts = (function () {
    "use strict";

    var contacts = {};

    contacts.find = function (a, b) {
        b([{
            "id": 1,
            "displayName": null,
            "name": {
                "givenName": "Lee",
                "honorificSuffix": null,
                "formatted": "Lee Crossley",
                "middleName": null,
                "familyName": "Crossley",
                "honorificPrefix": null
            },
            "phoneNumbers": [
                {
                    "value": "07515 495890",
                    "pref": false,
                    "id": 0,
                    "type": "mobile"
                },
                {
                    "value": "07515 495891",
                    "pref": true,
                    "id": 1,
                    "type": "iphone"
                },
                {
                    "value": "07515 495892",
                    "pref": false,
                    "id": 1,
                    "type": "work"
                }
            ]
        },
        {
            "id": 2,
            "displayName": null,
            "name": {
                "givenName": "Billy",
                "honorificSuffix": null,
                "formatted": "Bill Kid",
                "middleName": null,
                "familyName": "Kid",
                "honorificPrefix": null
            },
            "phoneNumbers": [
                {
                    "value": "07766 348903",
                    "pref": false,
                    "id": 0,
                    "type": "mobile"
                }
            ]
        },
        {
            "id": 3,
            "displayName": null,
            "name": {
                "givenName": "Test",
                "honorificSuffix": null,
                "formatted": "Test User",
                "middleName": null,
                "familyName": "User",
                "honorificPrefix": null
            },
            "phoneNumbers": [
                {
                    "value": "+44 7000 000000",
                    "pref": true,
                    "id": 0,
                    "type": "mobile"
                }
            ]
        },
        {
            "id": 16,
            "displayName": null,
            "name": {
                "givenName": "Jane",
                "honorificSuffix": null,
                "formatted": "Jane Doe",
                "middleName": null,
                "familyName": "Doe",
                "honorificPrefix": null
            },
            "phoneNumbers": [
                {
                    "value": "07944 166597",
                    "pref": false,
                    "id": 0,
                    "type": "mobile"
                }
            ],
            "photos": [
                {
                    "value": "http://cdn.devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg",
                    "pref": false,
                    "type": "url"
                }
            ]
        },
        {
            "id": 16,
            "displayName": null,
            "name": {
                "givenName": "Lee",
                "honorificSuffix": null,
                "formatted": "Lee Two",
                "middleName": null,
                "familyName": "Two",
                "honorificPrefix": null
            },
            "phoneNumbers": [
                {
                    "value": "07233 456678",
                    "pref": false,
                    "id": 0,
                    "type": "home"
                }
            ]
        }]);
    };

    return contacts;
}());

var audioinput = {};

audioinput.FORMAT = {
    PCM_16BIT: "PCM_16BIT",
    PCM_8BIT: "PCM_8BIT"
};

audioinput.CHANNELS = {
    MONO: 1,
    STEREO: 2
};

audioinput.SAMPLERATE = {
    TELEPHONE_8000Hz: 8000,
    CD_QUARTER_11025Hz: 11025,
    VOIP_16000Hz: 16000,
    CD_HALF_22050Hz: 22050,
    MINI_DV_32000Hz: 32000,
    CD_XA_37800Hz: 37800,
    NTSC_44056Hz: 44056,
    CD_AUDIO_44100Hz: 44100
};

audioinput.AUDIOSOURCE_TYPE = {
    DEFAULT: 0,
    CAMCORDER: 5,
    MIC: 1,
    UNPROCESSED: 9,
    VOICE_COMMUNICATION: 7,
    VOICE_RECOGNITION: 6
};
