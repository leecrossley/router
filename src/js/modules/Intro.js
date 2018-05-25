/* @flow */

import React from "react";
import translate from "counterpart";

import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import Card from "../components/Card";
import Button from "../components/Button";

class Intro extends React.Component {

    reload(): void {
        window.navigator.splashscreen.show();
        window.StatusBar.styleDefault();

        setTimeout(() => {
            window.location.href = window.location.pathname;
        }, 500);
    }

    render(): React.Element {
        let type = this.props.params.type;
        let subType = this.props.params.subType;

        return (
            <div data-page="intro" className="page navbar-fixed">
                <Navbar title={translate(`intro.${type}.title`)}></Navbar>
                    <div className="page-content">
                        <div className="content-block wide-card">
                            <Card className={subType === "no_wifi" ? "card" : "card hidden"}>
                                <p className="card-title">
                                    {translate(`intro.${type}.${subType}.title`)}
                                </p>
                                <p className="card-description">
                                    {translate(`intro.${type}.${subType}.description`)}
                                </p>
                                <div>
                                    <p>{translate(`intro.${type}.${subType}.try0.suggest`)}</p>
                                    <img className="intro-help router-wall-socket" />
                                    <p>{translate(`intro.${type}.${subType}.try0.confirm`)}</p>
                                </div>
                                <div>
                                    <p>{translate(`intro.${type}.${subType}.try1.suggest`)}</p>
                                    <img className="intro-help router-power-button" />
                                    <p>{translate(`intro.${type}.${subType}.try1.confirm`)}</p>
                                </div>
                                <div>
                                    <p>{translate(`intro.${type}.${subType}.try2.suggest`)}</p>
                                    <img className="intro-help router-password" />
                                    <p>{translate(`intro.${type}.${subType}.try2.confirm`)}</p>
                                </div>
                                <p>
                                    <Button
                                        className="button button-fill button-raised"
                                        onClick={this.reload}>
                                        {translate("intro.retry")}
                                    </Button>
                                </p>
                            </Card>


                            <Card className={subType === "no_internet" ? "card" : "card hidden"}>
                                <p className="card-title">
                                    {translate(`intro.${type}.${subType}.title`)}
                                </p>
                                <p className="card-description">
                                    {translate(`intro.${type}.${subType}.description`)}
                                </p>
                                <div>
                                    <p>{translate(`intro.${type}.${subType}.try0.suggest`)}</p>
                                    <img className="intro-help router-connect" />
                                    <p>{translate(`intro.${type}.${subType}.try0.confirm`)}</p>
                                </div>
                                <div>
                                    <p>{translate(`intro.${type}.${subType}.try1.suggest`)}</p>
                                    <img className="intro-help router-power-button" />
                                    <p>{translate(`intro.${type}.${subType}.try1.confirm`)}</p>
                                </div>
                                <p>
                                    <Button
                                        className="button button-fill button-raised">
                                        {translate("intro.retry")}
                                    </Button>
                                </p>
                            </Card>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Intro;
