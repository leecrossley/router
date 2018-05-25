%include "stdint.i"
%include "typemaps.i"

%module consumer_client
%{
#include "./poltergeist.h"

struct callback_data {
    JavaVM *jvm;
    jobject obj;
};

void java_callback(char const* json, void* ptr) {
    struct callback_data *data = ptr;
    JNIEnv *jenv;
    (*data->jvm)->AttachCurrentThread((data->jvm), &jenv, 0);
    (*jenv)->ExceptionClear(jenv);

    const jclass callbackClass = (*jenv)->GetObjectClass(jenv, (data->obj));
    const jmethodID meth = (*jenv)->GetMethodID(jenv, callbackClass, "handle", "(Ljava/lang/String;)V");
    jstring json_string = (*jenv)->NewStringUTF(jenv, json);

    (*jenv)->CallVoidMethod(jenv, data->obj, meth, json_string);

    (*jenv)->DeleteLocalRef(jenv, json_string);
    (*jenv)->DeleteLocalRef(jenv, callbackClass);
}
%}

%typemap(jstype) Callback cb "JavaCallback";
%typemap(jtype) Callback cb "JavaCallback";
%typemap(jni) Callback cb "jobject";
%typemap(javain) Callback cb "$javainput";

%typemap(in, numinputs=1) (Callback cb, void* user_data) {
    struct callback_data *data = malloc(sizeof *data);
    data->obj = JCALL1(NewGlobalRef, jenv, $input);
    (*jenv)->GetJavaVM(jenv, (&data->jvm));
    JCALL1(DeleteLocalRef, jenv, $input);
    $1 = java_callback;
    $2 = data;
}

%include "./poltergeist.h"
