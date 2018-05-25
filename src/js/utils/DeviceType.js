/* @flow */

class DeviceType {

    static polaris(): Boolean {
        return this.android() && window.device.model === "sercomm23_gw_m";
    }

    static android(): Boolean {
        return window.device.platform.toLowerCase() === "android";
    }

    static iOS(): Boolean {
        return window.device.platform.toLowerCase() === "ios";
    }

}

export default DeviceType;
