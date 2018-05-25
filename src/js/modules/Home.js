/* @flow */

import React from "react";
import fjs from "functional.js";

import AppBar from "../components/AppBar";
import NetworkStatus from "../components/NetworkStatus";
import NetworkMap from "../components/NetworkMap/NetworkMap";
import PageTransition from "../utils/PageTransition";
import Router from "../actions/Router";

class Home extends React.Component {

    mapInterval: ?Object;

    state: Object = {
        wireless: [],
        guest: [],
        usb: [],
        lanx: []
    };

    componentDidMount(): void {
        PageTransition.execute();
        this.getNetworkMap();
        this.mapInterval = window.setInterval(this.getNetworkMap.bind(this), 3500);
    }

    componentWillUnmount(): void {
        window.clearInterval(this.mapInterval);
    }

    getNetworkMap(): void {
        Router.api("networkmap/deviceList")
            .then(this.updateDevices.bind(this));
    }

    updateDevices(rawDevices: string): void {
        let devices = rawDevices.data || [];

        let active = fjs.select((d) => {
            return d.active;
        }, devices);

        let grouped = fjs.group((d) => {
            return d.connectionType.toLowerCase().split("-")[0];
        }, active);

        this.setState({
            wireless: grouped.wireless || [],
            guest: [],
            usb: grouped.usb || [],
            lanx: grouped.lanx || []
        });
    }

    render(): React.Element {
        const mapData = {
            wifiUp: true,
            guestUp: true,
            dslUp: true,
            direct: 0,
            wifi: this.state.wireless.length,
            guest: 0,
            repeaters: 0,
            upload: 0,
            download: 0
        };
        return (
            <div>
                <AppBar title="VEON Smart Box" menu={true} />
                <NetworkStatus
                    devices={this.state.wireless.length}
                />
                <NetworkMap {...mapData} />
            </div>
        );
    }
}

export default Home;
