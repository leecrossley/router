import React from 'react';
import { G } from './primatives';

const DSLConnection = React.createClass({
    propTypes: {
        dslUp: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            dslUp: false
        }
    },
    render() {
        const { dslUp } = this.props;
        const className = dslUp ? 'on' : 'off';
        return <g>
            <G x={46.839} y={14.393}>
                <path className={className} d="M3.36,1.49,2,.08a.29.29,0,0,0-.4,0L.09,1.39c-.27.24.13.64.4.4,1.4-1.26,1-1.92,1,.24V19.9a.28.28,0,0,0,.56,0V.28a.28.28,0,0,0-.48-.2L.09,1.39c-.27.24.13.64.4.4C1.91.51,1.6.53,3,1.88a.28.28,0,0,0,.4-.4Z" />
                <path className={className} d="M3.48,18.7,4.89,20.1a.29.29,0,0,0,.4,0l1.46-1.31c.27-.24-.13-.64-.4-.4-1.4,1.26-1,1.92-1-.24V.28a.28.28,0,0,0-.56,0V19.9a.28.28,0,0,0,.48.2l1.46-1.31c.27-.24-.13-.64-.4-.4-1.42,1.28-1.12,1.26-2.47-.09a.28.28,0,0,0-.4.4Z" />
            </G>
            <G x={41.705} y={18.875}>
                <rect width="16.78" height="8.87" rx="4.44" ry="4.44" className="shadowicon"/>
                <text textAnchor="middle" className={className} fontSize="4" x="8.39" y="5.7">DSL</text>
            </G>
        </g>
    }
});

export default DSLConnection;
