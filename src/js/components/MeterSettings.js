/* @flow */

import React from "react";

import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";

import SettingsIcon from "material-ui/svg-icons/action/settings-applications";
import ArrowIcon from "material-ui/svg-icons/communication/call-made";

class MeterMessages extends React.Component {

    render(): React.Element {
        return (
            <Paper className="settings" zDepth={3}>
                <h3>
                    <SettingsIcon />
                    <span>Settings</span>
                </h3>
                <Divider />
                <p>
                    <span>MAC ID: </span>
                    6FA9-0900-00A3-2200
                </p>
                <Divider />
                <p>
                    <span>Serial: </span>
                    0123456789ABCDEF
                </p>
            </Paper>
        );
    }
}

export default MeterMessages;
