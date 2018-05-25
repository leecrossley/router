import React from "react";
import { Label, Sub } from "./primatives";

export const CostLabel = (props): string =>
    <Label size={8} weight={700}>
        £ {Number(props.children).toFixed(2)}
    </Label>;
export const KWhLabel = (props): string =>
    <Label size={4.5} offset={8}>
        {Number(props.children).toFixed(1)} kWh
    </Label>
export const CO2Label = (props): string =>
    <Label size={4.5} offset={14}>
        {Number(props.children).toFixed(1)} Kg CO<Sub>2</Sub>
    </Label>;
