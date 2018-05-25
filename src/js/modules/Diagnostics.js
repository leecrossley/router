/* @flow */

import React from "react";
import translate from "counterpart";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

import Actions from "../actions/Diagnostics";

class Diagnostics extends React.Component {

    state: Object = {
        running: false,
        results: []
    };

    updateTimeout: ?number;
    isUnmounted: boolean = false;

    componentDidMount(): void {
        this.update();
    }

    componentWillUnmount(): void {
        this.isUnmounted = true;
        clearTimeout(this.updateTimeout);
    }

    update(): void {
        if (this.isUnmounted) {
            return;
        }
        Actions.results()
            .then(this.updateState.bind(this))
            .catch(this.updateError.bind(this));
    }

    updateState(res: Array<Object>): void {
        console.log(res);
        // TODO: massive hack
        res.diagnoseResult = "8412,8410,8421";
        this.setState({
            running: res.diagnoseActivate,
            results: results === ""
                ? []
                : res.diagnoseResult.split(",")
        });
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(this.update.bind(this), 10000);
    }

    updateError(err: Object): void {
        console.log(err);
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(this.update.bind(this), 10000);
    }

    run(): void {
        if (this.state.running) {
            return;
        }

        window.f7app.showIndicator();
        clearTimeout(this.updateTimeout);

        Actions.run()
            .then(() => {
                this.update();
                window.f7app.hideIndicator();
            })
            .catch(() => {
                this.update();
                window.f7app.hideIndicator();
            });
    }

    renderTitle(): string {
        if (this.state.running) {
            return translate("diagnostics.title");
        }

        return translate("diagnostics.results");
    }

    renderResults(): string {
        if (this.state.running) {
            return translate("diagnostics.running");
        }

        if (this.state.results.length === 0) {
            return translate("diagnostics.no_results");
        }

        return fjs.map((code) => {
            return translate(`diagnostics.result.code_${code}`);
        }, this.state.results);
    }

    renderRunButton(): ?React.Element {
        if (this.state.running) {
            return;
        }
        return (
            <Button
                className="button button-fill button-raised"
                onClick={this.run.bind(this)}>

                {translate("diagnostics.run")}
            </Button>
        );
    }

    render(): React.Element {

        return (
            <div data-page="diagnostics" className="page navbar-fixed toolbar-fixed">
                <Navbar title={translate("diagnostics.title")} back={true}></Navbar>
                    <div className="page-content">
                        <div className="content-block">
                            <Card>
                                <p className="card-title">
                                    {this.renderTitle()}
                                </p>
                                <p className="card-description">
                                    {this.renderResults()}
                                </p>
                                <p>
                                    {this.renderRunButton()}
                                </p>
                            </Card>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Diagnostics;
