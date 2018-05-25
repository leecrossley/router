/* @flow */

import React from "react";

import Snackbar from "material-ui/Snackbar";

class ConnectionNotifier extends React.Component {

    state: Object = {
        open: false,
        message: "",
        hideDuration: 0
    };

    componentDidMount(): void {
        document.addEventListener("connectionstatus", this.showStatus.bind(this), false);
    }

    formatMessage(msg: String): String {
        let camel = msg.charAt(0).toUpperCase() + msg.slice(1);
        if (msg === "connecting") {
            camel = `${camel}...`;
        }
        return camel;
    }

    showStatus(e: Object): void {
        this.setState({
            open: true,
            message: this.formatMessage(e.detail),
            hideDuration: e.detail === "connected" ? 1000 : 0
        });
    }

    close(e: Object): void {
        this.setState({
            open: false
        });
    }

    render(): React.Element {
        return (
            <Snackbar
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={this.state.hideDuration}
                onRequestClose={this.close.bind(this)}
            />
        );
    }
}

export default ConnectionNotifier;
