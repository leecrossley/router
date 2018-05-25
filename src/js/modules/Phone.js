/* @flow */

import React from "react";
import translate from "counterpart";
import fjs from "functional.js";

import VoIP from "../actions/VoIPActions";

import Navbar from "../components/Navbar";
import { Tabs, Tab } from "../components/Tabs";
import DialPad from "../components/DialPad";
import { ListView, ListItem } from "../components/List";

class Phone extends React.Component {

    state: Object = {
        contacts: []
    };

    componentDidMount(): void {
        var options = new window.ContactFindOptions();
        options.multiple = true;
        options.desiredFields = ["id", "name", "phoneNumbers", "photos"];

        // TODO: handle contacts error
        window.navigator.contacts.find(["*"], this.setContacts.bind(this), null, options);
    }

    acronymise(contact: Object): ?string {
        var initials = "";
        var processNameForInitial = (name) => {
            if (name && name.length > 0) {
                return name[0];
            } else {
                return "";
            }
        };
        initials += processNameForInitial(contact.givenName);
        initials += processNameForInitial(contact.familyName);
        return initials.toUpperCase();
    }

    setContacts(contacts: Array<Object>): void {
        var validContacts = [];
        let acronymise = this.acronymise;

        fjs.each((c) => {
            if (c && c.name && c.name.formatted &&
                c.phoneNumbers && c.phoneNumbers.length > 0) {
                validContacts.push({
                    "name": c.name.formatted,
                    "numbers": c.phoneNumbers,
                    "acronym": acronymise(c.name),
                    "photo": c.photos ? c.photos[0].value : undefined
                });
            }
        }, contacts);

        validContacts.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

        var grouped = fjs.group((c) => {
            return c.name.toUpperCase().charAt(0);
        }, validContacts);

        this.setState({
            contacts: fjs.toArray(grouped)
        });
    }

    initPhoneCall(number: string): void {
        let actions = [];
        // TODO: Only show SIP option on LAN

        let options = [{
            text: translate("phone.voip_call"),
            onClick: this.voipCall.bind(this, number)
        }, {
            text: translate("phone.carrier_call"),
            onClick: this.carrierCall.bind(this, number)
        }];

        actions.push(options);

        actions.push([{
            text: translate("phone.cancel_call"),
            color: "button-cancel"
        }]);

        window.f7app.actions(actions);
    }

    voipCall(number: string): void {
        let options = {
            title: translate("phone.calling"),
            text: number,
            buttons: [{
                text: translate("phone.cancel_call"),
                bold: true,
                onClick: () => {
                    // TODO: cancel call (hangup)
                }
            }]
        };
        window.f7app.modal(options);

        VoIP.register()
            .then(VoIP.login)
            .then(() => VoIP.call(number))
            .then(() => {
                window.f7app.modal({
                    title: translate("phone.connected"),
                    buttons: [{
                        text: translate("phone.mute"),
                        onClick: VoIP.mute.bind(null, true) // TODO: toggle
                    }, {
                        text: translate("phone.speaker"),
                        onClick: VoIP.speaker.bind(null, true) // TODO: toggle
                    }, {
                        text: translate("phone.hangup"),
                        onClick: VoIP.hangup // TODO logout
                    }]
                });
            })
            .catch((e) => {
                // TODO: show error
                window.f7app.closeModal();
            });
    }

    carrierCall(number: string): void {
        window.plugins.CallNumber.callNumber(null, null, number);
    }

    showContactNumberPicker(contact: Object, e: Object): void {
        let context = this;
        let actions = [];

        let label = {
            label: true,
            text: translate("phone.call_help")
        };

        actions.push([label]);

        let callees = fjs.map(function(c) {
            return {
                text: `${c.value} (${c.type})`,
                bold: c.pref,
                onClick: context.initPhoneCall.bind(context, c.value)
            };
        }, contact.numbers);

        actions.push(callees);

        actions.push([{
            text: translate("phone.cancel_call"),
            color: "button-cancel"
        }]);
        window.f7app.actions(actions);
    }

    contactEntry(contact: Object): React.Element {
        return (
            <ListItem title={contact.name} key={contact.name}
                image={contact.photo}
                imageFallback={contact.acronym}
                onClick={this.showContactNumberPicker.bind(this, contact)}/>
        );
    }

    contactGroup(contactGroup: Array<Object>): React.Element {
        let groupName = contactGroup[0];
        let contactList = contactGroup[1];

        return (
            <div key={groupName}>
                <li className="list-group-title">{groupName}</li>
                {contactList.map(this.contactEntry.bind(this))}
            </div>
        );
    }

    render(): React.Element {
        return (
            <div data-page="phone" className="page navbar-fixed toolbar-fixed">
                <Navbar title={translate("phone.title")} menu={true}></Navbar>
                <Tabs>
                    {/*
                    <Tab id="log" icon="call-log">
                    */}
                    <Tab id="dialpad" icon="dialpad">
                        <DialPad onCall={this.initPhoneCall.bind(this)}></DialPad>
                    </Tab>
                    <Tab className="contacts-content" id="contacts" icon="contacts">
                        <ListView group={true} className="contacts-block">
                            {this.state.contacts.map(this.contactGroup.bind(this))}
                        </ListView>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Phone;
