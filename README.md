## Presciense Mobile App

### Prerequisites

Ensure [node.js](http://nodejs.org/download/) is installed and up to date, then run:

    npm i

Install `cordova` and `flow`:

    npm i cordova@6.5.0 -g
    brew install flow

### Technologies

Bedtime reading:

- [React](http://facebook.github.io/react/docs/getting-started.html)
- [React Router](https://github.com/rackt/react-router/tree/latest/docs)
- [ES2015 / ES6](http://babeljs.io/docs/learn-es2015/)
- [React ES6 classes](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes)
- [Flow](http://flowtype.org/)
- [Webpack](https://webpack.github.io/)
- [Cordova](https://cordova.apache.org/)

### Developing

#### Make an app

The first time you clone the repo, or to switch "app" you need to `make app`, e.g. for the Vodafone router app:

    make app name=Station modulepack=router

Only files within the `/src` directory should be modified when developing. Other directories, such as `/www` are auto generated.

#### Dev server for local dev

    make dev

This will start a webpack hot deploy development server `localhost:9006`.

#### Build for real device testing

Building and running for a real device (can be platform specific):

    make build
    make build platform=android
    make run platform=android

#### Flow type checking

Run the flow server and check status (this will change and become part of the pipeline):

    flow server
    flow status

There are other alternatives to the above, such as `flow check`.

#### Multi language

Every snippet of text within the app should be defined in *each* of the language resource files defined at `/src/js/languages`.

Language files are authored in yaml and converted to json as part of the `make app` process, to easily be loaded at runtime dynamically based on `navigator.language`.

You can also run `make lang` manually when you make language changes.

```yaml
phone:
  missed_calls:
    zero: "No missed calls"
    one: "%(count)s missed call"
    other: "%(count)s missed calls"
```

which can then be called within the app, for example within a react component:

```jsx
<p>{translate("phone.missed_calls", {count: 2})}</p>
```

To check that all text within the app has been added as a language resource, there is a language conversion task that is run at the same time. This translates the `en.yml` resource to `xx.yml`, which is a language comprised of only Xs and can be used as a visual representation for any missed translations.

#### Modules

TODO

**More to follow**
