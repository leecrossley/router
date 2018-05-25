NODE=./node_modules/
NODEBIN=$(NODE).bin/
APK=./platforms/android/build/outputs/apk/

BABEL=$(NODE)babel-cli/bin/babel-node.js
ICON=$(NODE)cordova-icon/bin/cordova-icon
SPLASH=$(NODE)cordova-splash/bin/cordova-splash
MOCHA=$(NODE)mocha/bin/mocha
WEBPACK=$(NODE)webpack/bin/webpack.js
DEVSERVER=$(NODE)webpack-dev-server/bin/webpack-dev-server.js

TASKS=./tasks/
SRC=./src/
WWW=./www/
PLATFORMS=./platforms/

name?=Energy
modulepack?=energy
reporter?=spec
platform?=ios android

app:
	# Remove any lingering code
	@make clean
	@cordova platform rm ios && cordova platform rm android
	@rm -rf $(PLATFORMS)
	# Set app name and ID
	@make conf
ifeq ($(findstring ios,$(platform)),ios)
	# Add ios platform
	@cordova platform add ios
endif
ifeq ($(findstring android,$(platform)),android)
	# Add android platform
	@cordova platform add android
endif
	# Create icon and splash screen assets
	@make assets
	# Setup modules and routes for modulepack
	@make modules
	# Convert language yaml to json and generate xx
	@make lang

prepare:
	@make clean
	@$(WEBPACK) --config webpack-production.config.js --progress --colors
	@make srcplugin
	@cordova prepare $(platform)

build:
	@make prepare
	@cordova build $(platform) --device

run:
	@make build
	@cordova run $(platform) --device

test:
	@make build
	@chmod -R 777 ./platforms/ios/build/emulator/
	@$(MOCHA) --reporter $(reporter) --compilers js:babel-core/register tests/

integration:
	@$(MOCHA) --timeout 20000 --reporter $(reporter) --compilers js:babel-core/register tests/integration/

modules:
	@$(BABEL) $(TASKS)modules $(modulepack)

lang:
	@$(BABEL) $(TASKS)xx $(name)
	@$(BABEL) $(TASKS)lang $(name)

conf:
	@$(BABEL) $(TASKS)config $(name)

assets:
	@$(ICON) --icon=./config/icon/$(name).png
	@$(SPLASH) --splash=./config/splash/$(name).png

srcplugin:
	if [ -f "./plugins/plugin-poltergeist/plugin.xml" ]; then cordova plugin rm plugin-poltergeist; fi
	if [ -f "./plugins/plugin-tromp/plugin.xml" ]; then cordova plugin rm plugin-tromp; fi
	if [ -f "./plugins/plugin-wifi/plugin.xml" ]; then cordova plugin rm plugin-wifi; fi
	if [ -f "./plugins/cordova-plugin-dialogs/plugin.xml" ]; then cordova plugin rm cordova-plugin-dialogs; fi
ifeq ($(findstring android,$(platform)),android)
	#@cordova plugin add -d ./plugin-src/plugin-tromp
endif
	#@cordova plugin add -d ./plugin-src/plugin-poltergeist
	#@cordova plugin add -d ./plugin-src/plugin-wifi
	@cordova plugin add https://github.com/leecrossley/cordova-plugin-dialogs

dev:
	@$(DEVSERVER) --config webpack-dev-server.config.js --progress --inline --colors

devlib:
	@scp presciense@presciense:/Users/presciense/TeamCity-AWS/work/485272bd58bfc4f7/poltergeist/target/armv7-apple-ios/release/libconsumer_client.a ./plugin-src/plugin-poltergeist/src/ios/libconsumer_client-armv7.a
	@scp presciense@presciense:/Users/presciense/TeamCity-AWS/work/485272bd58bfc4f7/poltergeist/target/aarch64-apple-ios/release/libconsumer_client.a ./plugin-src/plugin-poltergeist/src/ios/libconsumer_client-aarch64.a

sideload:
	@zip -d $(APK)android-armv7-debug.apk META-INF/* || true
	@jarsigner -verbose -keystore ./signing/platform.jks -signedjar $(APK)android-armv7-debug-signed.apk $(APK)android-armv7-debug.apk android -keypass android -storepass plopplop
	@rm $(APK)android-armv7-debug-aligned-signed.apk || true
	@zipalign -v 4 $(APK)android-armv7-debug-signed.apk $(APK)android-armv7-debug-aligned-signed.apk
	@adb install -r $(APK)android-armv7-debug-aligned-signed.apk

clean:
	@rm -rf $(WWW) && mkdir $(WWW)
