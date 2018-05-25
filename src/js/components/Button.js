/* @flow */

import React from "react";
import { Link } from "react-router";

class Button extends React.Component {
    static defaultProps: {};

    static props: {
        children?: string;
        className?: string;
        to?: string;
        onClick?: Function;
    };

    routeLink(): React.Element {
        let {children, ...other} = this.props;
        return (
            <Link {...other}>{children}</Link>
        );
    }

    actionLink(): React.Element {
        let {children, ...other} = this.props;
        return (
            <a {...other}>{children}</a>
        );
    }

    render(): React.Element {
        // TODO: must be able to default this properly with defaultProps
        return this.props.to ? this.routeLink() : this.actionLink();
    }
}

export default Button;
