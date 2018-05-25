/* @flow */

import Router from "./Router";

class Diagnostics {

    static results(): Promise {
        return new Promise((l, r) => {
            Router.api("diagnoses")
                .then(l)
                .catch(r);
        });
    }

    static run(): Promise {
        return new Promise((l, r) => {
            const payload = {
                diagnoseActivate: true
            };

            Router.api("diagnoses", "PUT", payload)
                .then(l)
                .catch(r);
        });
    }

}

export default Diagnostics;
