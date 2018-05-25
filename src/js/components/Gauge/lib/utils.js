import { degrees, radians, offset } from "../config";

export const getDegrees = (percent: number): number =>
    (degrees * 2) * percent - degrees;
export const getRadians = (percent: number): number =>
    (radians * 2) * percent - radians;
export const getOffset = (percent: number): number =>
    offset * (1 - percent);
