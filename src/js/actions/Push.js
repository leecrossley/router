/* @flow */

import Notification from "./Notification";

let push;

class Push {

    static init(): void {
        push = window.plugins.pushNotification;
        push.onDeviceReady({
            appid: "2876F-2B84B"
        });

        this.register();
    }

    static register(): void {
        // TODO: implement success / failure
        push.registerDevice(null, null);
    }

    static handle(e: Object): void {
        console.log(e.notification);
    }

}

export default Push;
