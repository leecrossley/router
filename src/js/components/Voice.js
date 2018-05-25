/* @flow */

import React from "react";

import AVS from "alexa-voice-service";
import Alexa from "../actions/Alexa";
import Encoder from "../actions/Encode";

import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import Button from "material-ui/RaisedButton";

import VoiceIcon from "material-ui/svg-icons/action/settings-voice";
import RecordIcon from "material-ui/svg-icons/action/record-voice-over";

const config = {
    sampleRate: audioinput.SAMPLERATE.VOIP_16000Hz,
    bufferSize: 16384,
    channels: audioinput.CHANNELS.MONO,
    format: audioinput.FORMAT.PCM_16BIT,
    normalize: true,
    normalizationFactor: 32767.0,
    streamToWebAudio: false,
    audioContext: null,
    concatenateMaxChunks: 10,
    audioSourceType: audioinput.AUDIOSOURCE_TYPE.MIC
};

let audioDataBuffer = [];

const onAudioInputCapture = (e) => {
    if (e && e.data) {
        audioDataBuffer = audioDataBuffer.concat(e.data);
    }
};

const onAudioInputError = (err) => {
    console.error(err);
};

window.addEventListener("audioinput", onAudioInputCapture, false);
window.addEventListener("audioinputerror", onAudioInputError, false);

class Voice extends React.Component {

    state: Object = {
        recording: false,
        playing: false
    };

    componentWillMount() {
        this.setup();
    }

    sound(blob) {
        var reader = new FileReader();
        reader.onload = (e) => {
            var audio = document.getElementById("audio");
            audio.src = e.target.result;
            audio.play();
            audio.addEventListener("ended", () => {
                this.setState({
                    playing: false
                });
            }, false);
        };
        reader.readAsDataURL(blob);
        this.setState({
            playing: true
        });
    }

    setup() {
        window.avs = new AVS({
            clientId: "amzn1.application-oa2-client.2a15cd4c156e4531a8fc437e333e94be",
            clientSecret: "7fcef2e4fe38b1ec2e4526d8ba77de3cf90e80a4480858fa973d069a36a8099a",
            deviceId: "IHD",
            deviceSerialNumber: 1234,
            redirectUri: "https://ihd.herokuapp.com/authresponse"
        });

        setInterval(this.getAccessToken.bind(this), 1000 * 60 * 59);
        document.addEventListener("online", this.getAccessToken.bind(this), false);
        this.getAccessToken();

        avs.on(AVS.EventTypes.TOKEN_INVALID, this.getAccessToken.bind(this));
    }

    getAccessToken() {
        Alexa.getAccessToken().then(creds => {
            avs.setToken(creds.access_token);
        }).catch(err => {
            console.log(err);
        });
    }

    getAudioControl() {
        if (this.state.playing) {
            return (<div className="loader-container">
                <div className="rectangle-1"></div>
                <div className="rectangle-2"></div>
                <div className="rectangle-3"></div>
                <div className="rectangle-4"></div>
                <div className="rectangle-5"></div>
                <div className="rectangle-6"></div>
                <div className="rectangle-5"></div>
                <div className="rectangle-4"></div>
                <div className="rectangle-3"></div>
                <div className="rectangle-2"></div>
                <div className="rectangle-1"></div>
            </div>);
        }

        return (<Button
            className="voice-button"
            onClick={this.recordPress.bind(this)}
            label={this.state.recording ? "Stop Recording" : "Start Recording"}
            disableTouchRipple={true}
            disableFocusRipple={true}
            labelPosition="before"
            secondary={true}
            icon={<RecordIcon />}
        />);

    }

    startRecording() {
        audioDataBuffer = [];
        audioinput.start(config);
    }

    stopRecording() {
        return new Promise((resolve, reject) => {
            if (!window.audioinput || !audioinput.isCapturing()) {
                return reject();
            }

            audioinput.stop();

            let encoder = new Encoder(config.sampleRate, config.channels);
            encoder.encode([audioDataBuffer]);

            return resolve(encoder.finish());
        });
    }

    recordPress() {
        if (this.state.recording) {
            this.stopRecording().then(dataView => {
                avs.sendAudio(dataView)
                    .then(this.parseVoiceResponse.bind(this))
                    .catch(err => {
                        console.error(err);
                    });
            }).catch(err => {
                console.error(err);
            });
        } else {
            this.startRecording();
        }
        return this.setState({
            recording: !this.state.recording
        });
    }

    parseVoiceResponse({xhr, response}) {
        if (!response.multipart.length) {
            console.log("weird reponse");
            console.log(response);
            return;
        }

        let promises = [];
        let audioMap = {};
        let directives;

        response.multipart.forEach(multipart => {
            let body = multipart.body;
            if (multipart.headers && multipart.headers["Content-Type"] === "application/json") {
                try {
                    body = JSON.parse(body);
                } catch (err) {
                    console.log(err);
                }

                if (body && body.messageBody && body.messageBody.directives) {
                    directives = body.messageBody.directives;
                }
            } else if (multipart.headers["Content-Type"] === "audio/mpeg") {
                const start = multipart.meta.body.byteOffset.start;
                const end = multipart.meta.body.byteOffset.end;
                const sliced = xhr.response.slice(start, end);

                audioMap[multipart.headers["Content-ID"]] = sliced;
            }
        });

        const audioByCid = (cid) => {
            cid = cid.replace("cid:", "");
            for (var key in audioMap) {
                if (key.indexOf(cid) > -1) {
                    return audioMap[key];
                }
            }
        };

        directives.forEach(directive => {
            if (directive.namespace === "SpeechSynthesizer") {
                if (directive.name === "speak") {
                    const cid = directive.payload.audioContent;
                    const audio = audioByCid(cid);
                    if (audio) {
                        avs.audioToBlob(audio)
                            .then(blob => {
                                this.sound(blob);
                            });
                    }
                }
            }
        });
    }

    render(): React.Element {
        return (
            <Paper className="settings" zDepth={3}>
                <h3>
                    <VoiceIcon />
                    <span>Voice Control</span>
                </h3>
                <Divider />
                {this.getAudioControl()}
                <audio height="0" width="0" id="audio" type="audio/mpeg"></audio>
            </Paper>
        );
    }
}

export default Voice;
