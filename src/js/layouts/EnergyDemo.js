/* @flow */

import React from "react";

import DeviceType from "../utils/DeviceType";

import Theme from "../themes/EnergyDemo";
import DateTime from "../components/DateTime";
import Energy from "../components/Energy";
import Voice from "../components/Voice";
import EnergySwitch from "../modules/EnergySwitch";
import PhilipsHue from "../modules/PhilipsHue";

import ConnectionNotifier from "../modules/ConnectionNotifier";
import WiFiManager from "../modules/WiFiManager";

import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import {Grid, Row, Col} from "react-flexbox-grid";
import Divider from "material-ui/Divider";

import Bar4Icon from "material-ui/svg-icons/device/signal-wifi-4-bar";
import Bar3Icon from "material-ui/svg-icons/device/signal-wifi-3-bar";
import Bar2Icon from "material-ui/svg-icons/device/signal-wifi-2-bar";
import Bar1Icon from "material-ui/svg-icons/device/signal-wifi-1-bar";
import WiFiOffIcon from "material-ui/svg-icons/device/signal-wifi-off";
import IconButton from "material-ui/IconButton";

class Dashboard extends React.Component {

    state: Object = {
        online: false,
        rssi: 0
    };

    componentDidMount(): void {
        document.addEventListener("online", this.setOnline.bind(this), false);
        document.addEventListener("offline", this.setOnline.bind(this), false);

        this.setOnline();

        window.setInterval(() => {
            window.wifi.current((current) => {
                this.setState({
                    rssi: current.rssi
                });
            });
        }, 6000);
    }

    setOnline(): Object {
        const type = navigator.connection.type.toUpperCase();
        const online = type !== "UNKNOWN" && type !== "NONE";
        return this.setState({
            online: online
        });
    }

    wifiIcon(): React.Element {
        return this.state.online ? this.getLevelIcon() : <WiFiOffIcon />;
    }

    getLevelIcon(): React.Element {
        switch(this.state.rssi) {
            case 3:
                return <Bar4Icon />
            case 2:
                return <Bar3Icon />
            case 1:
                return <Bar2Icon />
            default:
                return <Bar1Icon />
        }
    }

    openWifiManager(e: Object): void {
        e.preventDefault();
        e.stopPropagation();
        document.dispatchEvent(new Event("wifi"));
    }

    openDebug(): void {
        if (DeviceType.polaris()) {
            document.dispatchEvent(new Event("debugger"));
        }
    }

    platformSpecificComponents(): ?React.Component {
        if (DeviceType.polaris()) {
            return (<div>
                <WiFiManager />
            </div>);
        }
    }

    render(): React.Element {
        return (
            <Theme>
                <AppBar
                    onClick={this.openDebug.bind(this)}
                    className="appbar"
                    title="Smart Energy"
                    iconElementLeft={
                        <img src="img/logo.svg" />
                    }
                    iconElementRight={
                        <div>
                            <IconButton
                                onClick={this.openWifiManager.bind(this)}
                                className="appbar-wifi">
                                {this.wifiIcon()}
                            </IconButton>
                            <DateTime />
                        </div>
                    }
                />
                <Grid className="grid" fluid={true}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Energy type="electric" />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Energy type="gas" />
                        </Col>
                    </Row>
                    {
                        DeviceType.polaris() &&
                        <Row>
                            <Col xs={12} sm={4}>
                                <PhilipsHue />
                            </Col>
                            <Col xs={12} sm={4}>
                                <EnergySwitch />
                            </Col>
                            <Col xs={12} sm={4}>
                                <Voice />
                            </Col>
                        </Row>
                    }
                </Grid>
                <ConnectionNotifier />
                {this.platformSpecificComponents()}
            </Theme>
        );
    }

}

export default Dashboard;
