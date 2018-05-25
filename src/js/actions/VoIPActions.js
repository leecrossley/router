/* @flow */

class VoIP {

    static register(): Promise {
        return new Promise((l, r) => {
            /*RouterStore.api("voip/account")
                .then(l)
                .catch(r);*/
        });
    }

    static login(creds: string): Promise {
        let parsed = window.JSON.parse(creds);

        return new Promise((l, r) => {
            let payload = {
                username: parsed.username,
                password: parsed.password,
                sipserver: parsed.server || "192.168.0.1",
                domain: parsed.domain || "192.168.0.1"
            };

            window.portsip.login(l, r, payload);
        });
    }

    static call(number: string): Promise {
        return new Promise((l, r) => {
            window.portsip.call(l, r, number);
        });
    }

    static hangup(): Promise {
        return new Promise((l, r) => {
            window.portsip.hangup(l, r);
        });
    }

    static reject(): Promise {
        return new Promise((l, r) => {
            window.portsip.reject(l, r);
        });
    }

    static speaker(on: boolean): Promise {
        return new Promise((l, r) => {
            window.portsip.speaker(l, r, on);
        });
    }

    static mute(on: boolean): Promise {
        return new Promise((l, r) => {
            window.portsip.mute(l, r, on);
        });
    }

}

export default VoIP;
