/* @flow */

import React from "react";

class Card extends React.Component {
    static defaultProps: {};

    static props: {
        children?: string;
        className?: string;
    };

    render(): React.Element {
        return (
            <div className={"card " + this.props.className}>
                <div className="card-content">
                    <div className="card-content-inner">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Card;
