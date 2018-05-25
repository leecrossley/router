/* @flow */

import React from "react";
import translate from "counterpart";

import AppBar from "../components/AppBar";
import PageTransition from "../utils/PageTransition";

import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

class CameraBought extends React.Component {

    componentDidMount(): void {
        PageTransition.execute();
    }

    render(): React.Element {
        return (
            <div>
                <AppBar title="Home Camera" menu={true} />
                <Paper className="camera-main paper-main" zDepth={1}>
                    <div className="camera-tick"></div>
                    <p className="camera-description">
                        <b>Your home camera has been ordered.</b>
                    </p>
                    <p className="camera-description">
                        When it arrives, tap the camera tab for setup instructions.
                    </p>
                    <p>
                        <RaisedButton
                            label="Setup"
                            secondary={true}
                        />
                    </p>
                </Paper>
            </div>
        );
    }
}

export default CameraBought;
