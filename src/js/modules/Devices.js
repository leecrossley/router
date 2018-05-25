/* @flow */

import React from "react";
import fjs from "functional.js";

import Router from "../actions/Router";
import PageTransition from "../utils/PageTransition";
import {List, ListItem} from "material-ui/List";
import Paper from "material-ui/Paper";
import SvgIcon from "material-ui/SvgIcon";
import Divider from "material-ui/Divider";

import PhoneIcon from "material-ui/svg-icons/hardware/smartphone";
import LaptopIcon from "material-ui/svg-icons/hardware/laptop";
import WatchIcon from "material-ui/svg-icons/hardware/watch";
import CameraIcon from "material-ui/svg-icons/image/photo-camera";

import BarsIcon4 from "material-ui/svg-icons/device/signal-cellular-4-bar";
import BarsIcon3 from "material-ui/svg-icons/device/signal-cellular-3-bar";
import BarsIcon2 from "material-ui/svg-icons/device/signal-cellular-2-bar";

const iconStyles = {
    backgroundColor: "#D7054C",
    top: 4,
    margin: 12,
    left: 3,
    width: 28,
    height: 28,
    borderRadius: "50%",
    padding: 8,
    color: "#FFF",
    fill: "#FFF"
};

class Devices extends React.Component {

    state: Object = {
        devices: []
    };

    mapInterval: ?Object;

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
            return d.active || d.name.toLowerCase().indexOf("watch") > -1;
        }, devices);

        this.setState({
            devices: active
        });
    }

    getDeviceItem(device: Object, i: Number): React.Element {
        const last = this.state.devices.length - 1 === i;
        let friendlyName = device.name.split("-").join(" ");
        if (device.name === "SC39F12F") {
            friendlyName = "Smart Camera";
        }
        return (<div><List>
            <ListItem
                leftIcon={this.getIcon(device)}
                rightIcon={this.getBars(device)}
                primaryText={friendlyName}
                secondaryText={device.ipAddress}
            />
        </List>
        { !last && <Divider inset={true} /> }
        </div>)
    }

    getBars(device: Object): React.Element {
        if (device.RSSI < -70) {
            return (<BarsIcon2 style={{
                color: "#f39c12",
                fill: "#f39c12"
            }} />);
        }
        if (device.RSSI < -50) {
            return (<BarsIcon3 style={{
                color: "#27ae60",
                fill: "#27ae60"
            }} />);
        }
        return (<BarsIcon4 style={{
            color: "#27ae60",
            fill: "#27ae60"
        }} />);
    }

    getIcon(device: Object): React.Element {
        if (device.name.toLowerCase().indexOf("watch") > -1) {
            return (<WatchIcon style={iconStyles} />);
        }
        if (device.name.indexOf("SC") === 0) {
            return (<CameraIcon style={iconStyles} />);
        }
        if (device.deviceType === "laptop") {
            return (<LaptopIcon style={iconStyles} />);
        }
        return (<PhoneIcon style={iconStyles} />);
    }

    render(): React.Element {
        return (
            <div>
                <div className="devices-title">
                    <b className="device-connected">{this.state.devices.length}</b> Devices on Main WiFi
                </div>
                <Paper className="paper-main no-padding" style="height: 385px;overflow: scroll;" zDepth={1}>
                    {this.state.devices.map(this.getDeviceItem.bind(this))}
                </Paper>
            </div>
        );
    }
}

export default Devices;
