/* @flow */

import React from "react";

import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import "../../scss/base.scss";
import "../../scss/veon.scss";

const custom = {
    appBar: {
        color: "#FFFFFF",
        textColor: "#333333"
    },
    bottomNavigation: {
        selectedColor: "#ffcc00",
        unselectedColor: "#D1D2D1",
        selectedFontSize: "12px",
        unselectedFontSize: "12px"
    },
    floatingActionButton: {
        miniSize: "48px"
    },
    toggle: {
        thumbOnColor: "#00B0C8",
        trackOnColor: "#B1E7EF",
        thumbOffColor: "#EDEDED",
        trackOffColor: "#B0AEAF"
    },
    palette: {
        primary1Color: "#ffcc00",
        primary2Color: "#D7054C",
        primary3Color: "#00B0C8",
        accent1Color: "#D7054C",
        accent2Color: "#00B0C8",
        textColor: "#333333"
    }
};

const theme = getMuiTheme(Object.assign(darkBaseTheme, custom));

class Veon extends React.Component {

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

export default Veon;
