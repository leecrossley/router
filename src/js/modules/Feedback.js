/* @flow */

import React from "react";
import translate from "counterpart";

import Navbar from "../components/Navbar";

class Feedback extends React.Component {

    // TODO: un/happy faces
    componentDidMount(): void {
        window.hockeyapp.feedback();
    }

    render(): React.Element {

        return (
            <div data-page="feedback" className="page navbar-fixed toolbar-fixed">
                <Navbar title={translate("feedback.title")} menu={true}></Navbar>
            </div>
        );
    }
}

export default Feedback;
