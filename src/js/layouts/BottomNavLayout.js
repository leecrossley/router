/* @flow */

import React from "react";

import Theme from "../themes/Veon";

import Paper from "material-ui/Paper";
import PageTransition from "../utils/PageTransition";

import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";

import SvgIcon from "material-ui/SvgIcon";

import HomeIcon from "material-ui/svg-icons/action/home";
import NetworkIcon from "material-ui/svg-icons/device/wifi-tethering";
import CameraIcon from "material-ui/svg-icons/image/linked-camera";
import UserIcon from "material-ui/svg-icons/action/supervisor-account";

class BottomNavLayout extends React.Component {

    hideMenu(): boolean {
        return this.props.routes[this.props.routes.length - 1].hideMenu;
    }

    transitionTo(page: String): void {
        window.location.hash = `#${page}`;
        PageTransition.start();
    }

    getSelectedIndex(): Number {
        if (window.location.hash.indexOf("home") > -1) {
            return 0;
        }
        if (window.location.hash.indexOf("network") > -1) {
            return 1;
        }
        if (window.location.hash.indexOf("camera") > -1) {
            return 3;
        }
    }

    renderBottomNav(): ?React.Element {
        if (!this.hideMenu()) {
            return (
                <Paper zDepth={1} className="navbar">
                    <BottomNavigation selectedIndex={this.getSelectedIndex()}>
                        <BottomNavigationItem
                            label="Home"
                            onClick={this.transitionTo.bind(this, "home")}
                            icon={<HomeIcon />} />
                        <BottomNavigationItem
                            label="Network"
                            onClick={this.transitionTo.bind(this, "network")}
                            icon={<NetworkIcon />} />
                        <BottomNavigationItem
                            label="Users"
                            icon={<UserIcon />} />
                        <BottomNavigationItem
                            label="Camera"
                            onClick={this.transitionTo.bind(this, "camera")}
                            icon={<CameraIcon />} />
                    </BottomNavigation>
                </Paper>
            );
        }
    }

    render(): React.Element {
        return (
            <Theme>
                {this.props.children}
                {this.renderBottomNav()}
            </Theme>
        );
    }

}

export default BottomNavLayout;
