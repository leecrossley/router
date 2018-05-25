
import React from 'react';
import Defs from './lib/Defs';
import { GlobeIcon } from './lib/icons';
import { G } from './lib/primatives';
import NetworkSpeed from './lib/NetworkSpeed';
import DSLConnection from './lib/DSLConnection';
import { DirectConnection, MainWiFiConnection, GuestWiFiConnection } from './lib/client-connections';
import Hub from './lib/Hub';
import Repeaters from './lib/Repeaters';

const NetworkMap = React.createClass({
    propTypes: {
        upload: React.PropTypes.number,
        download: React.PropTypes.number,
        wifiUp: React.PropTypes.bool,
        guestUp: React.PropTypes.bool,
        dslUp: React.PropTypes.bool,
        wifi: React.PropTypes.number,
        guest: React.PropTypes.number,
        direct: React.PropTypes.number,
        repeaters: React.PropTypes.number,
    },
    getDefaultProps() {
        return {
            wifiUp: false,
            guestUp: false,
            dslUp: false,
            wifi: 0,
            direct: 0,
            guest: 0,
            repeaters: 0,
            upload: -1,
            download: -1
        }
    },
    render() {
        const { upload, download } = this.props;
        const { wifiUp, guestUp, dslUp } = this.props;
        const { direct, wifi, guest, repeaters } = this.props;

        return <svg className="NetworkMap" viewBox="0 0 100 106.04">
            <Defs />
            <DirectConnection clients={direct} />
            <MainWiFiConnection clients={wifi} up={wifiUp} />
            <GuestWiFiConnection clients={guest} up={guestUp} />
            {
                repeaters > 0 && <Repeaters clients={repeaters} />
            }
        </svg>
    }
});

export default NetworkMap;
