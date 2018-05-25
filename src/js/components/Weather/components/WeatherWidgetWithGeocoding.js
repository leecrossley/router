import React from "react";
import { connect } from "react-redux";
import geocodeConnector from "../connectors/geocode-connector";
import * as actions from "../actions/geocode-actions";
import loadGeocode from "../lib/geocode-loader";
import WeatherWidget from "./WeatherWidget";

export const mapStateToProps = (state, ownProps) => {

    const response = state.geocode.loaded;
    const city = state.geocode.city || ownProps.city;
    const { geocodeCity, lat, lng } = geocodeConnector(response);

    if (city && lat && lng){
        return {
            city: geocodeCity,
            lat,
            lng,
            loaded: true,
            loading: false,
            error: false
        }
    }

    return {
        city: city || ownProps.city,
        loaded: false,
        loading: state.geocode.loading || false,
        error: state.geocode.error || false
    }
}

export default connect(mapStateToProps, {
    loadGeocode,
    setNewCity: city => dispatch => dispatch(actions.settingNewCity(city))
})(WeatherWidget);
