/* @flow */

import jsHue from "jsHue";

class Hue {

    hugo: Object;

    constructor() {
        let bridge = jsHue().bridge("192.168.8.100");
        this.hugo = bridge.user("UGSfF-ppnS8p8wEPuOCNWtOGz3Sx9xihC6K4GHnl");
    }

    getState(): Promise {
        return new Promise((l, r) => {
            this.hugo.getLight(3)
                .then(l)
                .catch(r);
        });
    }

    changeState(on: boolean): void {
        this.hugo.setLightState(3, {
            on: on
        });
    }

    changeColour(xy: Array<number>): void {
        this.hugo.setLightState(3, {
            on: true,
            bri: 254,
            xy: xy
        });
    }

}

module.exports = new Hue();
