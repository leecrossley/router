import React from "react";
import { Motion, spring } from "react-motion";
import {
    IndicatorPixel,
    BackgroundIndicator,
    TargetIndicator,
    CurrentIndicator,
    InnerIndicator,
    IndicatorArrow
} from "./lib/indicators";
import {
    CostLabel,
    KWhLabel,
    CO2Label
} from "./lib/labels";

const Gauge = React.createClass({
    displayName: "Gauge",
    propTypes: {
        currentValue: React.PropTypes.shape({
            cost: React.PropTypes.number,
            kwh: React.PropTypes.number,
            co2: React.PropTypes.number
        }),
        targetValue: React.PropTypes.number
    },
    componentWillMount () {
        this.setState({
            max: this.props.targetValue * 1.25
        });
    },
    componentWillReceiveProps (props) {
        if (this.props.targetValue !== props.targetValue) {
            this.setState({
                max: props.targetValue * 1.25
            });
        }
    },
    computeValue (cost: number): number {
        return Math.min(1, cost / this.state.max);
    },
    render (): string {
        const { cost, co2, kwh } = this.props.currentValue;
        const value = this.computeValue(cost);
        const motionProps = {
            defaultStyle: {
                value: 0
            },
            style: {
                value: spring(value, {stiffness: 60, damping: 13})
            }
        };
        return <div className="gauge">
            <svg viewBox="0 0 100 100">
                <BackgroundIndicator />
                <TargetIndicator />
                <InnerIndicator />
                <Motion {...motionProps}>
                { ({ value }: number): string =>
                    <g>
                        <CurrentIndicator value={value} />
                        <IndicatorArrow value={value} />
                        <IndicatorPixel value={value} />
                    </g>
                }
                </Motion>
                <CostLabel>{cost}</CostLabel>
                <KWhLabel>{kwh}</KWhLabel>
                <CO2Label>{co2}</CO2Label>
            </svg>
        </div>;
    }
});

export default Gauge;
