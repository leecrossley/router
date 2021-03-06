/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (http://www.swig.org).
 * Version 3.0.10
 *
 * Do not make changes to this file unless you know what you are doing--modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

package com.presciense.poltergeist;

public class consumer_client {
  public static SWIGTYPE_p_Client init_ihd(String cert_location, JavaCallback cb, short loglevel) {
    long cPtr = consumer_clientJNI.init_ihd(cert_location, cb, loglevel);
    return (cPtr == 0) ? null : new SWIGTYPE_p_Client(cPtr, false);
  }

  public static SWIGTYPE_p_Client init_mobile(String cert_location, String store_location, String oort, JavaCallback cb, short loglevel) {
    long cPtr = consumer_clientJNI.init_mobile(cert_location, store_location, oort, cb, loglevel);
    return (cPtr == 0) ? null : new SWIGTYPE_p_Client(cPtr, false);
  }

  public static void connect_lan(SWIGTYPE_p_Client client, String id, String addr) {
    consumer_clientJNI.connect_lan(SWIGTYPE_p_Client.getCPtr(client), id, addr);
  }

  public static void connect_oort(SWIGTYPE_p_Client client, String id) {
    consumer_clientJNI.connect_oort(SWIGTYPE_p_Client.getCPtr(client), id);
  }

  public static void sync_all_available_devices(SWIGTYPE_p_Client client) {
    consumer_clientJNI.sync_all_available_devices(SWIGTYPE_p_Client.getCPtr(client));
  }

  public static void teardown(SWIGTYPE_p_Client client) {
    consumer_clientJNI.teardown(SWIGTYPE_p_Client.getCPtr(client));
  }

  public static void permit_join(SWIGTYPE_p_Client client, short seconds) {
    consumer_clientJNI.permit_join(SWIGTYPE_p_Client.getCPtr(client), seconds);
  }

  public static void form_ha_network(SWIGTYPE_p_Client client) {
    consumer_clientJNI.form_ha_network(SWIGTYPE_p_Client.getCPtr(client));
  }

  public static void join_se_network(SWIGTYPE_p_Client client) {
    consumer_clientJNI.join_se_network(SWIGTYPE_p_Client.getCPtr(client));
  }

  public static void on_off_turn_on(SWIGTYPE_p_Client client, String device, short endpoint) {
    consumer_clientJNI.on_off_turn_on(SWIGTYPE_p_Client.getCPtr(client), device, endpoint);
  }

  public static void on_off_turn_off(SWIGTYPE_p_Client client, String device, short endpoint) {
    consumer_clientJNI.on_off_turn_off(SWIGTYPE_p_Client.getCPtr(client), device, endpoint);
  }

  public static void on_off_toggle(SWIGTYPE_p_Client client, String device, short endpoint) {
    consumer_clientJNI.on_off_toggle(SWIGTYPE_p_Client.getCPtr(client), device, endpoint);
  }

}
