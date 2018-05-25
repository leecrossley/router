/* @flow */

import React from "react";

import Icon from "./Icon";

export class Tabs extends React.Component {
    static defaultProps: {};

    props: {
        children?: Array<Class<Tab>>;
    };

    componentDidMount() {
        if (this.props.children && this.props.children.length > 0) {
            window.f7app.showTab(`#${this.props.children[0].props.id}`);
        }
    }

    tabIcon(tab: Class<Tab>): ?React.Element {
        if (tab.props.icon) {
            return (
                <Icon name={tab.props.icon}></Icon>
            );
        }
    }

    tabLink(tab: Class<Tab>): React.Element {
        return (<a key={tab.props.id}
            onClick={this.tabPanelClick.bind(this, tab)}
            href={`#${tab.props.id}`}
            className="tab-link">

            {this.tabIcon(tab)}
            {tab.props.name}
        </a>);
    }

    tabPanelClick(tab: Class<Tab>, e: Object) {
        e.preventDefault();
        window.f7app.showTab(`#${tab.props.id}`);
    }

    render(): React.Element {
        let tabs = this.props.children || [];
        return (
            <div className="tab-wrapper">
                <div className="toolbar tabbar">
                    <div className="toolbar-inner">
                        {tabs.map(this.tabLink.bind(this))}
                    </div>
                </div>
                <div className="tabs-wrap tabs-animated-wrap">
                    <div className="tabs">
                        {tabs}
                    </div>
                </div>
            </div>
        );
    }
}

export class Tab extends React.Component {
    static defaultProps: {};

    static props: {
        id: string;
        name?: string;
        className?: string;
        icon?: string;
        children?: any;
    };

    render(): React.Element {
        let classes = this.props.className || "";
        return (
            <div id={this.props.id} className={`tab page-content ${classes}`}>
                {this.props.children}
            </div>
        );
    }
}
