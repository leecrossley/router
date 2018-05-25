/* @flow */

import React from "react";
import fjs from "functional.js";
import clone from "clone";

import Chart from "./Chart.js";
import Threshold from "./Threshold.js";

import Poltergeist from "../actions/Poltergeist";

import Gauge from "./Gauge/Gauge";

import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import DropDown from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import {Grid, Row, Col} from "react-flexbox-grid";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import Chip from "material-ui/Chip";
import Slider from "material-ui/Slider";

import ElectricIcon from "material-ui/svg-icons/action/lightbulb-outline";
import GasIcon from "material-ui/svg-icons/social/whatshot";
import StrengthIcon from "material-ui/svg-icons/device/signal-cellular-3-bar";
import ChartIcon from "material-ui/svg-icons/editor/show-chart";

import CloseIcon from "material-ui/svg-icons/navigation/close";

// TODO: refactor date functions out

const months = ["Jan", "Feb", "Mar", "Apr", "May",
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const now = new Date();
const daysInMonth = new Date(now.getYear(), now.getMonth() + 1, 0).getDate();

const getDayLabels = () => {
    // TODO: issue on 1st
    const start = new Date().getDay() - 1;
    const daysToShow = 9;

    return fjs.map((v, i) => {
        return (i + 1 === daysToShow)
            ? "Today"
            : days[(start + i) % 7];
    }, new Array(daysToShow));
};

const getMonday = (date) => {
    return (date.getDay() !== 1)
        ? date.setHours(-24 * (date.getDay() - 1))
        : date;
};

const getWeekLabels = () => {
    const start = new Date();
    const weeksToShow = 6;
    getMonday(start);
    start.setHours(-24 * 7 * (weeksToShow - 1));

    return fjs.map((v, i) => {
        if (i + 1 === weeksToShow) {
            return "This Week";
        }
        const week = new Date(start);
        start.setHours(24 * 7);
        return `${week.getDate()} ${months[week.getMonth()]}`;
    }, new Array(weeksToShow));
};

const getMonthLabels = () => {
    // TODO: issue in Jan
    let start = new Date().getMonth() - 1;
    const monthsToShow = 14;

    return fjs.map((v, i) => {
        return (i + 1 === monthsToShow)
            ? "This Month"
            : months[(start + i) % 12];
    }, new Array(monthsToShow));
};

const padSeries = (amount, value) => {
    let series = new Array(amount);
    series.push(value);
    return series;
};

const capital = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const tariff = {
    gas: 0.03272,
    electric: 0.20682
};

const co2 = {
    gas: 0.40957,
    electric: 0.18365
};

const current = {
    gas: 5.6,
    electric: 2.9
};

const sampleData = {
    gas: {
        daily: {
            labels: getDayLabels(),
            series: [
                [7.35, 8.67, 7.87, 7.14, 8.25, 7.98, 8.20, 7.80],
                padSeries(8, current.gas)
            ]
        },
        weekly: {
            labels: getWeekLabels(),
            series: [
                [52.35, 50.67, 48.87, 49.14, 54.25],
                padSeries(5, (7.73 * new Date().getDay() + 1))
            ]
        },
        monthly: {
            labels: getMonthLabels(),
            series: [
                [402.01, 656.52, 1252.10, 1511.65, 1826.30, 1949.10,
                    1733, 1526.28, 927.84, 505.48, 282.64, 242.51, 209.12],
                padSeries(13, (8.67 * new Date().getDate()))
            ]
        }
    },
    electric: {
        daily: {
            labels: getDayLabels(),
            series: [
                [9.76, 10.31, 12.12, 10.74, 9.14, 7.65, 11.14, 9.89],
                padSeries(8, current.electric)
            ]
        },
        weekly: {
            labels: getWeekLabels(),
            series: [
                [68.25, 69.87, 63.64, 63.06, 66.34],
                padSeries(5, (9.45 * new Date().getDay() + 1))
            ]
        },
        monthly: {
            labels: getMonthLabels(),
            series: [
                [144.15, 282.42, 268.33, 263.81, 229.32, 262.83, 218.04,
                    216.60, 173.51, 222.44, 213.93, 229.87, 121.71],
                padSeries(13, (5.57 * new Date().getDate()))
            ]
        }
    }
};

const costify = (data, unitPrice) => {
    return fjs.map((v) => {
        return v ? (v * unitPrice).toFixed(2) : undefined;
    }, data);
};

const co2ify = (data, multiplier) => {
    return fjs.map((v) => {
        return v ? (v * multiplier).toFixed(1) : undefined;
    }, data);
};

class Energy extends React.Component {
    static defaultProps: {};

    static props: {
        type: String;
    };

    inter: ?Number;

    state: Object = {
        detailModal: false,
        targetModal: false,
        gaugePeriod: "day",
        chartPeriod: "daily",
        chartUnit: "£",
        load: 0,
        target: 0,
        dragTarget: 0
    };

    componentWillMount() {
        const init = this.props.type === "gas" ? 0.25 : 1.7;
        this.setState({
            target: init,
            dragTarget: init
        });
        if (this.props.type === "electric") {
            document.addEventListener("instant", this.updateLoad.bind(this), false);
        }
    }

    updateLoad(load): Object {
        if (this.state.gaugePeriod !== "instant") {
            return;
        }
        this.setState({
            load: load.detail
        });
    }

    getIcon(): React.Element {
        if (this.props.type === "gas") {
            return <GasIcon />;
        }
        return <ElectricIcon />;
    }

    openDetail(): Object {
        return this.setState({
            detailModal: true,
            targetModal: false
        });
    }

    openTarget(): Object {
        return this.setState({
            detailModal: false,
            targetModal: true
        });
    }

    close(e: Object): Object {
        return this.setState({
            detailModal: false,
            targetModal: false
        });
    }

    updateChartPeriod(e: Object, i: Number, val: String): Object  {
        return this.setState({
            chartPeriod: val
        });
    }

    updateChartUnit(e: Object, i: Number, val: String): Object  {
        return this.setState({
            chartUnit: val
        });
    }

    updateGaugePeriod(e: Object, i: Number, val: String): Object  {
        e.stopPropagation();
        return this.setState({
            gaugePeriod: val
        });
    }

    startDrag(): void {
        this.inter = setInterval(this.updateDrag.bind(this), 500);
    }

    updateDrag(): Object {
        return this.setState({
            dragTarget: this.refs.slider.state.value
        });
    }

    stopDrag(e: object): Object {
        clearInterval(this.inter);
        return this.setState({
            dragTarget: this.refs.slider.state.value,
            target: this.refs.slider.state.value
        });
    }

    getInstantMenuItem(): React.Element {
        if (this.props.type === "electric") {
            return <MenuItem value={"instant"} primaryText="Instant" />;
        }
        return <span />;
    }

    getChartTarget(): Number {
        let targetType = this.state.target;

        if (this.state.chartUnit !== "£") {
            targetType = targetType / tariff[this.props.type]
        }

        if (this.state.chartUnit === "CO₂") {
            targetType = targetType * 0.40957;
        }

        switch (this.state.chartPeriod) {
            case "daily":
                return targetType;
            case "weekly":
                return (targetType * 7);
            case "monthly":
                return (targetType * 30);
        }
    }

    getGaugeTarget(): Number {
        switch (this.state.gaugePeriod) {
            case "day":
                return this.state.target;
            case "week":
                return (this.state.target * 7);
            case "month":
                return (this.state.target * 30);
            case "instant":
                return (this.state.target / 4); // TODO, calibrate for demo
        }
    }

    getCurrentKwh(): Number {
        switch (this.state.gaugePeriod) {
            case "day":
                return current[this.props.type];
            case "week":
                const week = sampleData[this.props.type].weekly.series[1];
                return week[week.length - 1];
            case "month":
                const month = sampleData[this.props.type].monthly.series[1];
                return month[month.length - 1];
            case "instant":
                return this.state.load / 1000;
        }
    }

    getGaugeCurrent(): Object {
        const kwh = this.getCurrentKwh();
        return {
            cost: kwh * tariff[this.props.type],
            kwh: kwh,
            co2: kwh * co2[this.props.type]
        };
    }

    getChartData(): Object {
        let chartData = clone(sampleData[this.props.type][this.state.chartPeriod]);
        if (this.state.chartUnit === "£") {
            chartData.series[0] = costify(chartData.series[0], tariff[this.props.type]);
            chartData.series[1] = costify(chartData.series[1], tariff[this.props.type]);
        }
        if (this.state.chartUnit === "CO₂") {
            chartData.series[0] = co2ify(chartData.series[0], co2[this.props.type]);
            chartData.series[1] = co2ify(chartData.series[1], co2[this.props.type]);
        }
        return chartData;
    }

    getChip(): React.Element {
        if (this.state.gaugePeriod === "instant") {
            return <Chip className="target">Currently Low</Chip>; // TODO: calibrate
        }

        return (<Chip
            onClick={this.openTarget.bind(this)}
            className="target">
            <b>Target</b> £{this.getGaugeTarget().toFixed(2)}
        </Chip>)
    }

    render(): React.Element {
        let type = capital(this.props.type);
        let chartPeriod = capital(this.state.chartPeriod);
        let target = this.getChartTarget();

        const chartOptions = {
            showArea: true,
            axisY: {
                low: 0,
                labelInterpolationFnc: value => {
                    return this.state.chartUnit === "£"
                        && value % 1 !== 0
                        ? value.toFixed(2)
                        : parseFloat(value.toFixed(2));
                }
            },
            plugins: [
                Threshold({
                    threshold: target
                })
            ]
        };

        return (
            <Paper className={this.props.type} zDepth={3} rounded={false}>
                <Row>
                    <Col xs={1} className="strip">
                        <p>
                            {this.getIcon()}
                        </p>
                    </Col>
                    <Col xs={7}>
                        <h2>
                            <StrengthIcon />
                            <span>{type}</span>
                        </h2>
                        <Gauge
                            currentValue={this.getGaugeCurrent()}
                            targetValue={this.getGaugeTarget()}
                        />
                    </Col>
                    <Col xs={3}>
                        <DropDown
                            animated={false}
                            className="period"
                            onChange={this.updateGaugePeriod.bind(this)}
                            value={this.state.gaugePeriod}>
                            {this.getInstantMenuItem()}
                            <MenuItem value={"day"} primaryText="Day" />
                            <MenuItem value={"week"} primaryText="Week" />
                            <MenuItem value={"month"} primaryText="Month" />
                        </DropDown>
                        {this.getChip()}
                        <FloatingActionButton
                            className="floating-btn"
                            onClick={this.openDetail.bind(this)}
                            mini={true}
                            secondary={true}>
                            <ChartIcon />
                        </FloatingActionButton>
                        <Dialog
                            className={`modal ${this.props.type}-modal`}
                            open={this.state.detailModal}
                            modal={false}>
                            <AppBar
                                iconElementLeft={
                                    <IconButton onClick={this.close.bind(this)}>
                                        <CloseIcon />
                                    </IconButton>
                                }
                                className="modalbar"
                                title={`${chartPeriod} ${type} Usage - ${this.state.chartUnit}`}
                            />
                            <DropDown
                                animated={false}
                                className="unit"
                                onChange={this.updateChartUnit.bind(this)}
                                value={this.state.chartUnit}>
                                <MenuItem value={"£"} primaryText="£" />
                                <MenuItem value={"kWh"} primaryText="kWh" />
                                <MenuItem value={"CO₂"} primaryText="CO₂" />
                            </DropDown>
                            <DropDown
                                animated={false}
                                className="period"
                                onChange={this.updateChartPeriod.bind(this)}
                                value={this.state.chartPeriod}>
                                <MenuItem value={"daily"} primaryText="Daily" />
                                <MenuItem value={"weekly"} primaryText="Weekly" />
                                <MenuItem value={"monthly"} primaryText="Monthly" />
                            </DropDown>
                            <Chart data={this.getChartData()} type={"Line"} options={chartOptions} />
                        </Dialog>
                        <Dialog
                            className={`modal ${this.props.type}-modal`}
                            open={this.state.targetModal}
                            modal={false}>
                            <AppBar
                                iconElementLeft={
                                    <IconButton onClick={this.close.bind(this)}>
                                        <CloseIcon />
                                    </IconButton>
                                }
                                className="modalbar"
                                title={`${type} Target Spend`}
                            />
                            <Row className="no-margin">
                                <Col xs={4}>
                                    <Chip className="chip-target">
                                        <b>Daily</b> £{this.state.dragTarget.toFixed(2)}
                                    </Chip>
                                </Col>
                                <Col xs={4}>
                                    <Chip className="chip-target">
                                        <b>Weekly</b> £{(this.state.dragTarget * 7).toFixed(2)}
                                    </Chip>
                                </Col>
                                <Col xs={4}>
                                    <Chip className="chip-target">
                                        <b>Monthly</b> £{(this.state.dragTarget * daysInMonth).toFixed(2)}
                                    </Chip>
                                </Col>
                            </Row>
                            <Slider
                                ref="slider"
                                disableFocusRipple={true}
                                onDragStart={this.startDrag.bind(this)}
                                onDragStop={this.stopDrag.bind(this)}
                                className={`${this.props.type}-slider`}
                                min={0.1}
                                max={4}
                                step={0.05}
                                defaultValue={this.state.target} />
                        </Dialog>
                    </Col>
                </Row>
            </Paper>
        );
    }
}

export default Energy;
