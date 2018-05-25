/* @flow */

import translate from "counterpart";

class Market {

    static open(name: string): void {
        let platform = window.device.platform.toLowerCase();
        let store = (platform === "ios") ? "itunes" : "google_play";
        window.cordova.plugins.market.open(translate(`${name}.${store}`));
    }
}

export default Market;
