/*
* Turns the server response into something useful.
* This version of this function is for the MapQuest Geocoding api
* https://developer.mapquest.com/documentation/geocoding-api/
*/

const geocodeConnector = (res) => {
    const geocode = {
        lat : false,
        lng : false,
        geocodeCity: false
    };
    // always just pick the first matching location...
    if (res && res.results && res.results[0] && res.results[0].locations && res.results[0].locations[0]){
        const location = res.results[0].locations[0];
        // if we're not in the UK, don't consider a match
        // if (location.adminArea1 === "GB") {
            geocode.geocodeCity = location.adminArea5;
            geocode.lat = location.latLng.lat;
            geocode.lng = location.latLng.lng;
        // }
    }

    return geocode;
}

export default geocodeConnector;
