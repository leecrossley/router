/* @flow */

import React from "react";
import { Link } from "react-router";

import Icon from "./Icon";

export class ListItem extends React.Component {
    static defaultProps: {};

    static props: {
        children?: any;
        title: string;
        className?: string;
        subtitle?: string;
        metric?: number;
        qualifier?: string;
        rssi?: any;
        to?: string;
        icon?: string;
        image?: string;
        imageFallback?: string;
    };

    renderIcon(): ?React.Element {
        if (this.props.icon) {
            return (
                <div className="item-media">
                    <Icon name={this.props.icon} />
                </div>
            );
        } else if (this.props.image) {
            return (
                <div className="item-media">
                    <img src={this.props.image} />
                </div>
            );
        } else if (this.props.imageFallback) {
            return (
                <div className="item-media image-fallback">
                    {this.props.imageFallback}
                </div>
            );
        } else if (typeof this.props.rssi === "number") {
            return this.renderSignal(this.props.rssi);
        }
    }

    renderSignal(rssi: number): ?React.Element {
        let level = "good four-bars";

        if (rssi < -80) {
            level = "bad one-bar";
        } else if (rssi < -60) {
            level = "ok two-bars";
        } else if (rssi < -40) {
            level = "good three-bars";
        }

        return (
            <div className="item-media rssi image-fallback">
                <div className={`signal-bars ${level}`}>
                    <div className="first-bar"></div>
                    <div className="second-bar"></div>
                    <div className="third-bar"></div>
                    <div className="fourth-bar"></div>
                </div>
            </div>
        );
    };

    renderMedia(): ?React.Element {
        if (!this.props.qualifier) {
            return;
        }
        return (
            <div className="item-media">
                <div className="info">
                    <span className="info-metric">{this.props.metric}</span>
                    <span className="info-qualifier">{this.props.qualifier}</span>
                </div>
            </div>
        );
    }

    renderInner(): ReactElement {
        return (
            <div className="item-inner">
                <div className="item-title">
                    {this.props.title}<br/>
                    <span className="item-subtitle">{this.props.subtitle}</span>
                </div>
                <div className="item-after">
                    {this.props.children}
                </div>
            </div>
        );
    }

    renderLink(): ReactElement {
        return (
            <Link to={this.props.to}
                onClick={this.props.onClick}
                className={`item-content item-link ${this.props.className}`}
                activeClassName="active">
                {this.renderIcon()}
                {this.renderMedia()}
                {this.renderInner()}
            </Link>
        );
    }

    renderItem(): ReactElement {
        return (
            <div className="item-content"
                onClick={this.props.onClick}>
                {this.renderIcon()}
                {this.renderMedia()}
                {this.renderInner()}
            </div>
        );
    }

    render(): React.Element {
        return (
            <li>
                {this.props.to ? this.renderLink() : this.renderItem()}
            </li>
        );
    }

}

export class ListView extends React.Component {
    static defaultProps: {};

    static props: {
        children?: any;
        group?: boolean;
        className?: string;
        labelAfter?: string;
    };

    renderLabelAfter(): ?React.Element {
        if (!this.props.labelAfter) {
            return;
        }
        return (
            <div className="list-block-label">
                {this.props.labelAfter}
            </div>
        );
    }

    render(): React.Element {
        let classes = this.props.className || "";
        if (this.props.group) {
            return (
                <div className={`list-block tablet-inset ${classes}`}>
                    <div className="list-group">
                        <ul>{this.props.children}</ul>
                        {this.renderLabelAfter()}
                    </div>
                </div>
            );
        }
        return (
            <div className={`list-block tablet-inset ${classes}`}>
                <ul>{this.props.children}</ul>
                {this.renderLabelAfter()}
            </div>
        );
    }

}
