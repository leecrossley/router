/* @flow */

import React from "react";

import ReactInterval from "react-interval";

const months = ["Jan", "Feb", "Mar", "Apr", "May",
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class DateTime extends React.Component {

    componentWillMount() {
        this.tick();
    }

    tick() {
        // Remove this BST hack
        const now = new Date(new Date().getTime() + 60 * 60 * 1000);

        const month = now.getMonth();
        const date = now.getDate();
        const day = now.getDay();

        let hour = now.getHours();
        let minutes = now.getMinutes();

        const amPM = hour < 12 ? "AM" : "PM";

        if (hour === 0) {
            hour = 12;
        } else if (hour > 12) {
            hour -= 12;
        }

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        this.setState({
            hour: hour,
            minutes: minutes,
            amPM: amPM,
            day: days[day],
            monDate: `${months[month]} ${date}`
        });
    }

    render(): React.Element {
        return (
            <div className="datetime">
                <ReactInterval
                    timeout={5000}
                    enabled={true}
                    callback={this.tick.bind(this)}
                />
                <div className="time">
                    {`${this.state.hour}:${this.state.minutes}`}
                    <span>{this.state.amPM}</span>
                </div>
                <div className="date">
                    <span className="day">{this.state.day}</span>
                    <span className="monDate">{this.state.monDate}</span>
                </div>
            </div>
        );
    }
}

export default DateTime;
