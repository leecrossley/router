/* @flow */

import React from "react";

import fjs from "functional.js";
import Router from "../actions/Router";
import FloatingCounter from "./FloatingCounter";

class NetworkStatus extends React.Component {
    static defaultProps: {};

    static props: {
        devices: Number
    };

    render(): React.Element {
        return (
            <div className="network-status">
                <div className="network-status-text network-status-good">
                    <div>Welcome back, Lee!</div>
                </div>
                <div className="network-status-counters">
                    <FloatingCounter title="Users" count={1} type="people" />
                    <FloatingCounter title="Devices" count={this.props.devices} type="devices" />
                </div>
                <div className="network-status-gateway"></div>
            </div>
        );
    }
}

export default NetworkStatus;
