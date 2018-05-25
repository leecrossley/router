import React from 'react';

export const G = props => <g transform={`translate(${props.x}, ${props.y})`}>{ props.children }</g>;
