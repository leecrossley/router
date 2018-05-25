/* @flow */

import React from "react";

import Icon from "./Icon";
import NavbarLink from "./NavbarLink";

class Navbar extends React.Component {
    static defaultProps: {};

    // TODO: generic items
    static props: {
        title: string;
        icon?: string;
        back?: boolean;
        menu?: boolean;
    };

    backLink(): ?React.Element {
        if (this.props.back) {
            return (
                <NavbarLink icon={"back"} onClick={this.goBack} to="#"></NavbarLink>
            );
        }
    }

    goBack(e: Object): void {
        e.preventDefault();
        window.history.back();
    }

    menuLink(): ?React.Element {
        if (this.props.menu) {
            let openMenu = (e: Object): void => {
                e.preventDefault();
                if (window.Dom7("body").width() <= 768) {
                    window.f7app.openPanel("left");
                }
            };
            return (
                <NavbarLink icon={"bars"} onClick={openMenu} to="#"></NavbarLink>
            );
        }
    }

    staticIcon(): ?React.Element {
        if (this.props.icon) {
            return (
                <a className="link icon-only">
                    <Icon name={this.props.icon}></Icon>
                </a>
            );
        }
    }

    left(): React.Element {
        return (
            <div className="left">
                {this.staticIcon()}
                {this.backLink()}
                {this.menuLink()}
            </div>
        );
    }

    render(): React.Element {
        return (
            <div className="navbar">
                <div className="navbar-inner">
                    {this.left()}
                    <div className="center">{this.props.title}</div>
                </div>
            </div>
        );
    }
}

export default Navbar;
