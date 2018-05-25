/* @flow */

import React from "react";

import Paper from "material-ui/Paper";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";

import MessageIcon from "material-ui/svg-icons/communication/message";
import ArrowIcon from "material-ui/svg-icons/communication/call-made";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import ElectricIcon from "material-ui/svg-icons/action/lightbulb-outline";
import GasIcon from "material-ui/svg-icons/social/whatshot";

const months = ["Jan", "Feb", "Mar", "Apr", "May",
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const now = new Date();

// TODO: Pass actual messages

class MeterMessages extends React.Component {

    state: Object = {
        modal: false
    };

    open(): Object {
        return this.setState({
            modal: true
        });
    }

    close(e: object): Object {
        return this.setState({
            modal: false
        });
    }

    render(): React.Element {
        return (
            <Paper className="messages" zDepth={3}>
                <h3 onClick={this.open.bind(this)}>
                    <MessageIcon />
                    <span>Messages</span>
                    <ArrowIcon />
                </h3>
                <Divider />
                <h4>
                    <span className="gas">
                        Gas Meter
                    </span>
                    <small>
                        {`${now.getDate()} ${months[now.getMonth()]}`}
                    </small>
                </h4>
                <p>
                    Your smart gas meter has been connected and you can now monitor your usage.
                </p>
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
                        title="Messages"
                    />
                    <List>
                        <ListItem
                            leftCheckbox={
                                <GasIcon className="gas" />
                            }
                            rightToggle={
                                <small>{`${now.getDate()} ${months[now.getMonth()]}`}</small>
                            }
                            primaryText={
                                <span className="gas">Gas Meter</span>
                            }
                            secondaryText={
                                <p>
                                    Your smart gas meter has been connected and you can now monitor your usage.
                                </p>
                            }
                        />
                        <Divider inset={true} />
                        <ListItem
                            leftCheckbox={
                                <ElectricIcon className="electric" />
                            }
                            rightToggle={
                                <small>{`${now.getDate()} ${months[now.getMonth()]}`}</small>
                            }
                            primaryText={
                                <span className="electric">Electric Meter</span>
                            }
                            secondaryText={
                                <p>
                                    Your smart electric meter has been connected and you can now monitor your usage.
                                </p>
                            }
                        />
                    </List>
                </Dialog>
            </Paper>
        );
    }
}

export default MeterMessages;
