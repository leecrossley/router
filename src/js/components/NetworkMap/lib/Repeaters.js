import React from 'react';
import { G } from './primatives';

const Repeaters = (props) => <g>
    <G x={16.042} y={39.333}>
    <circle cx="3.9" cy="3.9" r="3.2" className="bubble"/>
    <circle cx="3.9" cy="3.9" r="3.2" className="bubble-2"/>
      <circle cx="3.9" cy="3.9" r="3.9" className="shadowicon"/>
      <text textAnchor="middle" className="indicator" fontSize="4" x="3.9" y="5.2">{props.clients}</text>
    </G>
    <G x={12.406} y={52.51}>
      <text fontSize="3.8" x="0" y="0">Repeaters</text>
    </G>
</g>;

export default Repeaters;
