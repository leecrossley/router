import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { forecastReducer } from "./reducers/forecast-reducer";
import { geocodeReducer } from "./reducers/geocode-reducer";
import WeatherWidgetWithGeocoding from "./components/WeatherWidgetWithGeocoding";
import * as actions from "./actions/forecast-actions";

const store = createStore(
    combineReducers({
        forecast: forecastReducer,
        geocode: geocodeReducer
    }),
    { forecast: {}, geocode: {} },
    compose(applyMiddleware(thunk))
);

const automaticUpdater = () => {
    // this system is completely independent of React, triggering a
    // redux action against the store
    const minute = (new Date()).getMinutes();

    if (minute == 0 || minute == 15 || minute == 30 || minute == 45) {
        store.dispatch(actions.forecastRefreshRequired());
    }

    setTimeout(automaticUpdater, 1000 * 60);
};

setTimeout(automaticUpdater, 1000 * 60);

const Weather = React.createClass({
    displayName: "Weather",
    propTypes: {
        city: React.PropTypes.string
    },
    render (){
        const { city } = this.props;
        return <Provider store={store}>
        <WeatherWidgetWithGeocoding city={city} />
        </Provider>;
    }
});

export default Weather;
