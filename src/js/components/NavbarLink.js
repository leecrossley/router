/* @flow */

import React from "react";
import { Link } from "react-router";

import Icon from "./Icon";

class NavbarLink extends React.Component {
    static defaultProps: {};

    static props: {
        to: string;
        icon?: string;
        onClick?: Function;
    };

    render(): React.Element {
        let {icon, ...other} = this.props;
        return (
            <Link className="link icon-only" {...other}>
                <Icon name={icon}></Icon>
            </Link>
        );
    }
}

export default NavbarLink;
