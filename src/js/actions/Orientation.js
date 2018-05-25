/* @flow */

import DeviceType from "../utils/DeviceType";

class Orientation {

    static shouldForce(): boolean {
        return window.isTablet && window.screen
            && window.screen.lock
            && this.getWidth() > 700;
    }

    static getWidth(): Number {
        return window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
    }

    static force(): void {
        if (DeviceType.polaris() && this.shouldForce()) {
            window.screen.lock("landscape");
        }
    }

}

export default Orientation;
