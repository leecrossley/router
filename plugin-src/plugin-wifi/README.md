## Wifi Manager Plugin for Polaris

### Install

```
cordova plugin add -d ./plugin-src/plugin-wifi #etc
```

### Functions

A `wifi` object is clobbered to the root automatically. All functions on the `wifi` object should be called after the cordova `deviceready` event.

#### Scan

Starts the wifi scanning process.

```js
wifi.scan(onSuccess, onError);
```

#### Results

Displays the results from the scan.

```js
wifi.results(onSuccess, onError);
```

#### Add

Adds a wifi network to the known list of networks, given an ssid and optional password. If the network already exists in the known network list, it is updated. This call also connects to the network.

```js
wifi.add(onSuccess, onError, ssid, password);
```

#### Connect

Connects to a wifi network in the known list of networks.

```js
wifi.connect(onSuccess, onError, ssid);
```

#### Disconnect

Disconnects from the current network.

```js
wifi.disconnect(onSuccess, onError);
```

#### Current

Returns the current ssid and rssi. If null or empty, error handler is triggered.

```js
wifi.current(onSuccess, onError);
// {"ssid": "Test1", "rssi": 3}
```
