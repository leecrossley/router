import React from "react";
import * as actions from "../actions/geocode-actions";
import * as config from "../config.js";

import Paper from "material-ui/Paper";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import ArrowIcon from "material-ui/svg-icons/communication/call-made";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import Key from "./Key";
import Thermometer from "./Thermometer";

import { grey900, grey500, grey100, indigo900 } from "material-ui/styles/colors";

const WeatherWidget = React.createClass({
    propTypes: {
        city: React.PropTypes.string.isRequired,
        lat: React.PropTypes.number,
        lng: React.PropTypes.number,
        setNewCity: React.PropTypes.func.isRequired,
        loadGeocode: React.PropTypes.func.isRequired
    },
    componentWillMount(){
        const { loaded, loading, error, loadGeocode, city } = this.props;

        this.setState({
            dailyForecastOpen: false,
            city
        });

        if (!loaded && !loading && !error) {
            loadGeocode(city);
        }
    },
    componentWillReceiveProps(nextProps){
        const { loaded, loading, error, loadGeocode, city } = nextProps;

        this.setState({
            city
        });

        if (!loaded && !loading && !error) {
            loadGeocode(city);
        }
    },
    handleOpenChangeCity(){
        const title = "Change location";
        const msg = "Set your preferred weather location";
        navigator.notification.prompt(msg,
            this.handleConfirmChangeCity, title)
    },
    handleConfirmChangeCity(input){
        if (input && input.buttonIndex && input.buttonIndex === 1
                && input.input1 && input.input1.trim().length > 0) {
            const city = input.input1.trim();
            if (this.state.city !== city){
                this.props.setNewCity(city);
            }
        }
    },
    handleOpenDailyForecast(){
        this.setState({ dailyForecastOpen: true });
    },
    handleCloseDailyForcecast(){
        this.setState({ dailyForecastOpen: false });
    },
    render(){
        const { lat, lng, city } = this.props;
        const { loading, loaded, error } = this.props;

        return <Paper className="weather" zDepth={3}>
        <h3>
            <Thermometer />
            <span onClick={this.handleOpenChangeCity}>Weather in <u>{city}</u></span>
            { loaded && <ArrowIcon className="expand" onClick={this.handleOpenDailyForecast} />}
        </h3>
        <Divider />
        {
            loaded && <Dialog
                className="modal messages-modal"
                bodyClassName="weather-daily"
                open={this.state.dailyForecastOpen}
                onRequestClose={this.handleCloseDailyForcecast}
                modal={false}>
                <AppBar
                    iconElementLeft={
                        <IconButton onClick={this.handleCloseDailyForcecast}>
                            <CloseIcon />
                        </IconButton>
                    }
                    className="modalbar"
                    title="7 Day Weather Forecast"
                />
                <DailyForecast lat={lat} lng={lng} />
            </Dialog>
            }
            <div className="hourly-weather-container">
            { loaded && <Key /> }
            {
                loaded && <HourlyForecast lat={lat} lng={lng} />
            }
            {
                error && <div>Location data unavailable</div>
            }
            {
                loading && <div>Locating...</div>
            }
            </div>
        </Paper>
    }
});

export default WeatherWidget;
