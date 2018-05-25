import React from "react";
import { Pixel, Diamond, Circle } from "./primatives";

export const IndicatorPixel = (props) => <Pixel {...props} />;
export const IndicatorArrow = (props) => <Diamond {...props} />;
export const BackgroundIndicator = (): string => <Circle
    className="indicator background"
    value={1}
/>
export const TargetIndicator = (): string => <Circle
    className="indicator target"
    strokeWidth={7}
    value={0.80}
/>
export const CurrentIndicator = (props: {value: number}): string => <Circle
    className="indicator current"
    strokeWidth={7}
    value={props.value}
/>
export const InnerIndicator = (): string => <Circle
    className="indicator inner"
    r="19"
    stroke="none"
/>;
