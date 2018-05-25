/* @flow */

import React from "react";

import fjs from "functional.js";

import AppBar from "../components/AppBar";
import Devices from "../modules/Devices";
import PageTransition from "../utils/PageTransition";
import Router from "../actions/Router";
import SmartDiagnostics from "../components/SmartDiagnostics";

import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import Toggle from "material-ui/Toggle";
import SvgIcon from "material-ui/SvgIcon";
import {Tabs, Tab} from "material-ui/Tabs";

const NetworkIcon = (props) => (
    <SvgIcon viewBox="0 0 74 67" {...props}>
        <path d=" M 29.45 6.67 C 45.26 3.88 62.21 10.27 72.50 22.52 C 74.11 24.64 71.54 27.73 69.10 26.88 C 67.68 26.01 66.54 24.77 65.33 23.63 C 57.63 16.10 46.85 11.76 36.07 12.04 C 25.66 12.27 15.46 16.76 8.14 24.15 C 6.69 25.37 5.32 27.47 3.13 26.89 C 1.11 26.25 0.24 23.42 1.91 21.95 C 9.03 13.98 18.88 8.42 29.45 6.67 Z" />
        <path d=" M 30.44 24.71 C 41.23 22.36 53.28 26.11 60.52 34.50 C 62.52 37.24 58.10 40.70 55.94 38.05 C 50.63 32.93 43.43 29.60 35.96 30.04 C 29.18 30.18 22.90 33.45 18.06 38.05 C 15.89 40.69 11.50 37.26 13.47 34.51 C 17.78 29.45 23.98 26.12 30.44 24.71 Z" />
        <path d=" M 35.29 42.26 C 39.85 40.63 44.75 46.11 42.44 50.43 C 40.88 54.13 35.48 55.27 32.78 52.16 C 29.48 49.23 31.17 43.43 35.29 42.26 Z" />
    </SvgIcon>
);

const EditIcon = (props) => (
    <SvgIcon viewBox="0 0 74 67" {...props}>
        <path d=" M 48.40 17.37 C 51.15 15.32 53.06 10.78 56.93 11.12 C 59.29 12.68 61.07 14.92 63.11 16.84 C 64.38 18.28 66.51 19.67 65.91 21.90 C 64.23 24.49 61.75 26.40 59.63 28.61 C 55.88 24.87 52.14 21.13 48.40 17.37 Z" />
        <path d=" M 12.00 53.77 C 23.04 42.69 34.11 31.63 45.19 20.58 C 48.94 24.33 52.69 28.07 56.43 31.83 C 45.37 42.90 34.31 53.97 23.23 65.02 C 19.49 65.01 15.75 65.01 12.01 65.01 C 11.99 61.26 12.00 57.52 12.00 53.77 Z" />
    </SvgIcon>
);

class Network extends React.Component {

    state: Object = {
        wireless: [],
        guest: [],
        guestUp: true,
        usb: [],
        lanx: []
    };

    mapInterval: ?Object;

    componentDidMount(): void {
        PageTransition.execute();
        this.getNetworkMap();
        this.mapInterval =
            window.setInterval(this.getNetworkMap.bind(this), 5000);
    }

    componentWillUnmount(): void {
        window.clearInterval(this.mapInterval);
    }

    getNetworkMap(): void {
        Router.api("networkmap/deviceList")
            .then(this.updateDevices.bind(this));
    }

    switchGuest(e: object, checked: bool): void {
        this.setState({
            guestUp: checked
        });
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
        const download = (Math.random() * 3) + 10;
        const mapData = {
            wifiUp: true,
            guestUp: true,
            dslUp: true,
            direct: 0,
            wifi: this.state.wireless.length,
            guest: 0,
            repeaters: 0,
            upload: download * 0.73,
            download: download
        };

        return (
            <div>
                <AppBar title="Network" menu={true} noShadow={true} />
                <Tabs inkBarStyle={{
                    backgroundColor: "#FFF"
                }}
                tabItemContainerStyle={{
                    backgroundColor: "#ffcc00",
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
                }}>
                <Tab label="WIFI">
                    <Paper className="paper-main no-padding" zDepth={1}>
                        <List>
                            <ListItem
                                leftIcon={<NetworkIcon style={{
                                    backgroundColor: "#00B0C8",
                                    top: 4,
                                    margin: 12,
                                    left: 3,
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    padding: "9px 8px 7px",
                                    color: "#FFF",
                                    fill: "#FFF"
                                }} />}
                                rightToggle={<Toggle defaultToggled={true} />}
                                primaryText="presciense9ABE"
                                secondaryText="Main Wifi (2.4 GHz)"
                            />
                        </List>
                        <Divider inset={true} />
                        <List>
                            <ListItem
                                innerDivStyle={{paddingTop: 8, paddingBottom: 8}}
                                insetChildren={true}
                                rightIcon={<EditIcon style={{margin: 1, right: 15}} />}
                                primaryText="EDIT"
                            />
                        </List>
                    </Paper>
                    <Paper className="paper-main no-padding" zDepth={1}>
                        <List>
                            <ListItem
                                leftIcon={<NetworkIcon style={{
                                    backgroundColor: "#D1D2D1",
                                    top: 4,
                                    margin: 12,
                                    left: 3,
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    padding: "9px 8px 7px",
                                    color: "#FFF",
                                    fill: "#FFF"
                                }} />}
                                rightToggle={<Toggle defaultToggled={false} />}
                                primaryText="presciense9ABE_5G"
                                secondaryText="Main Wifi (5 GHz)"
                            />
                        </List>
                    </Paper>
                    <Paper className="paper-main no-padding" zDepth={1}>
                        <List>
                            <ListItem
                                leftIcon={<NetworkIcon style={{
                                    backgroundColor: this.state.guestUp ? "#00B0C8" : "#D1D2D1",
                                    top: 4,
                                    margin: 12,
                                    left: 3,
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    padding: "9px 8px 7px",
                                    color: "#FFF",
                                    fill: "#FFF"
                                }} />}
                                rightToggle={
                                    <Toggle
                                        onToggle={this.switchGuest.bind(this)}
                                        defaultToggled={this.state.guestUp} />
                                }
                                primaryText="presciense9ABE_guest"
                                secondaryText="Guest WiFi"
                            />
                        </List>
                        {
                            this.state.guestUp &&
                            <Divider inset={true} />
                        }
                        {
                            this.state.guestUp &&
                            <List>
                                <ListItem
                                    innerDivStyle={{paddingTop: 8, paddingBottom: 8}}
                                    insetChildren={true}
                                    rightIcon={<EditIcon style={{margin: 1, right: 15}} />}
                                    primaryText="EDIT"
                                />
                            </List>
                        }
                    </Paper>
                </Tab>
                <Tab label="DEVICES">
                    <Devices />
                </Tab>
                <Tab label="DIAGNOSTICS">
                    <SmartDiagnostics/>
                </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Network;
