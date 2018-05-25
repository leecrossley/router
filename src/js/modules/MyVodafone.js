/* @flow */

import React from "react";
import translate from "counterpart";

import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import Card from "../components/Card";
import Button from "../components/Button";
import Market from "../actions/Market";

class MyVodafone extends React.Component {

    render(): React.Element {
        let type = this.props.params.type;

        return (
            <div data-page="myvodafone" className="page navbar-fixed toolbar-fixed">
                <Navbar title={translate(`my_vodafone.${type}.title`)} back={true}></Navbar>
                    <div className="page-content">
                        <div className="content-block">
                            <Card>
                                <p className="card-title">
                                    {translate(`my_vodafone.title`)}
                                </p>
                                <p className="card-icon">
                                    <Icon name="my-vodafone" />
                                </p>
                                <p className="card-description">
                                    {translate(`my_vodafone.${type}.description`)}
                                </p>
                                <p>
                                    <Button
                                        className="button button-fill button-raised"
                                        onClick={Market.open.bind(this, "my_vodafone")}>

                                        {translate("my_vodafone.open")}
                                    </Button>
                                </p>
                            </Card>
                        </div>
                    </div>
            </div>
        );
    }
}

export default MyVodafone;
