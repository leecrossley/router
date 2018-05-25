var client: OpaquePointer! = nil
var poltergeist: Poltergeist! = nil
var eventCallbackId: String! = nil

@objc(Poltergeist) class Poltergeist : CDVPlugin {

    override public func pluginInitialize() {
        super.pluginInitialize()

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(Poltergeist.onPause),
            name: NSNotification.Name.UIApplicationDidEnterBackground,
            object: nil
        )
    }

    @objc(init_consumer:)
    func init_consumer(command: CDVInvokedUrlCommand) {
        if (client != nil) {
            return err(
                msg: "Client already initialised",
                command: command
            )
        }

        let storePath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]

        // TODO: pass in from config
        let oort = "mqtt.dev.polaris.prescien.se:8883"

        if let resourcePath = Bundle.main.resourcePath {
            client = init_mobile(resourcePath, storePath, oort, callback, nil, 4)
            poltergeist = self;
            eventCallbackId = command.callbackId;
            return ok(command: command, keepCallback: true)
        }

        return err(
            msg: "Unable to initialise client",
            command: command
        )
    }

    @objc(connect:)
    func connect(command: CDVInvokedUrlCommand) {
        if (client == nil) {
            return err(
                msg: "Client not initialised",
                command: command
            )
        }

        guard let args = command.arguments[0] as? NSDictionary,
              let id = args["id"] as? String
        else {
            return err(
                msg: "Required arguments not supplied",
                command: command
            )
        }

        if let addr = args["addr"] as? String {
            connect_lan(client, id, addr)
        } else {
            connect_oort(client, id)
        }

        ok(command: command, keepCallback: false)
    }

    @objc(form_ha:)
    func form_ha(command: CDVInvokedUrlCommand) {
        if (client == nil) {
            return err(
                msg: "Client not initialised",
                command: command
            )
        }

        form_ha_network(client)
        ok(command: command, keepCallback: false)
    }

    @objc(join_ha:)
    func join_ha(command: CDVInvokedUrlCommand) {
        if (client == nil) {
            return err(
                msg: "Client not initialised",
                command: command
            )
        }

        permit_join(client, 255)
        ok(command: command, keepCallback: false)
    }

    @objc(sync:)
    func sync(command: CDVInvokedUrlCommand) {
        if (client == nil) {
            return err(
                msg: "Client not initialised",
                command: command
            )
        }

        sync_all_available_devices(client)
        ok(command: command, keepCallback: false)
    }

    @objc(teardown:)
    func teardown(command: CDVInvokedUrlCommand) {
        if (client == nil) {
            return err(
                msg: "Client not initialised",
                command: command
            )
        }

        doTeardown(client: client)
        ok(command: command, keepCallback: false)
    }

    func ok(command: CDVInvokedUrlCommand, keepCallback: Bool) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        result?.setKeepCallbackAs(keepCallback)

        self.commandDelegate!.send(
            result,
            callbackId: command.callbackId
        )
    }

    func err(msg: String, command: CDVInvokedUrlCommand) {
        self.commandDelegate!.send(
            CDVPluginResult(
                status: CDVCommandStatus_ERROR,
                messageAs: msg
            ),
            callbackId: command.callbackId
        )
    }

    func onPause() {
        if (client != nil) {
            doTeardown(client: client)
        }
    }
}

func callback(json: UnsafePointer<Int8>?, user_data: UnsafeMutableRawPointer?) {
    let result = CDVPluginResult(
        status: CDVCommandStatus_OK,
        messageAs: String(cString: json!)
    )
    result?.setKeepCallbackAs(true)

    poltergeist.commandDelegate!.send(
        result,
        callbackId: eventCallbackId
    )
}

// TODO: this is stupid, need to find a way to
// explicitly qualify global import with module name
func doTeardown(client: OpaquePointer!) {
    teardown(client)
}
