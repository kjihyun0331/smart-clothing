#ifndef __airdresser_H__
#define __airdresser_H__

#include <app.h>
#include <Elementary.h>
#include <system_settings.h>
#include <efl_extension.h>
#include <dlog.h>

#include <net_connection.h>
#include <sys/stat.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <net/if.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>
#include <stdlib.h>
#define BUF_SIZE 1024

#include <json-glib/json-glib.h>
#include <iconv.h>
#include <curl/curl.h>

#include <app_resource_manager.h>

#ifdef  LOG_TAG
#undef  LOG_TAG
#endif
#define LOG_TAG "airdresser"

#if !defined(PACKAGE)
#define PACKAGE "org.example.airdresser"
#endif

#endif /* __airdresser_H__ */
