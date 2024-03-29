/*
 * datastructure.c
 *
 *  Created on: Mar 28, 2024
 *      Author: SSAFY
 */

#include "datastructure.h"

void request_queue_init() {
	queue_head = NULL;
	queue_tail = NULL;
}

void request_push(char *request_str) {
	RequestQueue *temp = (RequestQueue*)malloc(sizeof(RequestQueue));
	memset(temp->requestName, 0, REQUEST_MAX);
	strncpy(temp->requestName, request_str, REQUEST_MAX);
	temp->next = NULL;

	if(!queue_head){
		queue_head = temp;
	}
	else{
		queue_tail->next = temp;
	}
	queue_tail = temp;
}

char *request_front() {
	if(!queue_head){
		return NULL;
	}

	return queue_head->requestName;
}

void request_pop(){
	if(!queue_head){
		return;
	}

	RequestQueue *del_data = queue_head;
	queue_head = queue_head->next;
	free(del_data);
}
