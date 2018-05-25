/* @flow */

import React from "react";

import FloatingActionButton from "material-ui/FloatingActionButton";

import PhoneIcon from "material-ui/svg-icons/hardware/phone-android";

class FloatingCounter extends React.Component {
    static defaultProps: {};

    static props: {
        title?: string;
        type: string;
        count: Number;
        onClick?: Function;
    };

    renderTitle(): ?React.Element {
        if (this.props.title && this.props.title.length > 0) {
            return (
                <div className="floating-counter-title">
                    {this.props.title}
                </div>
            );
        }
    }

    renderIcon(): ?React.Element {
        return (
            <PhoneIcon style={{width: "32px"}} />
        );
    }

    renderCount(): ?React.Element {
        if (this.props.count > 1) {
            return (
                <FloatingActionButton
                    className="floating-counter-count"
                    style={{marginLeft: "-10px"}}
                    zDepth={1}
                    mini={true}
                    backgroundColor="#FFF">
                    <div>{`+${this.props.count - 1}`}</div>
                </FloatingActionButton>
            );
        }
    }

    render(): React.Element {
        return (
            <div className="floating-counter">
                <FloatingActionButton
                    className={`floating-counter-${this.props.type}`}
                    zDepth={1}
                    mini={true}>
                    {this.renderIcon()}
                </FloatingActionButton>
                {this.renderCount()}
                {this.renderTitle()}
            </div>
        );
    }
}

export default FloatingCounter;
