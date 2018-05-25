/* @flow */

import React from "react";

import AppBar from "material-ui/AppBar";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

import DebugIcon from "material-ui/svg-icons/action/build";
import IconButton from "material-ui/IconButton";

class Debug extends React.Component {

    state: Object = {
        modal: false,
        init: false,
        sync: false,
        lastMsg: "No messages",
        counter: 0
    };

    componentDidMount(): void {
        document.addEventListener("debugger", this.showDialog.bind(this), false);
    }

    showDialog(): Object {
        return this.setState({
            modal: true,
        });
    }

    closeDialog(): Object {
        return this.setState({
            modal: false
        });
    }

    showError(msg: ?String): void {
        msg = msg || "Unknown Error";
        navigator.notification.alert(msg, null, "Error");
    }

    init(): void {
        window.poltergeist.init((msg: String) => {
            this.setState({
                init: true,
                lastMsg: msg,
                counter: this.state.counter + 1
            });
        }, this.showError.bind(this));
    }

    sync(): void {
        if (!this.state.init) {
            return;
        }
        window.poltergeist.sync(() => {
            this.setState({
                sync: true
            });
        }, this.showError.bind(this));
    }

    teardown(): void {
        if (!this.state.init || !this.state.sync) {
            return;
        }
        window.poltergeist.teardown(() => {
            this.setState({
                init: false,
                sync: false,
                counter: 0,
                lastMsg: "Teardown"
            });
        }, this.showError.bind(this));
    }

    render(): React.Element {
        return (
            <Dialog
                className="modal wifi-modal"
                open={this.state.modal}
                modal={false}
                onRequestClose={this.closeDialog.bind(this)}
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}>
                <AppBar
                    iconElementLeft={
                        <IconButton>
                            <DebugIcon />
                        </IconButton>
                    }
                    className="modalbar"
                    title="Debug Module"
                />
            <div className="debug-block">
                    <RaisedButton
                        disableTouchRipple={true}
                        disabled={this.state.init}
                        label="Init"
                        onTouchTap={this.init.bind(this)}
                    />
                    <RaisedButton
                        disableTouchRipple={true}
                        disabled={!(this.state.init && !this.state.sync)}
                        label="Sync"
                        onTouchTap={this.sync.bind(this)}
                    />
                    <RaisedButton
                        disableTouchRipple={true}
                        disabled={!(this.state.init && this.state.sync) && this.state.counter === 0}
                        label="Teardown"
                        onTouchTap={this.teardown.bind(this)}
                    />
                    <p>Message counter: <b>{this.state.counter}</b></p>
                    <p>Last Message:<br/><b>{this.state.lastMsg}</b></p>
                </div>
            </Dialog>
        );
    }
}

export default Debug;
