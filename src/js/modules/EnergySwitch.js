/* @flow */

import React from "react";

import Paper from "material-ui/Paper";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import Toggle from "material-ui/Toggle";

import EnergyIcon from "material-ui/svg-icons/action/settings-power";

class EnergySwitch extends React.Component {

    state: Object = {
        on: false,
        kWh: 0
    };

    componentWillMount() {
        document.addEventListener("plug", this.updateLoad.bind(this), false);
    }

    updateLoad(e): void {
        this.setState({
            kWh: e.detail.kWh,
            on: e.detail.on
        });
    }

    toggleOnOff(e: object, on: bool): Object {
        // TODO: move this to poltergeist class and handle error
        const whyStringLee = on ? "on" : "off";
        window.poltergeist.offOn(null, null, "000d6f000b93ab53", 1, whyStringLee);
    }

    render(): React.Element {
        return (
            <Paper className="messages" zDepth={3}>
                <h3>
                    <EnergyIcon />
                    <span>Smart Plugs</span>
                </h3>
                <Divider />
                <List style={{marginTop: "3px", padding: 0}}>
                    <ListItem
                        rightToggle={
                            <Toggle
                                toggled={this.state.on}
                                onToggle={this.toggleOnOff.bind(this)}
                            />
                        }
                        primaryText={"Demo Energy Switch 1"}
                        secondaryText={`${this.state.kWh} kWh`}
                    />
                </List>
            </Paper>
        );
    }
}

export default EnergySwitch;
