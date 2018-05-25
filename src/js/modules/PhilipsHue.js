/* @flow */

import React from "react";

import { CirclePicker } from "react-color";

import Paper from "material-ui/Paper";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import Toggle from "material-ui/Toggle";

import Hue from "../actions/Hue";

import CloseIcon from "material-ui/svg-icons/navigation/close";
import BulbIcon from "material-ui/svg-icons/editor/highlight";

class PhilipsHue extends React.Component {

    state: Object = {
        modal: false,
        on: false,
        colour: "#29396a"
    };

    componentWillMount() {
        Hue.getState().then((data) => {
            this.setState({
                on: data.state.on
            });
        });
    }

    open(e: object): Object {
        e.preventDefault();
        e.stopPropagation();
        return this.setState({
            modal: true
        });
    }

    close(e: object): Object {
        return this.setState({
            modal: false
        });
    }

    toggleOnOff(e: object, on: bool): Object {
        Hue.changeState(on);
        return this.setState({
            on: on
        });
    }

    preventDefault(e: object): Object {
        e.preventDefault();
        e.stopPropagation();
    }

    changeComplete(colour: object): Object {
        Hue.changeColour(this.toCIE(colour.rgb.r, colour.rgb.g, colour.rgb.b));
        return this.setState({
            colour: colour.hex,
            on: true
        });
    }

    toCIE(red: number, green: number, blue: number): Array<number> {
        red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
        green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
        blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

        const X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
        const Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
        const Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

        let x = (X / (X + Y + Z)).toFixed(4);
        let y = (Y / (X + Y + Z)).toFixed(4);

        if (isNaN(x)) {
        	x = 0;
        }

        if (isNaN(y)) {
        	y = 0;
        }
        return [parseFloat(x), parseFloat(y)];
    }

    render(): React.Element {
        const colours = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#03a9f4","#00bcd4",
            "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#d9d9d9"];
        return (
            <Paper className="messages" zDepth={3}>
                <h3>
                    <BulbIcon />
                    <span>Smart Lighting</span>
                </h3>
                <Divider />
                    <List style={{marginTop: "3px", padding: 0}}>
                        <ListItem
                            rightToggle={
                                <Toggle
                                    toggled={this.state.on}
                                    onToggle={this.toggleOnOff.bind(this)}
                                    thumbSwitchedStyle={{
                                        backgroundColor: this.state.colour
                                    }}
                                    trackSwitchedStyle={{
                                        backgroundColor: this.state.colour,
                                        opacity: 0.4
                                    }}
                                />
                            }
                            primaryText={
                                <span onClick={this.open.bind(this)}>
                                    Demo Philips Hue Go
                                </span>
                            }
                        />
                        <ListItem
                            rightToggle={
                                <Toggle
                                    toggled={false}
                                    disabled={false}
                                />
                            }
                            primaryText={
                                <span className="disabled">
                                    Demo Philips Hue Bloom
                                </span>
                            }
                        />
                    </List>
                <Dialog
                    className="modal messages-modal"
                    open={this.state.modal}
                    modal={false}>
                    <AppBar
                        iconElementLeft={
                            <IconButton onClick={this.close.bind(this)}>
                                <CloseIcon />
                            </IconButton>
                        }
                        className="modalbar"
                        title="Demo Philips Hue Go"
                    />
                    <List>
                        <ListItem
                            rightToggle={
                                <Toggle
                                    toggled={this.state.on}
                                    onToggle={this.toggleOnOff.bind(this)}
                                    thumbSwitchedStyle={{
                                        backgroundColor: this.state.colour
                                    }}
                                    trackSwitchedStyle={{
                                        backgroundColor: this.state.colour,
                                        opacity: 0.4
                                    }}
                                    style={{
                                        top: 19
                                    }}
                                />
                            }
                            primaryText={
                                <div onClick={this.preventDefault}>
                                    <CirclePicker
                                        colors={colours}
                                        color={this.state.colour}
                                        onChangeComplete={this.changeComplete.bind(this)}
                                    />
                                </div>
                            }
                        />
                    </List>
                </Dialog>
            </Paper>
        );
    }
}

export default PhilipsHue;
