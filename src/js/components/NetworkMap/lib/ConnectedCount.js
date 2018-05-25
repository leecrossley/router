import React from 'react';
import { G } from './primatives';

const ConnectedCount = (props) => <G x={13.687} y={-0.15}>
    <circle cx="3.09" cy="3.09" r="3.09" className="shadowicon" />
    <text textAnchor="middle" className="indicator" fontSize="4" x="3.09" y="4.3">{props.count}</text>
</G>

export default ConnectedCount;
