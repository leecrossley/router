/* @flow */

import React from "react";
import translate from "counterpart";

import Icon from "./Icon";

class NetworkMap extends React.Component {
    static defaultProps: {};

    static props: {
        wireless: Array<Object>,
        guest: Array<Object>,
        usb: Array<Object>,
        lanx: Array<Object>
    };

    componentDidMount() {
        setTimeout(() => {
            let container = window.Dom7(".network-container");
            container.css("margin-top", `-${container.height() / 2 + 68}px`);
        });
    }

    render(): React.Element {
        let wirelessClassName = this.props.wireless.length === 0
            ? "indicator-off" : "";

        let cabled = this.props.usb.length + this.props.lanx.length;

        let cabledClassName = cabled === 0
            ? "indicator-off" : "";

        return (
            <div className="network-container">
                <div className="network-outer">
                    <div className="network-line network-line1"></div>
                    <div className="network-line network-line2"></div>

                    <div className="network-inner router-img"></div>

                    <div className={`indicator indicator-wifi ${wirelessClassName}`}>
                        <span className="indicator-title">
                            {translate("network.wifi")}
                        </span>
                        <span className="indicator-detail">
                            {translate("network.devices",
                                {count: this.props.wireless.length})
                            }
                        </span>
                    </div>

                    <div className="indicator indicator-guest indicator-off">
                        <span className="indicator-title">
                            {translate("network.guest_wifi")}
                        </span>
                        <span className="indicator-detail">
                            {translate("network.devices", {count: 0})}
                        </span>
                    </div>

                    <div className="indicator indicator-phone indicator-off">
                        <span className="indicator-title">
                            {translate("network.phone")}
                        </span>
                        <span className="indicator-detail">
                            {translate("network.lines", {count: 0})}
                        </span>
                    </div>

                    <div className={`indicator indicator-cabled ${cabledClassName}`}>
                        <span className="indicator-title">
                            {translate("network.wired")}
                        </span>
                        <span className="indicator-detail">
                            {translate("network.devices", {count: cabled})}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default NetworkMap;
