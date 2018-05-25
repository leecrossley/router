/* @flow */

import React from "react";
import translate from "counterpart";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Notification from "../actions/Notification";

import { Tabs, Tab } from "../components/Tabs";
import { ListView, ListItem } from "../components/List";

class Support extends React.Component {

    demo(e: ?Object): void {
        e.preventDefault();
        // translation not req, will be removed
        let msg = "Action is not permitted in demo mode";
        Notification.alert(msg);
    }

    render(): React.Element {
        return (
            <div data-page="support" className="page navbar-fixed toolbar-fixed">
                <Navbar title={translate("support.title")} menu={true}></Navbar>

                <Tabs>
                    <Tab id="status" icon="status">
                        <ListView>
                            <ListItem
                                to="/my-vodafone/bills"
                                title={translate("my_vodafone.bills.title")}
                                icon="phone-bills" />
                            <ListItem
                                to="/my-vodafone/line"
                                title={translate("my_vodafone.line.title")}
                                icon="line-activation" />
                        </ListView>
                        <ListView>
                            <ListItem
                                to="#"
                                onClick={this.demo}
                                title={translate("support.speed_test")}
                                icon="speed-test" />
                            <ListItem
                                to="/diagnostics"
                                title={translate("diagnostics.title")}
                                icon="diagnostics" />
                        </ListView>
                    </Tab>
                    <Tab id="support" icon="support">
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Support;
