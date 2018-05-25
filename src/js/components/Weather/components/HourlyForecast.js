import React from "react";
import { connect } from "react-redux";
import { hourlyForecastConnector } from "../connectors/forecast-connectors";
import loadForecast from "../lib/forecast-loader";
import Forecasts from "./Forecasts";

export const mapStateToProps = (state, ownProps) => {
    const response = state.forecast.loaded;
    const { intervals } = hourlyForecastConnector(response);

    if (state.forecast.loaded){
        return {
            intervals,
            loaded: true,
            loading: false,
            error: false
        }
    }
    return {
        loaded: false,
        loading: state.forecast.loading || false,
        error: state.forecast.error || false
    }
}

export default connect(mapStateToProps, { loadForecast })(Forecasts);
