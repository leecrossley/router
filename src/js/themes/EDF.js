/* @flow */

import React from "react";

import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import "../../scss/base.scss";
import "../../scss/edf.scss";
import "../../scss/polaris.scss";
import "../../scss/chartist.scss";
import "../../scss/weather.scss";

const custom = {
    appBar: {
        height: 50,
        color: "#0B1031"
    },
    palette: {
        primary1Color: "#29396A",
        primary2Color: "#F5C039",
        accent1Color: "#9E9E9E"
    }
};

const theme = getMuiTheme(Object.assign(darkBaseTheme, custom));

class EDF extends React.Component {

    render(): React.Element {
        return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }

}

export default EDF;
