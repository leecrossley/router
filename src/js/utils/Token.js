/* @flow */

class Token {

    generate(size: number): string {
        let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let indices = new window.Uint16Array(size);
        window.crypto.getRandomValues(indices);
        return [...indices].map(index => charset[index % charset.length]).join("");
    }

}

module.exports = new Token();
