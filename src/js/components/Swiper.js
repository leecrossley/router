/* @flow */

import React from "react";

import Icon from "./Icon";

export class Swiper extends React.Component {
    static defaultProps: {};

    props: {
        id: string;
        className?: string;
        children?: Array<Class<Slide>>;
    };

    componentDidMount(): void {
        setTimeout(this.initSwiper.bind(this));
    }

    initSwiper(): void {
        window.f7app.swiper(`#${this.props.id}`, {
            pagination: ".swiper-pagination",
            slidesPerView: (window.Dom7("body").width() >= 758) ? 2 : 1
        });
    }

    render(): React.Element {
        let classes = this.props.className || "";
        return (
            <div id={this.props.id} className={`swiper-container ${classes}`}>
                <div className="swiper-wrapper">
                    {this.props.children}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        );
    }
}

export class Slide extends React.Component {
    static defaultProps: {};

    props: {
        children?: any;
    };

    render(): React.Element {
        return (
            <div className="swiper-slide">
                {this.props.children}
            </div>
        );
    }
}
