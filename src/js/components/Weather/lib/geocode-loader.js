import * as actions from "../actions/geocode-actions.js";
import { mapQuestURI } from "../config";
import "whatwg-fetch";

const loadGeocode = city => dispatch => {
    dispatch(actions.requestingGeocode());

    fetch(mapQuestURI(city), {
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
        dispatch(actions.geocodeReceived(payload));
    })
    .catch(error => {
        dispatch(actions.geocodeRequestFailed({error}))
    });
}

export default loadGeocode;
