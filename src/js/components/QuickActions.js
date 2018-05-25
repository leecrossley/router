/* @flow */

import React from "react";

import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import FloatingActionButton from "material-ui/FloatingActionButton";
import AddIcon from "material-ui/svg-icons/content/add";
import SvgIcon from "material-ui/SvgIcon";

const ShareIcon = (props) => (
    <SvgIcon viewBox="0 0 84 84" {...props}>
        <path d=" M 15.01 36.00 C 21.99 28.99 29.01 22.01 35.99 15.01 C 36.01 19.00 35.99 22.99 36.01 26.98 C 43.52 28.16 51.03 30.99 56.55 36.37 C 63.30 42.49 67.15 51.17 68.97 59.97 C 61.76 49.24 48.58 44.34 36.01 44.70 C 35.99 48.79 36.01 52.89 35.99 56.98 C 29.00 49.99 22.00 43.00 15.01 36.00 Z" />
    </SvgIcon>
);

const GuestIcon = (props) => (
    <SvgIcon viewBox="0 0 84 84" {...props}>
        <path d=" M 34.47 15.67 C 50.28 12.89 67.21 19.27 77.50 31.51 C 79.11 33.64 76.54 36.73 74.10 35.88 C 72.69 35.02 71.56 33.80 70.37 32.67 C 62.66 25.11 51.85 20.74 41.03 21.04 C 30.64 21.27 20.46 25.76 13.16 33.13 C 11.71 34.37 10.32 36.50 8.11 35.89 C 6.09 35.22 5.27 32.44 6.91 30.95 C 14.04 22.98 23.89 17.41 34.47 15.67 Z" />
        <path d=" M 38.25 33.24 C 48.26 32.03 58.90 35.85 65.54 43.50 C 67.51 46.30 63.04 49.71 60.89 47.01 C 55.84 42.16 49.12 38.90 42.01 39.02 C 34.90 38.89 28.16 42.16 23.10 47.02 C 20.94 49.73 16.45 46.24 18.49 43.48 C 23.43 37.72 30.77 34.18 38.25 33.24 Z" />
        <path d=" M 40.26 51.28 C 44.82 49.61 49.73 55.07 47.45 59.41 C 45.91 63.10 40.52 64.29 37.82 61.18 C 34.48 58.28 36.14 52.45 40.26 51.28 Z" />
    </SvgIcon>
);

const SpeedIcon = (props) => (
    <SvgIcon viewBox="0 0 84 84" {...props}>
        <path d=" M 35.46 12.62 C 51.29 9.41 68.43 18.43 74.81 33.25 C 80.74 46.04 78.15 62.22 68.36 72.38 C 65.87 74.58 62.03 70.83 64.19 68.28 C 69.85 61.59 73.07 52.65 71.70 43.86 C 69.95 29.52 56.52 17.71 42.04 18.02 C 27.54 17.67 14.06 29.48 12.31 43.84 C 10.98 52.37 13.84 61.17 19.42 67.68 C 22.19 70.14 18.49 74.79 15.59 72.37 C 8.09 64.40 4.64 52.86 6.52 42.08 C 8.74 27.47 20.90 15.12 35.46 12.62 Z" />
        <path d=" M 57.37 31.42 C 59.76 30.39 60.65 33.80 59.20 35.29 C 55.02 41.98 50.29 48.34 45.48 54.59 C 43.24 57.11 40.25 54.05 38.69 52.22 C 37.16 50.18 39.58 48.31 40.88 46.96 C 46.43 41.85 51.37 35.99 57.37 31.42 Z" />
    </SvgIcon>
);

class QuickActions extends React.Component {

    state: Object = {
        edit: false
    };

    render(): React.Element {
        const base = {
            height: 101,
            width: 101,
            borderRadius: 10,
            display: "inline-block"
        };

        const first = Object.assign({
            marginLeft: "1.5rem"
        }, base);

        const other = Object.assign({
            marginLeft: "0.75rem"
        }, base);

        const iconStyle = {
            height: "30px",
            width: "30px",
            marginTop: "4px",
            marginLeft: "8px"
        };

        const activeStyle = {
            height: "30px",
            width: "30px",
            marginTop: "4px",
            marginLeft: "8px",
            color: "#99AA00"
        };

        return (
            <div className="quick-actions">
                <div className="quick-actions-label">Quick Actions</div>
                <div className="quick-actions-edit">EDIT</div>
                <Paper className="quick-actions-action" style={first} zDepth={1}>
                    <ShareIcon style={iconStyle} />
                    <Divider />
                    <div className="quick-actions-name">
                        Share
                    </div>
                    <div className="quick-actions-section">
                        Guest Wifi
                    </div>
                </Paper>
                <Paper className="quick-actions-action" style={other} zDepth={1}>
                    <GuestIcon style={activeStyle} />
                    <Divider />
                    <div className="quick-actions-name">
                        Turn Off
                    </div>
                    <div className="quick-actions-section">
                        Guest Wifi
                    </div>
                </Paper>
                <Paper className="quick-actions-action" style={other} zDepth={1}>
                    <SpeedIcon style={iconStyle} />
                    <Divider />
                    <div className="quick-actions-name">
                        Start
                    </div>
                    <div className="quick-actions-section">
                        Speed Test
                    </div>
                </Paper>
                <FloatingActionButton className="quick-actions-add" zDepth={3}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

export default QuickActions;
