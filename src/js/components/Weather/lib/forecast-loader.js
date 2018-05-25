import * as actions from "../actions/forecast-actions.js";
import { darkSkyURI } from "../config";
import "whatwg-fetch";

/*
* Code to fetch the darksky data, making sure that various redux
* actions are triggered at the correct time.
*/

const loadForecast = (lat, lng) => dispatch => {
    dispatch(actions.requestingForecast());

    fetch(darkSkyURI(lat, lng), {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else  {
            return Promise.reject(response.status);
        }
    })
    .then(payload => {
        dispatch(actions.forecastReceived(payload));
    })
    .catch(error => {
        dispatch(actions.forecastRequestFailed({error}))
    });
}

export default loadForecast;
