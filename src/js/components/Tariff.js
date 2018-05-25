/* @flow */

import React from "react";

import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";

import TariffIcon from "material-ui/svg-icons/editor/insert-chart";
import ArrowIcon from "material-ui/svg-icons/communication/call-made";

class MeterMessages extends React.Component {

    render(): React.Element {
        return (
            <Paper className="tariff" zDepth={3}>
                <h3>
                    <TariffIcon />
                    <span>Tariff</span>
                </h3>
                <Divider />
                <p>
                    <span className="electric">Electric: </span>
                    <span>20.682p per kWh</span>
                </p>
                <Divider />
                <p>
                    <span className="gas">Gas: </span>
                    <span>3.272p per kWh</span>
                </p>
            </Paper>
        );
    }
}

export default MeterMessages;
