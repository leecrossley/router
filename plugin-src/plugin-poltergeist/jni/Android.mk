LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE            := consumer_client
LOCAL_SRC_FILES         := libconsumer_client.so # TODO update path to release dir

include $(PREBUILT_SHARED_LIBRARY)

include $(CLEAR_VARS)

LOCAL_MODULE    		:= consumer_client_wrap
LOCAL_SRC_FILES 		:= consumer_client_wrap.c
LOCAL_SHARED_LIBRARIES 	:= consumer_client
TARGET_ARCH_ABI         := armeabi-v7a
LOCAL_LDLIBS 			:= -llog

include $(BUILD_SHARED_LIBRARY)
