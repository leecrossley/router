/* @flow */

import React from "react";
import translate from "counterpart";

import AppBar from "../components/AppBar";
import PageTransition from "../utils/PageTransition";

import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

class CameraBuy extends React.Component {

    componentDidMount(): void {
        PageTransition.execute();
    }

    buy(): void {
        ApplePay.makePaymentRequest({
            items: [{
                label: "VEON Home Camera",
                amount: 6990
            }],
            shippingMethods: [{
                identifier: "NextDay",
                label: "Next Day",
                detail: "Delivery tomorrow by 6pm",
                amount: 0
            }],
            merchantIdentifier: "merchant.com.presciense.veon",
            currencyCode: "RUB",
            countryCode: "RU",
            billingAddressRequirement: "none",
            shippingAddressRequirement: "none",
            shippingType: "shipping"
        })
        .then((paymentResponse) => {
            setTimeout(() => {
                ApplePay.completeLastTransaction("success");
                window.location.hash = "#camerabought";
                PageTransition.start();
            }, 1000);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    render(): React.Element {
        return (
            <div>
                <AppBar title={translate("camera.title")} menu={true} />
                <Paper className="camera-main paper-main" zDepth={1}>
                    <div className="camera-product"></div>
                    <p className="camera-description">
                        {translate("camera.description")}
                    </p>
                    <p>
                        <RaisedButton
                            onTouchTap={this.buy.bind(this)}
                            label="BUY NOW FOR 6,990 ₽"
                            secondary={true}
                        />
                    </p>
                </Paper>
            </div>
        );
    }
}

export default CameraBuy;
