/* @flow */

import React from "react";
import translate from "counterpart";
import fjs from "functional.js";

import Navbar from "../components/Navbar";
import { Tabs, Tab } from "../components/Tabs";
import { ListView, ListItem } from "../components/List";
import Switch from "../components/Switch";
import Loader from "../components/Loader";
import WifiActions from "../actions/WifiActions";
import Notification from "../actions/Notification";

class Wifi extends React.Component {

    close(): void {};

    state: Object = {
        wifi: [],
        guest: null,
        hotspot: null,
        error: null
    };

    updateTimeout: ?number;
    isUnmounted: boolean = false;

    componentDidMount(): void {
        this.update();
    }

    componentWillUnmount(): void {
        this.isUnmounted = true;
        clearTimeout(this.updateTimeout);
    }

    resetState(err: ?boolean): void {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            wifi: [],
            guest: null,
            hotspot: null,
            error: err ? this.retry.bind(this) : null
        });
    }

    retry(): void {
        this.resetState();
        this.update();
    }

    update(): void {
        if (this.isUnmounted) {
            return;
        }
        WifiActions.getAllSettings()
            .then(this.updateState.bind(this))
            .catch(this.updateError.bind(this));
    }

    updateState(res: Array<Object>): void {
        console.log(res);
        this.setState({
            wifi: res[0],
            guest: res[1],
            hotspot: res[2],
            error: null
        });
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(this.update.bind(this), 10000);
    }

    updateError(err: Object): void {
        console.log(err);
        this.resetState(true);
    }

    setComplete(): void {
        window.f7app.hideIndicator();
        this.resetState();

        clearTimeout(this.updateTimeout);
        this.update();
    }

    // TODO: firmware limitation
    firmwareLimitation(e: ?Object): void {
        // translation not req, will be removed
        let msg = "Action is not permitted in demo mode";
        Notification.alert(msg);
    }

    setError(err: Object): void {
        console.log(err);
        window.f7app.hideIndicator();
        window.navigator.notification.alert(translate("general.error"));
    }

    setWifi(type: string, id: number, toUpdate: Object): void {
        window.f7app.showIndicator();
        WifiActions.setSettings(type, id, toUpdate)
            .then(this.setComplete.bind(this))
            .catch(this.setError.bind(this));
    }

    setActiveStatus(id: number, enable: boolean, e: Object): void {
        e.preventDefault();

        let msg = translate("general.confirm_action.message", {
            action: enable
                ? translate("general.confirm_action.enable")
                : translate("general.confirm_action.disable")
        });

        Notification.confirm(msg).then(() => {
            this.setWifi("ap", id, {
                actStatus: enable
            });
        }).catch(this.close);
    }

    setSSID(wifi: Object, e: Object): void {
        e.preventDefault();

        let msg = translate("general.update", {
            property: "SSID"
        });

        Notification.prompt(msg, wifi.ssid).then((ssid) => {
            this.setWifi("ap", wifi.id, {
                ssid: ssid
            });
        }).catch(this.close);
    }

    setSecurity(wifi: Object, e: Object): void {
        e.preventDefault();

        let msg = translate("general.update", {
            property: translate("wifi.security")
        });

        let actions = [
            translate("wifi.no_password"),
            "WPA2",
            "WPA+WPA2",
            translate("general.cancel")
        ];

        Notification.option(msg, actions).then((i) => {
            if (i === 1) {
                return this.setWifi("ap", wifi.id, {
                    secureMode: "open"
                });
            }

            let action = actions[i - 1];

            let msg = translate("general.update", {
                property: action
            });

            let current = wifi.secureMode === action
                ? wifi.secureKey : "";

            Notification.prompt(msg, current).then((key) => {
                this.setWifi("ap", wifi.id, {
                    secureMode: action,
                    secureKey: key
                });
            }).catch(this.close);

        }).catch(this.close);
    }

    setChannel(wifi: Object, e: Object): void {
        e.preventDefault();

        let msg = translate("general.update", {
            property: translate("wifi.channel.title")
        });

        let actions = [
            msg,
            translate("wifi.channel.contention"),
            translate("general.cancel")
        ];

        Notification.option(msg, actions).then((i) => {
            if (i === 2) {
                return this.firmwareLimitation();
            }

            let options = [translate("wifi.channel.auto")];

            if (wifi.id === 1) {
                for (let c = 1; c <= 13; c += 1) {
                    options.push(c.toString());
                }
            } else {
                for (let c = 36; c <= 64; c += 4) {
                    options.push(c.toString());
                }
                for (let c = 100; c <= 140; c += 4) {
                    options.push(c.toString());
                }
            }

            let current = wifi.autoChannel
                ? options[0]
                : wifi.currentChannel.toString();

        }).catch(this.close);
    }

    setWPS(wifi: Object, e: Object): void {
        e.preventDefault();

        let msg = translate("general.update", {
            property: "WPS"
        });

        let actions = [
            wifi.wpsEnable
                ? translate("wifi.disable")
                : translate("wifi.enable")
        ];

        if (wifi.wpsEnable && wifi.wpsResult.toLowerCase() !== "ongoing") {
            actions.push(translate("wifi.pair"));
        }

        actions.push(translate("general.cancel"));

        Notification.option(msg, actions).then((i) => {
            if (i === 1) {
                return this.setWifi("radio", wifi.id, {
                    wpsEnable: !wifi.wpsEnable
                });
            }

            return this.setWifi("radio", wifi.id, {
                wpsActive: true
            });

        }).catch(this.close);
    }

    wifiByBand(band: string): Object {
        return fjs.first((w) => {
            return w.band.toLowerCase() === band;
        }, this.state.wifi);
    }

    renderGuest(): ReactElement {
        if (!this.state.guest) {
            return (<Loader retry={this.state.error} />);
        }

        return (
            <div>
                <ListView labelAfter={translate("wifi.guest_wifi.description")}>
                    <ListItem
                        title={translate("wifi.guest_wifi.title")}
                        onClick={this.firmwareLimitation}>
                        <Switch enabled={this.state.guest.enable} />
                    </ListItem>
                </ListView>
                <ListView labelAfter={translate("wifi.hotspot.description")}>
                    <ListItem
                        title={translate("wifi.hotspot.title")}
                        onClick={this.firmwareLimitation}>
                        <Switch enabled={this.state.hotspot.enable} />
                    </ListItem>
                </ListView>
            </div>
        );
    }

    renderWifi(band: string): React.Element {
        let wifi = this.wifiByBand(band);

        if (!wifi) {
            return (<Loader retry={this.state.error} />);
        }

        let enabled = wifi.actStatus
            ? translate("wifi.enabled")
            : translate("wifi.disabled");

        return (
            <div className={wifi.actStatus ? "wifi-enabled" : "wifi-disabled"}>
                <ListView>
                    <ListItem
                        onClick={this.setActiveStatus.bind(this, wifi.id, !wifi.actStatus)}
                        title={enabled}
                        metric={wifi.band.toLowerCase().replace("ghz", "")}
                        qualifier="GHz">
                        <Switch enabled={wifi.actStatus} />
                    </ListItem>
                </ListView>
                {this.renderWifiSettings(wifi)}
            </div>
        );
    }

    renderBadge(label: ?string): ?React.Element {
        if (!label || label.length === 0) {
            return;
        }
        return (<span className="badge">{label}</span>);
    }

    renderWifiSettings(wifi: Object): ?React.Element {
        if (!wifi.actStatus) {
            return;
        }

        let mode = wifi.autoChannel
            ? translate("wifi.channel.auto")
            : translate("wifi.channel.manual");

        let password = wifi.secureMode.toLowerCase() === "open"
            ? translate("wifi.no_password")
            : wifi.secureKey;

        let wpsStatus = wifi.wpsResult.toLowerCase() === "ongoing"
            ? `${translate("wifi.pairing")}...`
            : null;

        let wps = null;

        if (!wpsStatus) {
            wps = wifi.wpsEnable
               ? translate("wifi.enabled")
               : translate("wifi.disabled");
        }

        return (
            <ListView key={wifi.id}>
                <ListItem
                    title="SSID"
                    onClick={this.setSSID.bind(this, wifi)}
                    to="#">
                    <span>{wifi.ssid}</span>
                </ListItem>
                <ListItem
                    title={`${translate("wifi.security")} (${wifi.secureMode})`}
                    onClick={this.setSecurity.bind(this, wifi)}
                    to="#">
                    <span>{password}</span>
                </ListItem>
                <ListItem
                    title={translate("wifi.channel.title")}
                    onClick={this.setChannel.bind(this, wifi)}
                    to="#">
                    <span>{`${wifi.currentChannel} (${mode})`}</span>
                </ListItem>
                <ListItem
                    title="WPS"
                    onClick={this.setWPS.bind(this, wifi)}
                    to="#">
                    <span>{wps}</span>
                    {this.renderBadge(wpsStatus)}
                </ListItem>
            </ListView>
        );
    }

    render(): React.Element {

        return (
            <div data-page="wifi" className="page navbar-fixed toolbar-fixed">
                <Navbar title={translate("wifi.title")} menu={true}></Navbar>
                <Tabs>
                    <Tab id="wifi-2-4" icon="wifi-2-4">
                        {this.renderWifi("2.4ghz")}
                    </Tab>
                    <Tab id="wifi-5" icon="wifi-5-0">
                        {this.renderWifi("5ghz")}
                    </Tab>
                    <Tab id="guest" icon="wifi-guest">
                        {this.renderGuest()}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Wifi;
