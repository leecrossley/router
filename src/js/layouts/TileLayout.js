/* @flow */

import React from "react";

// Lots of this hardcoded for now, will be pulled from /config
// this.props.routes[0].childRoutes etc

import Theme from "../themes/Presciense";
import DateTime from "../components/DateTime";
import Energy from "../components/Energy";
import Messages from "../components/MeterMessages";
import Tariff from "../components/Tariff";
import Account from "../components/MeterAccount";
import Voice from "../components/Voice";

import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import {Grid, Row, Col} from "react-flexbox-grid";
import Divider from "material-ui/Divider";

class TileLayout extends React.Component {

    render(): React.Element {
        return (
            <Theme>
                <AppBar
                    className="appbar"
                    iconElementLeft={<img src="img/logo.svg" />}
                    iconElementRight={<DateTime />}
                    title="Presciense"
                />
                <Grid className="grid" fluid={true}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Energy type="gas" />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Energy type="electric" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={4}>
                            <Messages />
                        </Col>
                        <Col xs={6} sm={4}>
                            <Tariff />
                        </Col>
                        <Col xs={6} sm={4}>
                            <Voice />
                        </Col>
                    </Row>
                </Grid>
            </Theme>
        );
    }

}

export default TileLayout;
