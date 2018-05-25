/* @flow */

import React from "react";
import axios from "axios";
import fjs from "functional.js";

import AppBar from "material-ui/AppBar";
import Dialog from "material-ui/Dialog";

import WiFiIcon from "material-ui/svg-icons/notification/wifi";
import Bar4Icon from "material-ui/svg-icons/device/signal-wifi-4-bar";
import Bar3Icon from "material-ui/svg-icons/device/signal-wifi-3-bar";
import Bar2Icon from "material-ui/svg-icons/device/signal-wifi-2-bar";
import Bar1Icon from "material-ui/svg-icons/device/signal-wifi-1-bar";
import Bar4LockIcon from "material-ui/svg-icons/device/signal-wifi-4-bar-lock";
import Bar3LockIcon from "material-ui/svg-icons/device/signal-wifi-3-bar-lock";
import Bar2LockIcon from "material-ui/svg-icons/device/signal-wifi-2-bar-lock";
import Bar1LockIcon from "material-ui/svg-icons/device/signal-wifi-1-bar-lock";
import IconButton from "material-ui/IconButton";
import Progress from "material-ui/CircularProgress";
import Refresh from "material-ui/RefreshIndicator";
import { List, ListItem } from "material-ui/List";

class WifiManager extends React.Component {

    state: Object = {
        modal: false,
        scanning: false,
        prompt: false,
        ssid: null,
        networks: []
    };

    componentDidMount(): void {
        document.addEventListener("wifi", this.showDialog.bind(this), false);
    }

    showDialog(): Object {
        this.scan();
        return this.setState({
            modal: true,
        });
    }

    closeDialog(): Object {
        if (this.state.scanning) {
            return;
        }
        return this.setState({
            modal: false
        });
    }

    scan(): void {
        if (this.state.scanning) {
            return;
        }

        this.setState({
            scanning: true
        });

        window.wifi.current((current) => {
            this.setState({
                ssid: current.ssid
            });
        });

        window.wifi.scan(() => {
            window.setTimeout(this.getResults.bind(this), 2500);
        }, null); // TODO: handle error
    }

    getResults(): void {
        window.wifi.results(this.setResults.bind(this), null);  // TODO: handle error
    }

    isSecure(capabilities): Boolean {
        return capabilities.indexOf("WPA") >= 0 ||
            capabilities.indexOf("WEP") >= 0;
    }

    setResults(results): void {
        console.log(results);
        const BUG = "NVRAM WARNING: Err = 0x10";

        let filtered = fjs.select((result) => {
            return result.ssid
                && result.ssid !== ""
                && result.ssid !== BUG
                && result.capabilities.indexOf("[P2P]") === -1;
        }, results);

        filtered.sort((a, b) => {
            return parseFloat(b.level) - parseFloat(a.level);
        });

        for (let i = 0; i < filtered.length; i += 1) {
            if (filtered[i].ssid === this.state.ssid) {
                let connected = filtered.splice(i, 1);
                filtered.unshift(connected[0]);
                break;
            }
        }

        console.log(filtered);

        return this.setState({
            networks: filtered,
            scanning: false
        });
    }

    loader(): ?React.Element {
        // TODO: Use the loader component
        if (this.state.scanning) {
            return (<div className="content-block wifi-scanning">
                <p><Progress /></p>
            </div>);
        }
    }

    noNetworks(): ?React.Element {
        if (!this.state.scanning && this.state.networks.length === 0) {
            return (<div className="content-block wifi-none">
                <p>No networks found</p>
            </div>);
        }
    }

    wifiIcon(network: Object): React.Element {
        if (this.isSecure(network.capabilities)) {
            switch(network.level) {
                case 3:
                    return <Bar4LockIcon />
                case 2:
                    return <Bar3LockIcon />
                case 1:
                    return <Bar2LockIcon />
                default:
                    return <Bar1LockIcon />
            }
        }
        switch(network.level) {
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

    networkText(network: Object): React.Element {
        if (network.ssid === this.state.ssid) {
            return "Connected";
        }
        return network.capabilities;
    }

    wifiList(network: Object): React.Element {
        if (this.state.scanning) {
            return;
        }

        return (
            <div key={network.ssid}>
                <ListItem
                    leftIcon={this.wifiIcon(network)}
                    primaryText={network.ssid}
                    secondaryText={this.networkText(network)}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    onClick={
                        this.isSecure(network.capabilities)
                            ? this.passwordPrompt.bind(this, network)
                            : this.connect.bind(this, network.ssid)
                    }
                />
            </div>
        );
    }

    passwordPrompt(network: Object): void {
        if (this.state.prompt) {
            return;
        }
        this.setState({
            prompt: true
        });
        const msg = "Please enter your WiFi password";
        navigator.notification.prompt(msg,
            this.checkPassword.bind(this, network.ssid), network.ssid);
    }

    checkPassword(ssid: String, input: Object): void {
        this.setState({
            prompt: false
        });
        if (input && input.buttonIndex && input.buttonIndex === 1
                && input.input1 && input.input1.trim().length > 0) {

            this.connect(ssid, input.input1.trim());
        }
    }

    connect(ssid: String, password: ?String): void {
        this.setState({
            prompt: false
        });

        window.wifi.add(this.closeDialog.bind(this),
            this.wifiError.bind(this), ssid, password || ""); // TODO: handle error
    }

    wifiError(msg: ?String): void {
        msg = msg || "Error connecting"
        navigator.notification.alert(msg, null, "WiFi");
    }

    render(): React.Element {
        return (
            <Dialog
                className="modal wifi-modal"
                open={this.state.modal}
                modal={false}
                onRequestClose={this.closeDialog.bind(this)}
                autoScrollBodyContent={true}>
                <AppBar
                    iconElementLeft={
                        <IconButton>
                            <WiFiIcon />
                        </IconButton>
                    }
                    iconElementRight={
                        <Refresh
                            className="wifi-rescan"
                            onClick={this.scan.bind(this)}
                            percentage={80}
                            size={30}
                            left={680}
                            top={10}
                            status={this.state.scanning ? "hide" : "ready"}>
                        </Refresh>
                    }
                    className="modalbar"
                    title="Connect to WiFi"
                />
                {this.loader()}
                <List className="wifi-block">
                    {this.noNetworks()}
                    {this.state.networks.map(this.wifiList.bind(this))}
                </List>
            </Dialog>
        );
    }
}

export default WifiManager;
