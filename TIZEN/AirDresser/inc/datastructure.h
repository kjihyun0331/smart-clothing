/*
 * datastructure.h
 *
 *  Created on: Mar 28, 2024
 *      Author: SSAFY
 */

#ifndef DATASTRUCTURE_H_
#define DATASTRUCTURE_H_

#include <stdlib.h>
#include <string.h>

#define REQUEST_MAX 30

typedef struct _RequestQueue RequestQueue;
struct _RequestQueue {
	char requestName[REQUEST_MAX];
	RequestQueue *next;
};

RequestQueue *queue_head, *queue_tail;

void request_queue_init();
void request_push(char*);
char *request_front();
void request_pop();

#endif /* DATASTRUCTURE_H_ */
