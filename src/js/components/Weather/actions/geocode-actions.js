import * as constants from "../constants/geocode-constants";

export const settingNewCity = city => ({
    type: constants.SETTING_NEW_CITY,
    city
});

export const requestingGeocode = () => ({
    type: constants.REQUESTING_GEOCODE
});

export const geocodeReceived = payload => ({
    type: constants.GEOCODE_RECEIVED,
    payload
});

export const geocodeRequestFailed = error => ({
    type: constants.GEOCODE_REQUEST_FAILED,
    error
});
