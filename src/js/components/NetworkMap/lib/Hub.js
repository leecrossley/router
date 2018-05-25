import React from 'react';
import { G } from './primatives';
import { WarningIcon, HubIcon } from './icons';

const Hub = React.createClass({
    propTypes: {
        fault: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            fault: false
        }
    },
    render() {
        const { fault } = this.props;
        const className = fault ? 'disabled' : 'on';

        return <G x={41.425} y={36.5}>
            <HubIcon up={!fault} />
            {
                fault && <WarningIcon />
            }
        </G>;
    }

});

const HubWrapper = (props) => {
    let fault = false;
    if (!props || !props.dslUp || !props.wifiUp || !props.guestUp) {
        fault = true;
    }
    return <Hub fault={fault} />
}

export default HubWrapper;
