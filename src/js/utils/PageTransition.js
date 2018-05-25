/* @flow */

class PageTransition {

    static start(ignoreBottom, ignoreTop): void {
        const options = {
            "direction": "left",
            "iosdelay": -1,
            "fixedPixelsTop": ignoreTop ? 20 : 84,
            "fixedPixelsBottom": ignoreBottom ? 0 : 56
        };
        window.plugins.nativepagetransitions.slide(options);
    }

    static execute(): void {
        window.plugins.nativepagetransitions.executePendingTransition();
    }

}

export default PageTransition;
