import "babel-polyfill"
import path from "path";
import wd from "wd";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

const should = chai.should();
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

let app = wd.promiseChainRemote("localhost", 4723);

describe("Test the test testing framework test test", function() {
    this.timeout(300000);

    before(async () => {
        try {
            // TODO: config this
            await app.init({
                platformName: "iOS",
                platformVersion: "9.3",
                deviceName: "iPhone Simulator",
                app: path.resolve(__dirname, "../platforms/ios/build/emulator/Energy.app")
            });

        } catch (err) {
            should.not.exist(err);
        }
    });

    it("should show we're on an iOS device", async () => {
        try {
            await app.setImplicitWaitTimeout(5000);

            app.eval("window.device.platform.toLowerCase()")
                .should.eventually.equal("ios");

        } catch (e) {
            should.not.exist(e);
        }
    });

    after(async () => {
        try {
            app.quit();

        } catch(e) {
            should.not.exist(e);
        }
    });
});
