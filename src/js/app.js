/* @flow */

import ReactDOM from "react-dom";
import TapEventPlugin from "react-tap-event-plugin";
import Translator from "./utils/Translator";
import DeviceType from "./utils/DeviceType";
import Tracking from "./utils/Tracking";
import Orientation from "./actions/Orientation.js";
import Poltergeist from "./actions/Poltergeist.js";
import Push from "./actions/Push";

import routes from "./routes";

const init = () => {
    Translator.init();
    TapEventPlugin();
    Orientation.force();

    // Tracking.start();
    Push.init();

    SocialVk.init("6162518", () => {
        SocialVk.logout();
    });

    window.setTimeout(() => {
        window.StatusBar.show();
        window.StatusBar.styleLightContent();
        window.navigator.splashscreen.hide();
    }, 1000);

    ReactDOM.render(routes, document.getElementById("app"));
    window.location.hash = "/home";
};

const back = () => {
    window.history.back();

    setTimeout(() => {
        if (window.location.hash.indexOf("/signin") > -1) {
            window.navigator.app.exitApp();
        }
    });
};

const memorywarning = () => {
    const json = {
        memoryWarning: true
    };
    Tracking.meta(json);
    Tracking.track("memorywarning");
};

document.addEventListener("deviceready", init, false);
document.addEventListener("backbutton", back, false);
document.addEventListener("memorywarning", memorywarning, false);
document.addEventListener("push-notification", Push.handle, false);
