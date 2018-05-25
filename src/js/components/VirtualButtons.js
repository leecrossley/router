/* @flow */

import React from "react";
import "whatwg-fetch";

import { Menu, MainButton, ChildButton } from "react-mfb";

import "../../scss/mfb.scss";

const dm = "http://lighting.dev.smartgaiacloud.com/diagCode/demo2_api.php?";

class VirtualButtons extends React.Component {

    button1Click() {
        fetch(`${dm}kitcode=${window.kitcode || "testkit"}&eventCode=900101`)
    }

    button2Click() {
        fetch(`${dm}kitcode=${window.kitcode || "testkit"}&eventCode=900102`)
    }

    button3Click() {
        fetch(`${dm}kitcode=${window.kitcode || "testkit"}&eventCode=900103`)
    }

    render(): React.Element {
        return (
            <Menu effect="zoomin" method="click" position="br">
                <MainButton iconResting="icon-alert" iconActive="icon-alert" />
                <ChildButton
                    icon="icon-on"
                    onClick={this.button1Click.bind(this)}
                    label="Button 1" />
                <ChildButton
                    icon="icon-on"
                    onClick={this.button2Click.bind(this)}
                    label="Button 2" />
                <ChildButton
                    icon="icon-on"
                    onClick={this.button3Click.bind(this)}
                    label="Button 3" />
            </Menu>
        );
    }
}

export default VirtualButtons;
