/* @flow */

import React from "react";

class Switch extends React.Component {
    static defaultProps: {};

    static props: {
        enabled: boolean;
    };

    preventDefault(e: Object): void {
        // handle this in parent
        e.preventDefault();
    }

    render(): React.Element {
        return (
            <label className="label-switch" onClick={this.preventDefault}>
                <input type="checkbox"
                    onChange={this.preventDefault}
                    checked={this.props.enabled}/>
                <div className="checkbox"></div>
            </label>
        );
    }

}

export default Switch;
