/* @flow */

import React from "react";
import translate from "counterpart";

import Navbar from "../components/Navbar";
import { ListView, ListItem } from "../components/List";
import Switch from "../components/Switch";
import Button from "../components/Button";
import Icon from "../components/Icon";

class Schedule extends React.Component {

    render(): React.Element {

        return (
            <div data-page="schedule" className="page navbar-fixed toolbar-fixed">
                <Navbar title={translate("schedule.title")} menu={true}></Navbar>

                <Button className="floating-button">
                    <Icon name="plus" />
                </Button>
            </div>
        );
    }
}

export default Schedule;
