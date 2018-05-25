/* @flow */

import React from "react";
import fjs from "functional.js";

import Menu from "../components/Menu";

const menuItems = fjs.select((i) => {
    return i.menuItem;
});

class MenuLayout extends React.Component {

    hideMenu(): boolean {
        return this.props.routes[this.props.routes.length - 1].hideMenu;
    }

    render(): React.Element {
        let className = this.hideMenu() ? "hide-menu" : "";
        return (
            <div className={className}>
                <Menu items={menuItems(this.props.routes[0].childRoutes)}></Menu>
                <div className="views">
                    <div className="view view-main">
                        <div className="pages">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default MenuLayout;
