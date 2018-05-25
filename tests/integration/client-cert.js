import "babel-polyfill"
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import fbUsers from "fbapp-test-users";
import request from "superagent";
import fjs from "functional.js";
import fs from "fs";
import { validate } from "jsonschema";

import CERT_SCHEMA from "./schema/cert.json";

const should = chai.should();
chai.use(chaiAsPromised);

describe("Consumer client certs", () => {

    const URI = "https://cert.dev.polaris.prescien.se/issue_cert";
    const GATEWAY_ID = "0022080000000002";
    const CLIENT_ID = "b7b322a0dd12588b981783e9ffbc6947";

    var fbUser;

    beforeEach((done) => {
        fbUsers.setAppId("703701063144726");
        fbUsers.setAppSecret("7ad14f4d195be7d83b077ab84989ae98");

        fbUsers.createUser({
            installed: true,
            permissions: "email",
            name: "Valid User"
        })
        .then((createdUser) => {
            fbUser = createdUser;
            fbUser.name = "Valid User";
            done();
        });
    });


    it("should receive a client cert for a valid user and payload", (done) => {
        let payload = {
            "fb_userid": parseInt(fbUser.id, 10),
            "fb_email": fbUser.email,
            "fb_access_token": fbUser.access_token,
            "fb_realname": fbUser.name,
            "mobile_device_name": "Valid iPhone 10",
            "gateway_id": GATEWAY_ID,
            "mobile_app_uuid": CLIENT_ID
        };

        request.post(URI)
            .send(payload)
            .set("Accept", "application/json")
            .end((err, res) => {
                should.not.exist(err);
                const response = JSON.parse(res.text);

                const errors = validate(response, CERT_SCHEMA).errors;
                errors.should.deep.equal([]);

                response.success.should.equal(true);

                // fs.writeFileSync(`${GATEWAY_ID}.crt.pem`, response.result.cert);
                // fs.writeFileSync(`${GATEWAY_ID}.key.pem`, response.result.key);

                // fs.writeFileSync(`${GATEWAY_ID}.cid`, GATEWAY_ID + CLIENT_ID);
                // fs.writeFileSync(`${GATEWAY_ID}.p12`, Buffer.from(response.result.pkcs12), "base64");
                // fs.writeFileSync("stack.0.der", Buffer.from(response.result.der0), "base64");
                // fs.writeFileSync("stack.1.der", Buffer.from(response.result.der1), "base64");

                done();
            });
    });


    it("should not receive a client cert for a user without an email", (done) => {
        let payload = {
            "fb_userid": parseInt(fbUser.id, 10),
            "fb_email": null,
            "fb_access_token": fbUser.access_token,
            "fb_realname": fbUser.name,
            "mobile_device_name": "Valid iPhone 10",
            "gateway_id": GATEWAY_ID,
            "mobile_app_uuid": "b7b322a0dd12588b981783e9ffbc6947"
        };

        request.post(URI)
            .send(payload)
            .set("Accept", "application/json")
            .end((err, res) => {
                should.not.exist(err);
                const response = JSON.parse(res.text);

                const errors = validate(response, CERT_SCHEMA).errors;
                errors.should.deep.equal([]);

                response.success.should.equal(false);
                done();
            });
    });

    it("should not receive a client cert for a user without valid userid", (done) => {
        let payload = {
            "fb_userid": 1234567890,
            "fb_email": fbUser.email,
            "fb_access_token": fbUser.access_token,
            "fb_realname": fbUser.name,
            "mobile_device_name": "Valid iPhone 10",
            "gateway_id": GATEWAY_ID,
            "mobile_app_uuid": "b7b322a0dd12588b981783e9ffbc6947"
        };

        request.post(URI)
            .send(payload)
            .set("Accept", "application/json")
            .end((err, res) => {
                should.not.exist(err);
                const response = JSON.parse(res.text);

                const errors = validate(response, CERT_SCHEMA).errors;
                errors.should.deep.equal([]);

                response.success.should.equal(false);
                done();
            });
    });


    after((done) => {
        fbUsers.getList()
        .then((users) => {
            var ourUsers = fjs.select((user) => {
                return user.name !== "Open Graph Test User";
            }, users);

            var counter = 0;

            fjs.each((user, i) => {
                fbUsers.deleteUser(user.id)
                .then((res) => {
                    console.log(`Clean user ${user.id}: ${res.success}`);
                    counter++;
                    if (ourUsers.length === counter) {
                        done();
                    }
                });
            }, ourUsers);
        });
    });

});
