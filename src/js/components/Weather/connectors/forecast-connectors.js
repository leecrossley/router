/*
* Turns the server response into something useful.
* This version of this function is for the DarkSky Weather api
* https://darksky.net/dev/docs/forecast
*/

// pads numbers to 2 digits, as per 23 hour clock
const formatHour = n => ("0" + n).slice(-2);
// string to upper case, with - replaced with _
const formatIcon = str => str.toUpperCase().replace(/\-/g, "_");

// "factory" for forecast object
export const forecast = (temp, icon, hour) => ({
    temp: Math.floor(temp),
    icon: formatIcon(icon),
    time: formatHour(hour)
});
// "factory" for current forecast object
export const stringForecast = (temp, icon, time = "Now") => ({
    temp: Math.floor(temp),
    icon: formatIcon(icon),
    time: time
});

// returns a day string for the given timecode
const getDayFromTimecode = timecode => [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
][new Date(timecode * 1000 + 60 * 60 * 1000).getDay()] // BST hack

// gets the hour from a darksky timecode (their times exclude miliseconds so multiplying by a factor of 1000 required)
const getHourFromTimecode = timecode => (new Date(timecode * 1000)).getHours();

// turns hourly forecast array into an array of forecast objects at the correct intervals,
// with the first forecast being used for the current interval
const get3HourIntervals = (data, currentHour, intervals) => data.reduce((out, interval) => {
    if (out.intervals.length < 8){
        const hour = getHourFromTimecode(interval.time);
        out.intervals = [
            ...out.intervals,
            forecast(interval.temperature, interval.icon, hour)
        ];
    }
    return out;
}, { count: 0, intervals }).intervals;

// gets the weekly forecast with some fancy tweaking to day names
// for first couple
const getDailyIntervals = data => data.reduce((out, interval) => {

    console.log(interval);

    let day = "";
    if (out.count === 0){
        day = "Today"
    } else if (out.count === 1){
        day = "Tomorrow"
    } else {
        day = getDayFromTimecode(interval.time);
    }

    if (out.count < 7){
        out.intervals = [
            ...out.intervals,
            stringForecast(interval.temperatureMax, interval.icon, day)
        ]
        out.count ++;
    }
    return out;
}, { count: 0, intervals:[] }).intervals;

// the actual connector for mapping server response data to react components
export const hourlyForecastConnector = (res) => {
    const forecasts = {
        intervals: []
    };

    if (res){
        res.hourly.data = res.hourly.data.filter((v, i) => {
            return i !== 0 && i % 3 === 0;
        });
        forecasts.intervals = get3HourIntervals(
            res.hourly.data,
            getHourFromTimecode(res.currently.time),
            [stringForecast(res.currently.temperature,res.currently.icon)]
        );
    }

    return forecasts;
};

// the actual connector for mapping server response data to react components
export const dailyForecastConnector = (res) => {
    const forecasts = {
        intervals: []
    };

    if (res){
        forecasts.intervals = getDailyIntervals(
            res.daily.data
        );
    }

    return forecasts;
};
