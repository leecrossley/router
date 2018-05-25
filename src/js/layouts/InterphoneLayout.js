/* @flow */

import React from "react";

import Theme from "../themes/Interphone";
import DateTime from "../components/DateTime";

import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import {Grid, Row, Col} from "react-flexbox-grid";

import SvgIcon from "material-ui/SvgIcon";
import SmokeIcon from "material-ui/svg-icons/social/whatshot";
import BatteryIcon from "material-ui/svg-icons/device/battery-full";
import BatteryAlertIcon from "material-ui/svg-icons/device/battery-alert";

const WaterIcon = (props) => (
    <SvgIcon viewBox="0 0 405.047 405.047" {...props}>
        <path d="M283.897,92.846c-36.582-49.345-73.688-89.267-74.061-89.664C207.944,1.153,205.296,0,202.523,0   c-2.774,0-5.423,1.152-7.314,3.182c-0.371,0.397-37.478,40.319-74.06,89.664c-49.971,67.403-75.308,119.726-75.308,155.513   c0,86.396,70.287,156.688,156.682,156.688c86.396,0,156.683-70.29,156.683-156.688C359.206,212.572,333.868,160.25,283.897,92.846z    M218.171,354.342c-8.213,1.941-16.68,2.926-25.162,2.926c-60.294,0-109.347-49.055-109.347-109.35   c0-8.312,2.559-23.373,14.75-47.914c1.225-2.467,4.046-3.691,6.687-2.908c2.639,0.785,4.33,3.357,4.007,6.091   c-0.28,2.361-0.421,4.584-0.421,6.607c0,64.629,45.966,120.77,109.298,133.484c2.607,0.525,4.5,2.795,4.545,5.455   C222.575,351.396,220.761,353.729,218.171,354.342z" />
    </SvgIcon>
);

const ValveIcon = (props) => (
    <SvgIcon viewBox="0 0 428 428" {...props}>
        <path d="M308,194.817h-2.429v-18.272c0-16.568-13.433-30-30-30H249v-23.038h61.009c19.33,0,35-15.67,35-35s-15.67-35-35-35h-67.416   c-6.338-8.966-16.776-14.826-28.593-14.826c-11.816,0-22.255,5.86-28.593,14.826h-67.416c-19.33,0-35,15.67-35,35s15.67,35,35,35   H179v23.038h-26.571c-16.568,0-30,13.432-30,30v18.272H120c-66.169,0-120,53.832-120,120v74.501h80v-74.501   c0-22.056,17.944-40,40-40h2.429v18.272c0,16.568,13.432,30,30,30h123.143c16.567,0,30-13.432,30-30v-18.272H308   c22.056,0,40,17.944,40,40v74.501h80v-74.501C428,248.649,374.169,194.817,308,194.817z" />
    </SvgIcon>
);

const BarsIcon = (props) => (
    <SvgIcon viewBox="0 0 74 74" {...props}>
        <path d=" M 52.38 16.52 C 54.13 15.20 57.01 16.62 56.91 18.85 C 57.07 28.94 57.07 39.04 56.91 49.13 C 57.05 52.33 51.98 53.01 51.20 49.95 C 50.71 40.67 51.17 31.34 50.97 22.04 C 51.15 20.20 50.52 17.71 52.38 16.52 Z" />
        <path d=" M 34.34 25.52 C 36.11 24.16 39.00 25.64 38.92 27.87 C 39.07 34.94 39.07 42.02 38.92 49.09 C 39.09 52.30 34.03 53.03 33.19 49.97 C 32.71 43.67 33.15 37.32 32.97 31.00 C 33.15 29.18 32.53 26.71 34.34 25.52 Z" />
        <path d=" M 16.36 34.51 C 18.13 33.21 21.02 34.61 20.91 36.86 C 21.05 41.23 21.21 45.64 20.79 50.00 C 20.09 52.56 15.96 52.61 15.23 50.05 C 14.77 46.37 15.03 42.65 14.99 38.96 C 15.07 37.42 14.83 35.45 16.36 34.51 Z" />
    </SvgIcon>
);

class TileLayout extends React.Component {

    render(): React.Element {
        return (
            <Theme>
                <AppBar
                    zDepth={2}
                    className="appbar"
                    iconElementLeft={<img src="img/interphone.png" />}
                    iconElementRight={<DateTime />}
                />
                <Grid className="grid" fluid={true}>
                    <Row>
                        <Col xs={12} sm={12}>
                            <Paper className="camera-container" zDepth={2} rounded={false}>
                                <img src="http://192.168.0.158/img/video.mjpeg?channel=2" />
                            </Paper>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={8}>
                            <Paper className="sensor-container" zDepth={2} rounded={false}>
                                <List className="leak-container">
                                    <Subheader className="sub">Leak Detection</Subheader>
                                    <ListItem
                                        primaryText="Demo Water"
                                        secondaryText="Water Detector"
                                        leftIcon={<WaterIcon style={{
                                            backgroundColor: "#8A8B8A",
                                            top: 4,
                                            margin: 12,
                                            left: 3,
                                            width: 24,
                                            height: 24,
                                            borderRadius: "50%",
                                            padding: 10,
                                            color: "#FFF",
                                            fill: "#FFF"
                                        }} />}
                                        rightIcon={<div className="indicators">
                                            <BatteryIcon style={{
                                                color: "#8BC34A",
                                                fill: "#8BC34A"
                                            }} />
                                            <BarsIcon style={{
                                                color: "#8BC34A",
                                                fill: "#8BC34A"
                                            }} />
                                        </div>}
                                    />
                                    <ListItem
                                        leftIcon={<ValveIcon style={{
                                            backgroundColor: "#8A8B8A",
                                            top: 4,
                                            margin: 12,
                                            left: 3,
                                            width: 24,
                                            height: 24,
                                            borderRadius: "50%",
                                            padding: 10,
                                            color: "#FFF",
                                            fill: "#FFF"
                                        }} />}
                                        rightIcon={<BarsIcon style={{
                                            color: "#8BC34A",
                                            fill: "#8BC34A"
                                        }} />}
                                        primaryText="Demo Valve"
                                        secondaryText="Water Shutoff Valve"
                                    />
                                </List>
                            </Paper>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Paper className="sensor-container" zDepth={2} rounded={false}>
                                <List>
                                    <Subheader className="sub">Smoke Detection</Subheader>
                                    <ListItem
                                        leftIcon={<SmokeIcon style={{
                                            backgroundColor: "#8A8B8A",
                                            top: 4,
                                            margin: 12,
                                            left: 3,
                                            width: 24,
                                            height: 24,
                                            borderRadius: "50%",
                                            padding: 10,
                                            color: "#FFF",
                                            fill: "#FFF"
                                        }} />}
                                        rightIcon={<div className="indicators">
                                            <BatteryAlertIcon style={{
                                                color: "#FFC107",
                                                fill: "#FFC107"
                                            }} />
                                            <BarsIcon style={{
                                                color: "#8BC34A",
                                                fill: "#8BC34A"
                                            }} />
                                        </div>}
                                        primaryText="Demo Smoke"
                                        secondaryText="Smoke Detector"
                                    />
                                </List>
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
            </Theme>
        );
    }

}

export default TileLayout;
