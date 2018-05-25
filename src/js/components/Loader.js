/* @flow */

import React from "react";
import translate from "counterpart";

import Button from "./Button";
import Card from "./Card";

class Loader extends React.Component {
    static defaultProps: {};

    static props: {
        retry: ?Function;
    };

    render(): React.Element {
        if (this.props.retry) {
            return (
                <div className="content-block">
                    <Card>
                        <p className="card-description">
                            {translate("general.error")}
                        </p>
                        <Button
                            className="button button-fill button-raised"
                            onClick={this.props.retry}>
                            {translate("general.retry")}
                        </Button>
                    </Card>
                </div>
            );
        }
        return (
            <div className="content-block">
                <p>
                    <span className="progressbar-infinite"></span>
                </p>
            </div>
        );
    }
}

export default Loader;
