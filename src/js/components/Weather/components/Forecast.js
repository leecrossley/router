import React from "react";
import SvgIcon from "material-ui/SvgIcon";

import ClearDay from "./climacons/clear_day";
import ClearNight from "./climacons/clear_night";
import Cloudy from "./climacons/cloudy";
import Fog from "./climacons/fog";
import PartlyCloudyDay from "./climacons/partly_cloudy_day";
import PartlyCloudyNight from "./climacons/partly_cloudy_night";
import Rain from "./climacons/rain";
import Sleet from "./climacons/sleet";
import Snow from "./climacons/snow";
import Wind from "./climacons/wind";

import { grey500 } from "material-ui/styles/colors";

const mapping = {
    "CLEAR_DAY" : ClearDay,
    "CLEAR_NIGHT" : ClearNight,
    "CLOUDY" : Cloudy,
    "FOG" : Fog,
    "PARTLY_CLOUDY_DAY" : PartlyCloudyDay,
    "PARTLY_CLOUDY_NIGHT" : PartlyCloudyNight,
    "RAIN" : Rain,
    "SLEET" : Sleet,
    "SNOW" : Snow,
    "WIND" : Wind
};

const Forecast = React.createClass({
    propTypes: {
        icon: React.PropTypes.string,
        time: React.PropTypes.string,
        temp: React.PropTypes.number
    },
    render() {
        const { icon, time, temp } = this.props;
        const Icon = (icon && mapping[icon]) || Cloudy;

        return <SvgIcon viewBox="0 0 100 130" style={{width: "100%", height: "auto"}}>
        <text x={50} y={16} fontSize={17} textAnchor="middle">{time}</text>
        <g transform="translate(0,9)" fill={grey500}>
        <Icon />
        </g>
        <text x={50} y={117} textAnchor="middle" fontSize={20}>{temp}<tspan baselineShift="super" style={{fontSize: "0.5em"}}>℃</tspan></text>
        </SvgIcon>;
    }
});


export default Forecast;
