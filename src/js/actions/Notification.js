/* @flow */

import translate from "counterpart";

class Notification {

    static defaultActions(): Array <string> {
        return [
            translate("general.confirm"),
            translate("general.cancel")
        ];
    }

    static alert(msg: string, title: ?string): Promise {
        return new Promise((l, r) => {
            title = title || translate("general.notice");
            window.navigator.notification.alert(msg, l, title);
        });
    }

    static confirm(msg: string): Promise {
        return new Promise((l, r) => {

            window.navigator.notification.confirm(msg, (i) => {
                return i === 1 ? l() : r();
            }, translate("general.confirm"), this.defaultActions());
        });
    }

    static prompt(msg: string, current: ?string): Promise {
        return new Promise((l, r) => {

            window.navigator.notification.prompt("", (res) => {
                return res.buttonIndex === 1 ? l(res.input1) : r();
            }, msg, this.defaultActions(), current);
        });
    }

    static option(msg: string, actions: Array <string>): Promise {
        return new Promise((l, r) => {

            window.navigator.notification.confirm("", (i) => {
                return i !== actions.length ? l(i) : r();
            }, msg, actions);
        });
    }
}

export default Notification;
