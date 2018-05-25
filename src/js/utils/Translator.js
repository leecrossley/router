/* @flow */

import translate from "counterpart";

class Translator {

    language: string;
    languageDefaults: Object;

    constructor() {
        // TODO: window.navigator.language and check translation exists
        this.language = "en";
        this.languageDefaults = {
            counterpart: {
                pluralize: (item, n) => item[(n === 0) ? "zero" : (n === 1) ? "one" : "other"]
            }
        };
    }

    init(): void {
        /* $FlowIssue - flow requires a literal string passed to require */
        let resource = require(`../languages/${this.language}.json`);
        resource = Object.assign(resource, this.languageDefaults);
        translate.registerTranslations(this.language, resource);
        translate.setLocale(this.language);
    }
}

module.exports = new Translator();
