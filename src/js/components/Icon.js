/* @flow */

import React from "react";

class Icon extends React.Component {
    static defaultProps: {};

    static props: {
        name: string;
    };

    render(): React.Element {
        return (
            <i className={"icon icon-" + this.props.name}></i>
        );
    }
}

export default Icon;
