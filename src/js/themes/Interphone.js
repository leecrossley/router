/* @flow */

import React from "react";

import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import "../../scss/base.scss";
import "../../scss/interphone.scss";

const custom = {
    appBar: {
        height: 50,
        color: "#FFFFFF"
    },
    palette: {
        primary1Color: "#29396A",
        primary2Color: "#F5C039",
        accent1Color: "#9E9E9E"
    }
};

const theme = getMuiTheme(Object.assign(darkBaseTheme, custom));

class Interphone extends React.Component {

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

export default Interphone;
