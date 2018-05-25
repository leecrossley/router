/* @flow */

import React from "react";

import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import Button from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";

import Push from "../actions/Push";
import Diagnostics from "../actions/Diagnostics";
import Notification from "../actions/Notification";

import CallIcon from "material-ui/svg-icons/communication/call";

let link = "about:blank";

class SmartDiagnostics extends React.Component {

    state: Object = {
        stepIndex: 0,
        issueCode: null
    };

    updateTimeout: ?number;

    componentDidMount(): void {
        // Push.init();
    }

    componentWillUnmount(): void {
        this.isUnmounted = true;
        clearTimeout(this.updateTimeout);
    }

    start(): void {
        this.setState({
            stepIndex: 1
        });

        setTimeout(() => {
            this.setState({
                stepIndex: 2
            });
        }, 3798);
    }

    updateLink(): void {
        fetch(`http://lighting.dev.smartgaiacloud.com/analysisReport/${this.state.issueCode}`)
            .then(res => res.json())
            .then((res) => { link = res.content.href; });
    }

    help(): void {
        this.setState({
            stepIndex: 3
        });
    }

    call(): void {
        window.plugins.CallNumber.callNumber(null, null, `#${this.state.issueCode}`);
    }

    view(): void {
        cordova.InAppBrowser.open(link, "_system", "location=yes");
    }

    run(): void {
        Diagnostics.run()
            .then(this.runState.bind(this))
            .catch(this.runError.bind(this));
    }

    runState(res: Object): void {
        this.setState({
            stepIndex: 1
        });
    }

    runError(err: Object): void {
        console.log(err);
        Notification.alert("Unable to run diagnostics", "Demo Error");
    }

    render(): React.Element {
        const {stepIndex} = this.state;

        return (
            <Paper className="diagnostics-stepper" zDepth={1}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Run Diagnostics</StepLabel>
                        <StepContent>
                            <p>
                                Tap "START" to diagnose any potential issues
                                with your gateway or connected devices.
                            </p>
                            <Button
                                label={"Start"}
                                className="step-button"
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                onTouchTap={this.start.bind(this)}
                            />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Diagnostics Running</StepLabel>
                        <StepContent>
                            <p>
                                Diagnostics are now running, this can take
                                several minutes to complete.
                            </p>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Diagnostics Results</StepLabel>
                        <StepContent>
                            <p>
                                Your diagnostics results are ready and
                                can be viewed.
                            </p>
                            <Button
                                label={"View"}
                                className="step-button"
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                onTouchTap={this.view.bind(this)}
                            />
                            <Button
                                label={"Re-Run"}
                                className="step-button"
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                onTouchTap={this.run.bind(this)}
                            />
                            <Button
                                label={"Help"}
                                className="step-button"
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                onTouchTap={this.help.bind(this)}
                            />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel icon={<CallIcon style={{color: "rgb(158, 158, 158)"}} />}>
                            Further Assistance
                        </StepLabel>
                        <StepContent>
                            <p>
                                Call us using your unique issue code
                                for further assistance.
                            </p>
                            <Button
                                label={"Re-Run"}
                                className="step-button"
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                onTouchTap={this.run.bind(this)}
                            />
                            <Button
                                label={"Call Us"}
                                className="step-button"
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                onTouchTap={this.call.bind(this)}
                            />
                        </StepContent>
                    </Step>
                </Stepper>
            </Paper>
        );
    }
}

export default SmartDiagnostics;
