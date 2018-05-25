/* @flow */

import "whatwg-fetch";

class Alexa {

    static getAccessToken(): Promise {
        return new Promise((l, r) => {
            fetch("https://ihd.herokuapp.com/refresh")
                .then(res => res.json())
                .then(l)
                .catch(r);
        });
    }
}

export default Alexa;
