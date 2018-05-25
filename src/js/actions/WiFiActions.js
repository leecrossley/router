/* @flow */

import fjs from "functional.js";
import Router from "./Router";

class Wifi {

    static getSettings(type: string): Promise {
        return new Promise((l, r) => {
            Router.api(`wifi/${type}`)
              .then(l)
              .catch(r);
        });
    }

    static getAllSettings(): Promise {
        return new Promise((l, r) => {

            let allSettings = [
                this.getSettings("radio"),
                this.getSettings("ap"),
                this.getSettings("guests"),
                this.getSettings("hotspot")
            ];

            Promise.all(allSettings)
                .then(this.combine)
                .then(l)
                .catch(r);
        });
    }

    static combine(res: Array<Object>): Array<Object> {
        let radio = window.JSON.parse(res[0]);
        let ap = window.JSON.parse(res[1]);

        let wifi = fjs.map((r, i) => {
            return fjs.assign(r, ap[i]);
        }, radio);

        return [
            wifi,
            window.JSON.parse(res[2]),
            window.JSON.parse(res[3])
        ];
    }

    static setSettings(type: string, id: number, toUpdate: Object): Promise {
        return new Promise((l, r) => {
            let payload = JSON.stringify(fjs.assign({
                id: id
            }, toUpdate));

            /*RouterStore.api(`wifi/${type}`, "PUT", payload)
                .then(l)
                .catch(r);*/
        });
    }

}

export default Wifi;
