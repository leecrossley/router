/* @flow */

import React from "react";
import translate from "counterpart";
import fjs from "functional.js";

import { ListView, ListItem } from "./List";

class Menu extends React.Component {
    static defaultProps: {};

    static props: {
        items: Array<Object>;
    };

    state: Object = {
        online: true,
        serial: "vodafone9ABE",
        networkText: translate("menu.online"),
        className: "online",
        camera: false
    };

    closeMenu(): void {
        setTimeout(() => {
            window.f7app.closePanel("left");
        }, 150);
    }

    checkInternetStatus(): void {
        if (window.credentials) {
            /*RouterStore.api("networkmap/internet")
                .then(this.setInternetStatus.bind(this))
                .catch(this.internetStatusError.bind(this));*/
        }
    }

    setInternetStatus(status: Object): void {
        let online = status.internetStatus.toUpperCase() === "UP";
        let className = online ? "online" : "offline";

        this.setState({
            online: online,
            networkText: translate(`menu.${className}`),
            className: className
        });
    }

    internetStatusError(err: Object): void {
        console.log(err);
        this.setState({
            online: false,
            networkText: "Error",
            className: "offline"
        });
    }

    // TODO: demo code
    showCamera(): void {
        this.setState({
            camera: true
        });
    }

    componentDidMount(): void {
        // this.checkInternetStatus();
        // this.statusInterval =
        //     window.setInterval(this.checkInternetStatus.bind(this), 20000);

        if (window.device.platform.toLowerCase() === "ios") {
            window.Dom7(".panel-left").on("open", window.StatusBar.hide);
            window.Dom7(".panel-left").on("close", window.StatusBar.show);
        }

        window.Dom7(".menu-logo").on("taphold", this.showCamera.bind(this));
    }

    componentWillUnmount(): void {
        // window.clearInterval(this.statusInterval);
        if (window.device.platform.toLowerCase() === "ios") {
            window.Dom7(".panel-left").off("open", window.StatusBar.hide);
            window.Dom7(".panel-left").off("close", window.StatusBar.show);
        }
    }

    renderMenuItem(item: Object): React.Element {
        let path = item.path.split("(")[0];
        return (
            <ListItem
                key={path}
                icon={`menu-${path}`}
                onClick={this.closeMenu}
                to={`/${path}`}
                title={translate(`${path}.title`)}>
            </ListItem>
        );
    }

    renderMenuItems(): React.Element {
        return (
            <ListView>
                {fjs.map(this.renderMenuItem.bind(this), this.props.items)}
            </ListView>
        );
    }

    render(): React.Element {
        return (
            <div className="menu">
                <div className="panel-overlay"></div>
                <div className="panel panel-left panel-cover">
                    <div className="menu-logo"></div>
                    <div className="router router-img"></div>
                    <p className="network-name">{this.state.serial}</p>
                    <div className="network-status-wrap">
                        <span className={`network-status ${this.state.className}`}>
                            • {this.state.networkText}
                        </span>
                    </div>
                    {this.renderMenuItems()}
                </div>
            </div>
        );
    }
}

export default Menu;
