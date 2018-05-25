
#ifndef cheddar_generated_poltergeist_h
#define cheddar_generated_poltergeist_h


#ifdef __cplusplus
extern "C" {
#endif

#include <stdint.h>
#include <stdbool.h>



/// Opaque newtype, C interface will just treat it as a dumb pointer
typedef struct Client Client;

typedef void (*Callback)(char const* json, void* user_data);

/// Initialise a poltergeist client, this creates a few threads and
/// provides a thread
/// safe communication wrapper owned by the caller. Call `teardown` to
/// ensure things
/// are cleaned up
/// # Arguments
/// + `cert_location` - path to certificate store directory
/// + `cb` a callback for json event payload and user data
/// + `user_data` - will be returned on every invocation of `cb`. Unaltered
/// by client, if it blows up its not my fault
/// + `loglevel` 0.. = Error .. Trace
Client* init_ihd(char const* cert_location, Callback cb, void* user_data, uint8_t loglevel);

/// Create a client in mobile mode - can conditionally connect directly to
/// a LAN poltergeist or Oort remote. Nothing networky will happen until
/// you call connect_lan or connect_oort, using parameters sent to you in a
/// `poltergeistavailable` message.
/// + `cert_location` - path to certificate store directory
/// + `store_location` - path to writable store directory
/// + `oort` - DNS name of oort service
/// + `cb` a callback for json event payload and user data
/// + `user_data` - will be returned on every invocation of `cb`. Unaltered
/// by client, if it blows up its not my fault
/// + `loglevel` 0.. = Error .. Trace
Client* init_mobile(char const* cert_location, char const* store_location, char const* oort, Callback cb, void* user_data, uint8_t loglevel);

/// Attempt to connect to a LAN poltergeist, using parameters you have
/// recieved from a `poltergeistavailable` message, or something cached if
/// feeling brave
void connect_lan(Client* client, char const* id, char const* addr);

/// Attempt to connect to a poltergeist via oort, using parameters you have
/// recieved from
/// a `poltergeistavailable` message
void connect_oort(Client* client, char const* id);

/// Contact gateway and get current device state, subscribing to updates
/// from
/// any devices that it knows about
void sync_all_available_devices(Client* client);

/// Pass ownership of client object back to rust
void teardown(Client* client);

/// Put the gateway into allow join mode for `seconds`
void permit_join(Client* client, uint8_t seconds);

/// Form an HA network on the lowest noise channel, will tear down existing
/// network
void form_ha_network(Client* client);

/// Join an open SE network. This will *leave* the current SE network. Do
/// not call except during meter provisioning
void join_se_network(Client* client);



#ifdef __cplusplus
}
#endif


#endif
