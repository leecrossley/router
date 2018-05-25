import React from 'react';
import { G } from './primatives';
import { mainWiFiData, guestWiFiData } from './data';
import { Cross } from './icons';

export const WiredConnectionLine = React.createClass({
    propTypes: {
        on: React.PropTypes.bool
    },
    getDefaultProps(){
        return {
            on: false
        }
    },
    render() {
        const { on } = this.props;
        const className = this.props.on ? 'on' : 'disabled';

        return <G x={18.831} y={52.02}>
            <circle cx="23.29" cy="1.29" r="1.17" className={className} />
            <circle cx="1.29" cy="23.74" r="1.17" className={className} />
            <line className={`outline ${className}`} x1="23.169" y1="1.19" x2="1.169" y2="23.844"/>
        </G>;
    }
});

export const WiFiConnectionLine = React.createClass({
    propTypes: {
        on: React.PropTypes.bool,
        geometry: React.PropTypes.object
    },
    getDefaultProps(){
        return {
            on: false,
            geometry: mainWiFiData
        }
    },
    render() {
        const { on } = this.props;
        const { transform, start, end, crossTransform, line } = this.props.geometry;
        const className = on ? 'on' : 'off';

        return <G {...transform}>
            <circle r="1.17" className={`outline ${className}`} {...start} />
            {
                on && <circle r="1.17" className={`outline ${className}`} {...end} />
            }
            {
                !on && <Cross {...crossTransform} />
            }
            <line className={`outline ${className} liner`} {...line} />
        </G>
    }
});


export const MainWiFiConnectionLine = props => <WiFiConnectionLine geometry={mainWiFiData} {...props} />;
export const GuestWiFiConnectionLine = props => <WiFiConnectionLine geometry={guestWiFiData} {...props} />;
