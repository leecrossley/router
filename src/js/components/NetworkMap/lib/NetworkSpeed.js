import React from 'react';
import { G } from './primatives';

const NetworkSpeed = React.createClass({
    propTypes: {
        upload: React.PropTypes.number,
        download: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            upload: 0,
            download: 0
        };
    },
    render() {
        const { upload, download } = this.props;
        return <G x={75.582} y={0}>
            <text y="6.31" fontSize="3.4">Upload</text>
            <text y="11.94" className="darkest" fontSize="4.7">{upload.toFixed(2)} <tspan fontSize="3.4">Mb/s</tspan></text>
            <text y="19.38" fontSize="3.4">Download</text>
            <text y="25.06" className="darkest" fontSize="4.7">{download.toFixed(2)} <tspan fontSize="3.4">Mb/s</tspan></text>
        </G>
    }
});

export default NetworkSpeed;
