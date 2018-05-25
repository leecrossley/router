import React from 'react';
import { G } from './primatives';
import { DirectConnectionIcon, WiFiConnectionIcon } from './icons';
import ConnectedCount from './ConnectedCount';
import { WiredConnectionLine, GuestWiFiConnectionLine, MainWiFiConnectionLine } from './connection-lines';

export const DirectConnection = React.createClass({
    propTypes: {
        clients: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            clients: 0
        };
    },
    render() {
        const { clients } = this.props;
        return <g>
          <WiredConnectionLine on={(clients > 0)}/>
          <G x={11.625} y={77.708}>
              <circle className="shadowicon" cx="8.38" cy="8.38" r="8.38" />
              <DirectConnectionIcon on={(clients > 0)} />
              <text x="8.38" y="23" fontSize="3.5" textAnchor="middle">Direct Cable</text>
              {
                  (clients > 0) && <ConnectedCount count={clients} />
              }
          </G>
        </g>
    }
});

export const MainWiFiConnection = React.createClass({
    propTypes: {
        clients: React.PropTypes.number,
        up: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            clients: 0,
            up: false
        };
    },
    render() {
        const { clients, up } = this.props;
        return <g>
          <MainWiFiConnectionLine on={up}/>
          <G x={41.625} y={77.708}>
              <circle className="shadowicon" cx="8.38" cy="8.38" r="8.38" />
              <WiFiConnectionIcon on={up} />
              <text x="8.38" y="23" fontSize="3.5" textAnchor="middle">Main WiFi</text>
              {
                  (clients > 0) && <ConnectedCount count={clients} />
              }
          </G>
        </g>
    }
});

export const GuestWiFiConnection = React.createClass({
    propTypes: {
        clients: React.PropTypes.number,
        up: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            clients: 0,
            up: false
        };
    },
    render() {
        const { clients, up } = this.props;
        return <g>
          <GuestWiFiConnectionLine on={up}/>
          <G x={71.625} y={77.708}>
              <circle className="shadowicon" cx="8.38" cy="8.38" r="8.38" />
              <WiFiConnectionIcon on={up} />
              <text x="8.38" y="23" fontSize="3.5" textAnchor="middle">Guest WiFi</text>
              {
                  (clients > 0) && <ConnectedCount count={clients} />
              }
          </G>
        </g>
    }
});

/*

<g transform="translate(13.687, -0.15)">
    <circle cx="3.09" cy="3.09" r="3.09" class="shadowicon" />
    <text text-anchor="middle" class="indicator" font-size="4" x="3.09" y="4.3">1</text>
</g>

*/
