/* @flow */

import Base64 from "base-64";
import axios from "axios";

class Router {

    static api(route, method, payload, router): Promise {
        return new Promise((l, r) => {
            const url = `http://192.168.0.1/api/v1/${route}`;
            const creds = Base64.encode("presciense:test");

            axios({
                method: method || "GET",
                url: url,
                headers: {
                    "Authorization": `Basic ${creds}`
                },
                data: payload
            })
            .then(l)
            .catch(r);
        });
    }

};

export default Router;
