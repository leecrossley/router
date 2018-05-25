/* @flow */

import React from "react";

import Theme from "../themes/Presciense";
import VirtualButtons from "../components/VirtualButtons";
import SmartDiagnostics from "../components/SmartDiagnostics";

import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";

class SinglePageLayout extends React.Component {

    render(): React.Element {
        return (
            <Theme>
                <AppBar
                    className="appbar"
                    iconElementLeft={<img src="img/logo.svg" />}
                    title="Diagnostics"
                />
                <SmartDiagnostics />
                <VirtualButtons />
            </Theme>
        );
    }

}

export default SinglePageLayout;
