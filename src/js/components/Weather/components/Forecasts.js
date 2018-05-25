import React from "react";
import Forecast from "./Forecast";

const Forecasts = React.createClass({
    displayName: "Forecasts",
    propTypes: {
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
        intervals: React.PropTypes.array
    },
    componentWillMount(){
        const { loaded, loading, error, loadForecast, lat, lng } = this.props;

        if (!loaded && !loading && !error) {
            loadForecast(lat, lng);
        }
    },
    componentWillReceiveProps(nextProps){
        const { loaded, loading, error, loadForecast, lat, lng } = nextProps;

        if (!loaded && !loading && !error) {
            loadForecast(lat, lng);
        }
    },
    render(){
        const { loaded, error, loading } = this.props;
        const { intervals } = this.props;
        return <div className="forecasts">
        {
            loaded &&  <ul>
            {
                intervals.map((forecast, index) => <li key={index}>
                <Forecast {...forecast} />
                </li>)
            }
            </ul>
        }
        {
            error && <div>Weather data unavailable</div>
        }
        {
            loading && <div>Checking the skies...</div>
        }
        </div>;
    }

});

export default Forecasts;
