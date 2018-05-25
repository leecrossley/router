import * as constants from "../constants/geocode-constants"

export const geocodeReducer = (state = {}, action = {type: "NONE"}) => {
    switch (action.type) {
        case constants.SETTING_NEW_CITY:
            return {
                city: action.city,
                loading: false,
                loaded: null,
                error: null
            }
        case constants.REQUESTING_GEOCODE:
            return {
                ... state,
                loading: true,
                loaded: null,
                error: null
            }
        case constants.GEOCODE_RECEIVED:
            return {
                ... state,
                loading: false,
                loaded: action.payload,
                error: null
            }
        case constants.GEOCODE_REQUEST_FAILED:
            return {
                ... state,
                loading: false,
                loaded: null,
                error: action.error
            }
        default:
        return state;
    }
}
