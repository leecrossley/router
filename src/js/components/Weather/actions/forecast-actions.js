import * as constants from "../constants/forecast-constants";

export const requestingForecast = () => ({
    type: constants.REQUESTING_FORECAST
});

export const forecastReceived = forecast => ({
    type: constants.FORECAST_RECEIVED,
    forecast
});

export const forecastRequestFailed = error => ({
    type: constants.FORECAST_REQUEST_FAILED,
    error
});

export const forecastRefreshRequired = () => ({
    type: constants.FORECAST_REFRESH_REQUIRED
});
