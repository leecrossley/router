/* @flow */

import React from "react";
import translate from "counterpart";

import AppBar from "../components/AppBar";
import PageTransition from "../utils/PageTransition";

import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import AddIcon from "material-ui/svg-icons/content/add";

class Camera extends React.Component {

    componentDidMount(): void {
        PageTransition.execute();
    }

    buy(): void {
        window.location.hash = "#camerabuy";
        PageTransition.start();
    }

    render(): React.Element {
        return (
            <div>
                <AppBar title="Home Camera" menu={true} />
                <Paper className="camera-main paper-main camera-live" zDepth={1}>
                    <img className="live" src="http://192.168.0.160/img/video.mjpeg?channel=1" />
                </Paper>
                <FloatingActionButton onTouchTap={this.buy} className="quick-actions-add" zDepth={3}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

export default Camera;
