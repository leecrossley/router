import React from "react";
import Thermometer from "./Thermometer";
import ClockIcon from "material-ui/svg-icons/action/schedule";
import { grey500 } from "material-ui/styles/colors";

const Key = () => <div className="key">
    <ClockIcon color={grey500} />
    <Thermometer />
</div>;

export default Key;
