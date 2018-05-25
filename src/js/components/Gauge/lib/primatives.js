import React from "react";
import { getOffset, getDegrees, getRadians } from "./utils";
import { cx, cy, r, offset } from "../config";

export const Circle = (props: {value: number}): string => <circle
    strokeLinecap="round"
    cx={cx}
    cy={cy}
    r={r}
    stroke="black"
    fill="none"
    strokeDasharray={`${offset}, ${offset + 100}`}
    strokeDashoffset={getOffset(props.value)}
    strokeWidth="12"
    style={{
        transformOrigin: "50% 50%",
        transform: "rotate(120deg)"
    }}
    {...props}
/>;

export const Pixel = (props: {value: number}): string => {
    const radians = getRadians(props.value);
    return <Circle
        cx={cx + Math.sin(radians) * r}
        cy={cy - Math.cos(radians) * r}
        r="1"
        className="pixel"
        stroke="none"
        style={{
            transformOrigin: "0% 0%"
        }}
    />
};

export const Diamond = (props: {value: number}): string => {
    const rotation = `rotate(${getDegrees(props.value)}deg)`;
    return <polygon
        points={`${cx},${cy} ${cx - 10},${cy - 13} ${cx},${cy - 28} ${cx + 10},${cy - 13}`}
        className="diamond"
        style={{
            transformOrigin: "bottom",
            transform: rotation
        }}
    />
};

export const Label = React.createClass({
    propTypes: {
        size: React.PropTypes.number,
        offset: React.PropTypes.number,
        weight: React.PropTypes.number
    },
    getDefaultProps (): {size: number, offset: number, weight: number} {
        return {
            size: 8,
            offset: 0,
            weight: 400
        }
    },
    render (): string {
        const { size, offset, weight } = this.props;
        return <text
            x={cx}
            y={(cy - 3) + (offset || 0)}
            textAnchor="middle"
            fill="white"
            style={{
                fontSize: size,
                fontWeight: weight
            }}
        >
            {this.props.children}
        </text>
    }
});

export const Sub = (props: {children: string}): string => <tspan dy={0.8} style={{fontSize: 2}}>{ props.children }</tspan>;
