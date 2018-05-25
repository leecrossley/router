## Poltergeist Client Plugin for Apache Cordova

### Install

```
cordova plugin add -d ~/presciense/poltergeist/plugin #etc
```

**Note:** For now at least, target `android-targetSdkVersion=18`

### Update

#### SWIG

```
swig -java -package com.presciense.poltergeist -outdir ./src/android -o ./jni/consumer_client_wrap.c ./jni/consumer_client.i
```

#### ndk-build

```
ndk-build
```

### Functions

A `poltergeist` object is clobbered to the root automatically. All functions on the `poltergeist` object should be called after the cordova `deviceready` event.

**docs coming later - will be refactored**
