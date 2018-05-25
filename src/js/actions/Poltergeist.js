/* @flow */

import DeviceType from "../utils/DeviceType";
import fjs from "functional.js";

let pollingSyncHack;

class Poltergeist {

    static cb(json): void {
        if (!json || json === "OK") {
            return;
        }
        json = window.JSON.parse(json);
        console.log(json);

        if (json.hasOwnProperty("poltergeistavailable")) {
            this.poltergeistavailable(json.poltergeistavailable);
        }

        if (json.hasOwnProperty("connectionstatuschanged")) {
            this.connectionstatuschanged(json.connectionstatuschanged);
        }

        if (json.hasOwnProperty("devicestatechanged")) {
            fjs.each(this.devicestatechanged, json.devicestatechanged);
        }
    }

    static init_consumer() {
        window.poltergeist.init_consumer(this.cb.bind(this), (err) => {
            console.log(err);
            window.setTimeout(this.init_consumer.bind(this), 1000);
        });
    }

    // TODO: maybe move this to native and auto
    // re-init if poltergeist thread restarted etc?
    static init_polaris() {
        window.poltergeist.init(this.cb.bind(this), (err) => {
            console.log(err);
            window.setTimeout(this.init_polaris.bind(this), 1000);
        });
    }

    static poltergeistavailable(json) {
        if (!json.have_credentials) {
            console.log(`No credentials for ${json.id}`);
            // TODO: offer registration if LAN
            // return;
        }

        if (json.location.type !== "lan") {
            return console.log("Testing LAN only");
        }

        window.poltergeist.connect(null, (err) => {
            console.log(err);
            window.setTimeout(this.poltergeistavailable.bind(this, json), 1000);
        }, json.id, json.location.addr);
    }

    // TODO: basically this is required as callbacks
    // don't happen on restart and `sync` is required
    // at polling interval :(
    static doPollingHack(): void {
        console.log("starting polling");
        if (!!pollingSyncHack) {
            console.log("clearing old poll");
            window.clearInterval(pollingSyncHack);
            pollingSyncHack = undefined;
        }

        pollingSyncHack = window.setInterval(() => {
            window.poltergeist.sync(null, null);
        }, 1000);
    }

    static connectionstatuschanged(json) {
        console.log(json.status);
        if (DeviceType.polaris()) {
            if (json.status === "connected") {
                this.doPollingHack();
            }
            return;
        }

        if (json.type.type !== "lan") {
            return console.log("Testing LAN only");
        }

        if (json.status === "seeking") {
            return; // not snacking this and currently not working
        }

        let connectionEvent = new CustomEvent("connectionstatus", {
            "detail": json.status // ["connecting", "connected", "disconnected", "reconnecting"]
        });

        document.dispatchEvent(connectionEvent);

        // TODO: properly
        if (json.status === "connected") {
            this.doPollingHack();
        }
    }

    static devicestatechanged(device) {
        // TODO: "smart meter"
        if (device.thingName === "000d6f000bbc51f3") {
            const current = device.attributes.rms_current.value;
            const volt = device.attributes.rms_voltage.value;
            const w = current * volt / 1000;

            let instantEvent = new CustomEvent("instant", {
                "detail": w
            });

            document.dispatchEvent(instantEvent);
        } else if (device.thingName === "000d6f000b93ab53") {
            const current = device.attributes.rms_current.value;
            const volt = device.attributes.rms_voltage.value;
            let w = (current / 1000) * volt / 1000;
            w = Math.round(w * 100) / 100;

            let plugEvent = new CustomEvent("plug", {
                "detail": {
                    kWh: w,
                    on: device.attributes.on_off
                }
            });

            document.dispatchEvent(plugEvent);
        }
    }

}

export default Poltergeist;
