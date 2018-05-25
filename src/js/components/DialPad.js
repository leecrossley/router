/* @flow */

import React from "react";
import translate from "counterpart";

import Icon from "./Icon";

const dialKeys = [
    [
        {key: "1"},
        {key: "2", subkey: "abc"},
        {key: "3", subkey: "def"}
    ], [
        {key: "4", subkey: "ghi"},
        {key: "5", subkey: "jkl"},
        {key: "6", subkey: "mno"}
    ], [
        {key: "7", subkey: "pqrs"},
        {key: "8", subkey: "tuv"},
        {key: "9", subkey: "wxyz"}
    ], [
        {key: "*"},
        {key: "0", subkey: "+"},
        {key: "#"}
    ]
];

class DialPad extends React.Component {
    static defaultProps: {};

    static props: {
        onCall?: Function;
    };

    state: Object = {
        val: ""
    };

    componentDidMount(): void {
        // TODO: Add taphold event to react?
        window.Dom7("a[data-key='0']").on("taphold", this.handleKeypress.bind(this, "+"));
        window.Dom7(".dial-button-backspace").on("taphold", this.resetVal.bind(this));
    }

    handleKeypress(key: string): void {
        if (this.state.val.length > 15) {
            return;
        }
        this.setState({
            val: this.state.val + key
        });
    }

    hasVal(): boolean {
        return this.state.val.length > 0;
    }

    resetVal(): void {
        if (this.hasVal()) {
            this.setState({
                val: ""
            });
        }
    }

    removeChar(): void {
        if (this.hasVal()) {
            this.setState({
                val: this.state.val.slice(0, -1)
            });
        }
    }

    handleCall(): void {
        if (this.hasVal() && this.props.onCall) {
            this.props.onCall(this.state.val);
        }
    }

    renderKey(key: Object, i: number): React.Element {
        let keypress = this.handleKeypress.bind(this, key.key);
        return (
            <div key={i} className="dial-table-col">
                <a onClick={keypress} data-key={key.key} className="dial-key-wrap">
                    <div className="dial-key">{key.key}</div>
                    <div className="dial-sub-key">{key.subkey || "\u00a0"}</div>
                </a>
            </div>
        );
    }

    renderRow(row: Array<Object>, i: number): React.Element {
        return (
            <div key={i} className="dial-table-row">
                {row.map(this.renderKey.bind(this))}
            </div>
        );
    }

    renderActions(): React.Element {
        let hidden = this.hasVal() ? "" : "hidden";
        return (
            <div className="dial-table-row no-sub-key">
                <div className="dial-table-col"></div>
                <div className="dial-table-col" onClick={this.handleCall.bind(this)}>
                    <a className="dial-key-wrap dial-button-call">
                        <div className="dial-key"><Icon name="call"></Icon></div>
                    </a>
                </div>
                <div className="dial-table-col" onClick={this.removeChar.bind(this)}>
                    <a className={`dial-key-wrap dial-button-backspace ${hidden}`}>
                        <div className="dial-key"><Icon name="backspace"></Icon></div>
                    </a>
                </div>
            </div>
        );
    }

    render(): React.Element {
        return (
            <div className="dial-pad-wrap">
                <div className="dial-pad">
                    <div className="dial-screen">
                        {this.state.val}
                    </div>
                    <div className="dial-table">
                        {dialKeys.map(this.renderRow.bind(this))}
                        {this.renderActions()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DialPad;
