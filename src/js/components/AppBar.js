/* @flow */

import React from "react";

import Bar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

import MoreIcon from "material-ui/svg-icons/navigation/more-vert";

class AppBar extends React.Component {
    static defaultProps: {};

    static props: {
        title: string;
        menu?: boolean;
        noShadow?: boolean;
        icon?: React.Element;
    };

    feedback(): void {
        window.setTimeout(window.StatusBar.styleDefault, 400);
        window.hockeyapp.feedback();
    }

    getMoreMenu(): React.Element {
        const styles = {
            horizontal: "right",
            vertical: "top"
        };
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton>
                        <MoreIcon />
                    </IconButton>
                }
                targetOrigin={styles}
                anchorOrigin={styles}>
                <MenuItem primaryText="Diagnostics" />
                <MenuItem primaryText="Preferences" />
                <MenuItem primaryText="Beta Feedback" onTouchTap={this.feedback.bind(this)} />
            </IconMenu>
        );
    }

    render(): React.Element {
        return (
            <Bar
                onTitleTouchTap={window.StatusBar.styleLightContent}
                className="appbar"
                iconElementRight={this.props.menu ? this.getMoreMenu() : null}
                iconElementLeft={this.props.icon}
                zDepth={this.props.noShadow ? 0 : 1}
                showMenuIconButton={this.props.icon ? true : false}
                title={this.props.title}
            />
        );
    }
}

export default AppBar;
