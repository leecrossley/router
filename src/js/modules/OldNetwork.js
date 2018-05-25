/* @flow */

import React from "react";
import translate from "counterpart";
import fjs from "functional.js";

import Navbar from "../components/Navbar";
import { Tabs, Tab } from "../components/Tabs";
import NetworkMap from "../components/NetworkMap";
import { ListView, ListItem } from "../components/List";

class Network extends React.Component {

    state: Object = {
        wireless: [],
        guest: [],
        usb: [],
        lanx: []
    };

    mapInterval: ?Object;

    componentDidMount(): void {
        this.getNetworkMap();
        this.mapInterval =
            window.setInterval(this.getNetworkMap.bind(this), 5000);
    }

    componentWillUnmount(): void {
        window.clearInterval(this.mapInterval);
    }

    getNetworkMap(): void {
        /*RouterStore.api("networkmap/deviceList")
            .then(this.updateDevices.bind(this))
            .catch(this.deviceListError.bind(this));*/
    }

    updateDevices(rawDevices: string): void {
        let devices = rawDevices ? window.JSON.parse(rawDevices) : [];

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

    wirelessEntry(device: Object): React.Element {
        return (
            <ListItem
                key={device.deviceId}
                title={device.name}
                rssi={device.RSSI}
                subtitle={`${device.deviceId} / ${device.ipAddress}`}>
            </ListItem>
        );
    }

    wirelessGroup(): ?React.Element {
        if (!this.state.wireless || this.state.wireless.length === 0) {
            return;
        }
        return (
            <div key="wireless">
                <li className="list-group-title">
                    <div className="list-group-icon indicator-wifi"></div>
                </li>
                {this.state.wireless.map(this.wirelessEntry.bind(this))}
            </div>
        );
    }

    deviceListError(err: Object): void {
        console.log(err);
    }

    render(): React.Element {

        return (
            <div data-page="network" className="page navbar-fixed toolbar-fixed">
                <Navbar title={translate("network.title")} menu={true}></Navbar>
                <Tabs>
                    <Tab id="map" icon="network-map">
                        <NetworkMap
                            wireless={this.state.wireless}
                            guest={this.state.guest}
                            usb={this.state.usb}
                            lanx={this.state.lanx}>
                        </NetworkMap>
                    </Tab>
                    <Tab id="list" icon="network-list">
                        <ListView group={true} className="contacts-block">
                            {this.wirelessGroup()}
                        </ListView>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Network;
