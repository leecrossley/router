/* @flow */

import React from "react";

import Paper from "material-ui/Paper";
import {Grid, Row, Col} from "react-flexbox-grid";
import Divider from "material-ui/Divider";

import AccountIcon from "material-ui/svg-icons/action/account-box";
import ArrowIcon from "material-ui/svg-icons/communication/call-made";

class MeterMessages extends React.Component {

    render(): React.Element {
        return (
            <Paper className="account" zDepth={3}>
                <h3>
                    <AccountIcon />
                    <span>Account</span>
                </h3>
                <Divider />
                <Row>
                    <Col xs={6}>
                        <span className="gas">Gas</span>
                        <span className="gas">£15.20</span>
                        <span className="gas">credit</span>
                    </Col>
                    <Col xs={6}>
                        <span className="electric">Electric</span>
                        <span className="electric">£25.35</span>
                        <span className="electric">credit</span>
                    </Col>
                </Row>
                <span>
                    No debt to clear
                </span>
            </Paper>
        );
    }
}

export default MeterMessages;
