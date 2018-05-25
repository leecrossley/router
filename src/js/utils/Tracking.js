/* @flow */

import DeviceType from "./DeviceType";

class Tracking {

    static start(): void {
        if (!DeviceType.polaris()) {
            // Only track polaris for now
            return;
        }
        const autoSendCrashReports = true;
        const hockeyAppId = "92ec8e2fef85424a832a2d5c110c1051";

        window.hockeyapp.start(this.setEUI.bind(this),
            this.start.bind(this), hockeyAppId, autoSendCrashReports);
    }

    static meta(json: Object): void {
        if (!json) {
            return;
        }
        if (!json.eui) {
            json.eui = "0000000000000000";
        }
        if (!json.time) {
            json.time = new Date().getTime();
        }
        window.hockeyapp.addMetaData(null, this.meta.bind(this, json), json);
    }

    static track(code: String): void {
        window.hockeyapp.trackEvent(null, this.track.bind(this, code), code);
    }

    static setEUI(): void {
        const eui = "0000000000000000"; // TODO: get this from Java
        window.hockeyapp.setUserName(null, this.setEUI.bind(this), eui);
    }


}

export default Tracking;
