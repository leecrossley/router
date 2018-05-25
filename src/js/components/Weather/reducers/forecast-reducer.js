import * as constants from "../constants/forecast-constants"
import * as geocodeConstants from "../constants/geocode-constants"

export const forecastReducer = (state = {}, action = { type: "NONE"}) => {
    switch (action.type) {
        case geocodeConstants.SETTING_NEW_CITY:
            return {
                loading: false,
                loaded: null
            }
        case constants.REQUESTING_FORECAST:
            return {
                ...state,
                loading: true,
                loaded: null
            }
        case constants.FORECAST_RECEIVED:
            return {
                ...state,
                loading: false,
                loaded: action.forecast
            }
        case constants.FORECAST_REQUEST_FAILED:
            return {
                loading: false,
                loaded: null,
                error: action.error
            }
        case constants.FORECAST_REFRESH_REQUIRED:
            return {
                loading: false,
                loaded: null,
                error: false
            }
        default:
            return state;
    }
}
