#include "airdresser.h"

#define MAX_PROFILE 3
#define MAX_CLOTHES 3

typedef struct appdata {
	Evas_Object *win;
	Evas_Object *conform;
	Evas_Object *label;
} appdata_s;

static void
win_delete_request_cb(void *data, Evas_Object *obj, void *event_info)
{
	ui_app_exit();
}

static void
win_back_cb(void *data, Evas_Object *obj, void *event_info)
{
	appdata_s *ad = data;
	/* Let window go to hide state. */
	elm_win_lower(ad->win);
}

struct PathData {
	Evas_Object *nf;
	char *edj_path;
} main_obj;

typedef struct _UserProfile {
	Evas_Object *wrapper;
	Evas_Object *box;
	Evas_Object *image;
	Evas_Object *name;
} UserProfile;

struct ProfileSelectObject {
	Evas_Object *main_wrapper;
	Evas_Object *title;
	Evas_Object *person_list_box;
	UserProfile profile[MAX_PROFILE];
} profile_select_obj;

typedef struct _Clothes{
	Evas_Object *image;
} Clothes;

struct OutfitCheckObject {
	Evas_Object *main_wrapper;
	Evas_Object *main_box;
	Evas_Object *title;
	Evas_Object *description;
	Evas_Object *data_box;
	Evas_Object *clothes_list_table;
	Clothes clothes[MAX_CLOTHES];

} outfit_check_obj;

struct ClothesRegisterObject {
	Evas_Object *main_wrapper;
	Evas_Object *main_box;
	Evas_Object *title;
	Evas_Object *description;
	Evas_Object *data_layout;
} clothes_register_obj;

typedef struct _ProfileData {
	int number;
	int selected;
	char name[100];
} ProfileData;

typedef struct _User {
	long long id;
	char name[100];
} User;

ProfileData profiles[MAX_PROFILE];
User users[MAX_PROFILE];
int userCount;
int selectProfileCount = 0;
int selectedIndex = -1;

void socket_init();
void socket_send(void*);
void socket_recv(void*);
void encodeToEuc(char*, char*);
void decodeToUtf(char*, char*);
size_t write_data(void*, size_t, size_t, FILE*);
void set_image(Evas_Object*, char*);
void back_to_main_cb(void*, Evas_Object*, void*);
void outfit_expand_cb(void*, Evas_Object*, void*);
void check_daily_outfit_cb(void*, Evas_Object*, void*);
void check_daily_outfit_select_person_cb(void*, Evas_Object*, void*);
void check_daily_outfit_select_profile_cb(void*, Evas_Object*, void*);
void check_daily_outfit_check_outfit_cb(void*, Evas_Object*, void*);
void add_clothes_cb(void*, Evas_Object*, void*);
void add_clothes_select_person_cb(void*, Evas_Object*, void*);
void add_clothes_select_profile_cb(void*, Evas_Object*, void*);
void add_clothes_register_clothes_cb(void*, Evas_Object*, void*);

void socket_init() {
	static connection_h connection;
	int error_code;

	error_code = connection_create(&connection);
	if (error_code != CONNECTION_ERROR_NONE) {
		dlog_print(DLOG_ERROR, LOG_TAG, "connection_error");

		exit(1);
	}

	// check connection is available
	connection_type_e net_state;
	error_code = connection_get_type(connection, &net_state);
	if (error_code != CONNECTION_ERROR_NONE || net_state == CONNECTION_TYPE_DISCONNECTED) {
		dlog_print(DLOG_ERROR, LOG_TAG, "Not connected %d\n", error_code);
		connection_destroy(connection);

		exit(1);
	}

	// check get connection profile
	char* local_ipv4 = NULL;
	connection_profile_h profile_h = NULL;
	int rv = connection_get_current_profile(connection, &profile_h);
	if (rv != CONNECTION_ERROR_NONE) {
		dlog_print(DLOG_INFO, LOG_TAG, "Failed to get profile handle %d\n", rv);
		connection_destroy(connection);
		free(local_ipv4);

		exit(1);
	}

	// get IPv4 address
	int ip_type = -1;
	rv = connection_profile_get_ip_address(profile_h, CONNECTION_ADDRESS_FAMILY_IPV4, &local_ipv4);
	if (rv == CONNECTION_ERROR_NONE && strcmp(local_ipv4, "0.0.0.0") != 0) {
		ip_type = CONNECTION_ADDRESS_FAMILY_IPV4;
		dlog_print(DLOG_INFO, LOG_TAG, "IPv4 address: %s\n", local_ipv4);
	}

	if (ip_type != CONNECTION_ADDRESS_FAMILY_IPV6
		&& ip_type != CONNECTION_ADDRESS_FAMILY_IPV4) {
		dlog_print(DLOG_INFO, LOG_TAG, "No IP address!\n");
		connection_profile_destroy(profile_h);
		connection_destroy(connection);
		free(local_ipv4);

		exit(1);
	}

	char* interface_name = NULL;
	connection_profile_get_network_interface_name(profile_h, &interface_name);
	dlog_print(DLOG_INFO, LOG_TAG, "Interface Name: %s\n", interface_name);

	struct addrinfo hints;
	struct addrinfo* result;

	memset(&hints, 0x00, sizeof(struct addrinfo));

	hints.ai_family = PF_UNSPEC;
	hints.ai_socktype = SOCK_STREAM;
	hints.ai_protocol = IPPROTO_TCP;

	dlog_print(DLOG_INFO, LOG_TAG, "hints : %d", hints.ai_flags);
//	if (getaddrinfo("10.0.2.2", "12346", &hints, &result) != 0) {	// emulator host ip
	if (getaddrinfo("192.168.84.174", "65432", &hints, &result) != 0) {	// server ip
//	if (getaddrinfo("52.78.199.11", "65432", &hints, &result) != 0) {	// server ip
		dlog_print(DLOG_INFO, LOG_TAG, "getaddrinfo() error\n");
		connection_profile_destroy(profile_h);
		connection_destroy(connection);
		free(local_ipv4);
		free(interface_name);

		exit(1);
	}

	dlog_print(DLOG_INFO, LOG_TAG, "hints : %d", result->ai_flags);

	int sockfd = -1;
	struct addrinfo* rp;

	rp = result;

	int ret_val = EAI_BADFLAGS;
	for (rp = result; rp != NULL; rp = rp->ai_next) {
		if (rp->ai_family == AF_INET && ip_type == CONNECTION_ADDRESS_FAMILY_IPV4) {
			if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
				dlog_print(DLOG_INFO, LOG_TAG, "socket error\n");
				break;
			}

			if ((ret_val = connect(sockfd, rp->ai_addr, rp->ai_addrlen)) < 0) {
				dlog_print(DLOG_INFO, LOG_TAG, "connect() error: %d %s\n", ret_val, strerror(errno));
				break;
			}

			dlog_print(DLOG_INFO, LOG_TAG, "IPv4\n");
		}
		else if (rp->ai_family == AF_INET6 && ip_type == CONNECTION_ADDRESS_FAMILY_IPV6) {
			if ((sockfd = socket(AF_INET6, SOCK_STREAM, 0)) < 0) {
				dlog_print(DLOG_INFO, LOG_TAG, "socket error\n");
				freeaddrinfo(result);
			}
			dlog_print(DLOG_INFO, LOG_TAG, "IPv6\n");
		}
	}

	if (sockfd >= 0) {
		pthread_t send_thread;
		pthread_t recv_thread;

		pthread_create(&send_thread, NULL, socket_send, (void*)&sockfd);
		pthread_create(&recv_thread, NULL, socket_recv, (void*)&sockfd);

		pthread_join(send_thread, NULL);
		pthread_join(recv_thread, NULL);

		close(sockfd);
	}

	freeaddrinfo(result);

	connection_profile_destroy(profile_h);
	connection_destroy(connection);
	free(local_ipv4);
	free(interface_name);
}

void socket_send(void *data) {
	int sockfd = *(int*)data;

	JsonObject *root = json_object_new();
	json_object_set_string_member(root, "requestName", "getAllLaundryList");
	json_object_set_int_member(root, "requestNumber", 1);

	JsonNode *node = json_node_new(JSON_NODE_OBJECT);
	json_node_set_object(node, root);
	char *send_data = json_to_string(node, FALSE);
	send_data[strlen(send_data)] = '\n';
	int count = write(sockfd, send_data, strlen(send_data));
}

void socket_recv(void *data) {
	int sockfd = *(int*)data;

	char recv_data[BUF_SIZE];
	memset(recv_data, 0, BUF_SIZE);
	int recv_len = read(sockfd, recv_data, BUF_SIZE);

	JsonParser *parser = json_parser_new();
	gboolean ret = json_parser_load_from_data(parser, recv_data, -1, NULL);
	JsonObject *root = json_node_get_object(json_parser_get_root(parser));

	userCount = json_object_get_int_member(root, "count");
	JsonArray *result = json_object_get_array_member(root, "result");
	for(int i = 0; i < userCount; i++){
		JsonObject *cur = json_array_get_object_element(result, i);

		users[i].id = json_object_get_int_member(cur, "userId");
		memset(users[i].name, 0, sizeof(users[i].name));
		char *user_name = json_object_get_string_member(cur, "userName");
		strncpy(users[i].name, user_name, strlen(user_name));
	}
}

void encodeToEuc(char *dest, char *src) {
	size_t inBytesLeft = strlen(src);
	size_t outBytesLeft = inBytesLeft * 2;
	iconv_t cd = iconv_open("EUC-KR", "UTF-8"); // UTF-8에서 EUC-KR로 변환
	if (cd != (iconv_t)-1) {
		memset(dest, 0, outBytesLeft);
		iconv(cd, &src, &inBytesLeft, &dest, &outBytesLeft);
		iconv_close(cd);
	}
}

void decodeToUtf(char *dest, char *src) {
	size_t inBytesLeft = strlen(src);
	size_t outBytesLeft = inBytesLeft * 2;
	iconv_t cd = iconv_open("UTF-8", "EUC-KR"); // EUC-KR에서 UTF-8로 변환
	if (cd != (iconv_t)-1) {
		memset(dest, 0, outBytesLeft);
		iconv(cd, &src, &inBytesLeft, &dest, &outBytesLeft);
		iconv_close(cd);
	}
}

size_t write_data(void *ptr, size_t size, size_t nmemb, FILE *stream) {
    return fwrite(ptr, size, nmemb, stream);
}

void set_image(Evas_Object *img, char *url) {
    CURL *curl;
    FILE *fp;
    CURLcode res;

    char outfilename[FILENAME_MAX] = {0};
    snprintf(outfilename, FILENAME_MAX, "%s%s", app_get_data_path(), "test.png");

    curl = curl_easy_init();
    if (curl) {
        fp = fopen(outfilename,"wb");
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, fp);
        res = curl_easy_perform(curl);
        curl_easy_cleanup(curl);
        fclose(fp);

    	elm_image_file_set(img, outfilename, NULL);
    }
}

void back_to_main_cb(void *data, Evas_Object *obj, void *event_info) {
	elm_naviframe_item_pop(main_obj.nf);
}

void outfit_expand_cb(void *data, Evas_Object *obj, void *event_info) {
	/*
	 * 	outfit expand layout
	 */
	Evas_Object *outfit_layout = elm_layout_add(main_obj.nf);
	elm_layout_file_set(outfit_layout, main_obj.edj_path, "main_layout");
	elm_naviframe_item_push(main_obj.nf, NULL, NULL, NULL, outfit_layout, NULL);
	Elm_Object_Item *main_item = elm_naviframe_top_item_get(main_obj.nf);
	elm_naviframe_item_title_enabled_set(main_item, EINA_FALSE, EINA_FALSE);

	Evas_Object *outfit_menu_box_wrapper = elm_layout_add(outfit_layout);
	elm_layout_file_set(outfit_menu_box_wrapper, main_obj.edj_path, "main_menu_wrapper");
	evas_object_size_hint_min_set(outfit_menu_box_wrapper, 1500, 750);
	evas_object_size_hint_max_set(outfit_menu_box_wrapper, 1500, 750);
	elm_layout_content_set(outfit_layout, "elm.swallow.content", outfit_menu_box_wrapper);
	evas_object_show(outfit_menu_box_wrapper);

	Evas_Object *outfit_menu_box = elm_box_add(outfit_menu_box_wrapper);
	elm_box_padding_set(outfit_menu_box, 0, 25);
	elm_box_align_set(outfit_menu_box, 0.5, 0);
	evas_object_size_hint_weight_set(outfit_menu_box, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(outfit_menu_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	elm_layout_content_set(outfit_menu_box_wrapper, "elm.swallow.content", outfit_menu_box);
	evas_object_show(outfit_menu_box);

	Evas_Object *outfit_menu_top_menu = elm_box_add(outfit_menu_box);
	elm_box_padding_set(outfit_menu_top_menu, 30, 0);
	evas_object_size_hint_weight_set(outfit_menu_top_menu, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(outfit_menu_top_menu, EVAS_HINT_FILL, 0);
	elm_box_horizontal_set(outfit_menu_top_menu, EINA_TRUE);
	elm_box_pack_end(outfit_menu_box, outfit_menu_top_menu);
	evas_object_show(outfit_menu_top_menu);

	Evas_Object *outfit_menu_top_menu_label = elm_label_add(outfit_menu_top_menu);
	elm_object_text_set(outfit_menu_top_menu_label, "<color=#ABABABFF font_size=55 font_weight=BOLD>코디</color>");
	elm_box_pack_end(outfit_menu_top_menu, outfit_menu_top_menu_label);
	evas_object_show(outfit_menu_top_menu_label);

	Evas_Object *outfit_menu_top_menu_empty = elm_layout_add(outfit_menu_top_menu);
	evas_object_size_hint_weight_set(outfit_menu_top_menu_empty, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(outfit_menu_top_menu_empty, EVAS_HINT_FILL, 0);
	elm_box_pack_end(outfit_menu_top_menu, outfit_menu_top_menu_empty);
	evas_object_show(outfit_menu_top_menu_empty);

	Evas_Object *check_daily_outfit_btn = elm_button_add(outfit_menu_top_menu);
	elm_object_style_set(check_daily_outfit_btn, "text_button");
	evas_object_size_hint_min_set(check_daily_outfit_btn, 140, 60);
	elm_object_text_set(check_daily_outfit_btn, "착용확인");
	elm_box_pack_end(outfit_menu_top_menu, check_daily_outfit_btn);
	evas_object_show(check_daily_outfit_btn);
	evas_object_smart_callback_add(check_daily_outfit_btn, "clicked", check_daily_outfit_cb, NULL);

	Evas_Object *add_clothes_btn = elm_button_add(outfit_menu_top_menu);
	elm_object_style_set(add_clothes_btn, "text_button");
	evas_object_size_hint_min_set(add_clothes_btn, 120, 60);
	elm_object_text_set(add_clothes_btn, "옷 등록");
	elm_box_pack_end(outfit_menu_top_menu, add_clothes_btn);
	evas_object_show(add_clothes_btn);
	evas_object_smart_callback_add(add_clothes_btn, "clicked", add_clothes_cb, NULL);

	Evas_Object *outfit_menu_top_menu_collapse_btn = elm_button_add(outfit_menu_top_menu);
	elm_object_style_set(outfit_menu_top_menu_collapse_btn, "image_button");
	evas_object_size_hint_min_set(outfit_menu_top_menu_collapse_btn, 100, 50);
	elm_box_pack_end(outfit_menu_top_menu, outfit_menu_top_menu_collapse_btn);
	evas_object_show(outfit_menu_top_menu_collapse_btn);
	// button image
	char *outfit_collapse_img_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "collapse.png", &outfit_collapse_img_path);
	Evas_Object *outfit_collapse_btn_img = elm_image_add(outfit_menu_top_menu_collapse_btn);
	elm_image_file_set(outfit_collapse_btn_img, outfit_collapse_img_path, NULL);
	elm_object_part_content_set(outfit_menu_top_menu_collapse_btn, "icon", outfit_collapse_btn_img);
	evas_object_smart_callback_add(outfit_menu_top_menu_collapse_btn, "clicked", back_to_main_cb, NULL);

	Evas_Object *outfit_scroller = elm_scroller_add(outfit_menu_box);
	evas_object_size_hint_weight_set(outfit_scroller, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(outfit_scroller, EVAS_HINT_FILL, EVAS_HINT_FILL);
	elm_scroller_policy_set(outfit_scroller, ELM_SCROLLER_POLICY_OFF, ELM_SCROLLER_POLICY_ON);
	elm_box_pack_end(outfit_menu_box, outfit_scroller);
	evas_object_show(outfit_scroller);

	Evas_Object *outfit_list_table = elm_table_add(outfit_scroller);
	elm_table_padding_set(outfit_list_table, 50, 20);
	elm_table_align_set(outfit_list_table, 0, 0.5);
	elm_layout_content_set(outfit_scroller, "elm.swallow.content", outfit_list_table);
	evas_object_show(outfit_list_table);

	// dummy data
	char outfit_image_paths[6][100] = { "outfit1.png", "outfit2.png", "outfit1.png", "outfit2.png", "outfit1.png", "outfit2.png" };
	char outfit_detail_name[6][100] = { "일정", "사용자" };
	char outfit_detail[6][2][100] = {
			{ "4/21", "사용자1" },
			{ "4/23", "사용자2" },
			{ "4/21", "사용자1" },
			{ "4/23", "사용자2" },
			{ "4/21", "사용자1" },
			{ "4/23", "사용자2" }
	};
	char outfit_detail_css[2][100] = {
			"<color=#A5A5A5FF font_size=27>%s</color>",
			"<color=#EFEFEFFF font_size=32>%s</color>"
	};

	for(int i = 0; i < 6; i++){
		// outfit wrapper
		Evas_Object *outfit_wrapper = elm_layout_add(outfit_list_table);
		evas_object_size_hint_min_set(outfit_wrapper, 300, 550);
		evas_object_size_hint_max_set(outfit_wrapper, 300, 550);
		elm_layout_file_set(outfit_wrapper, main_obj.edj_path, "outfit_wrapper");
		elm_table_pack(outfit_list_table, outfit_wrapper, i % 4, i / 4, 1, 1);
		evas_object_show(outfit_wrapper);

		// outfit box
		Evas_Object *outfit = elm_box_add(outfit_wrapper);
		elm_box_align_set(outfit, 0.5, 0);
		elm_box_padding_set(outfit, 0, 30);
		elm_layout_content_set(outfit_wrapper, "elm.swallow.content", outfit);
		evas_object_show(outfit);

		// outfit image
		char *outfit_img_path = NULL;
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, outfit_image_paths[i], &outfit_img_path);
		Evas_Object *outfit_img = elm_image_add(outfit);
		evas_object_size_hint_min_set(outfit_img, 200, 200);
		evas_object_size_hint_max_set(outfit_img, 200, 200);
		elm_image_file_set(outfit_img, outfit_img_path, NULL);
		elm_box_pack_end(outfit, outfit_img);
		evas_object_show(outfit_img);

		// outfit info table
		Evas_Object *outfit_detail_table = elm_table_add(outfit);
		evas_object_size_hint_weight_set(outfit_detail_table, EVAS_HINT_EXPAND, 0);
		evas_object_size_hint_align_set(outfit_detail_table, 0, 0);
		elm_table_padding_set(outfit_detail_table, 15, 10);
		elm_box_pack_end(outfit, outfit_detail_table);
		evas_object_show(outfit_detail_table);

		for (int row = 0; row < 2; row++) {
			for (int col = 0; col < 2; col++) {
				// outfit data - title or data
				Evas_Object *outfit_detail_label = elm_label_add(outfit_detail_table);
				evas_object_size_hint_align_set(outfit_detail_label, 0, 0.5);
				char content[200];
				if(col == 0){
					snprintf(content, 200, outfit_detail_css[col], outfit_detail_name[row]);
				}
				else{
					switch(row){
					case 0:
						snprintf(content, 200, outfit_detail_css[col], outfit_detail[i][row]);
						break;
					case 1:
						snprintf(content, 200, outfit_detail_css[col], outfit_detail[i][row]);
						break;
					}	// end switch-case
				}
				elm_object_text_set(outfit_detail_label, content);
				elm_table_pack(outfit_detail_table, outfit_detail_label, col, row, 1, 1);
				evas_object_show(outfit_detail_label);
			}
		}
	}
}

void check_daily_outfit_cb(void *data, Evas_Object *obj, void *event_info) {
	// add clothes page main background layout
	Evas_Object *check_daily_outfit_layout = elm_layout_add(main_obj.nf);
	elm_layout_file_set(check_daily_outfit_layout, main_obj.edj_path, "inside_layout");
	elm_naviframe_item_push(main_obj.nf, NULL, NULL, NULL, check_daily_outfit_layout, NULL);
	Elm_Object_Item *main_item = elm_naviframe_top_item_get(main_obj.nf);
	elm_naviframe_item_title_enabled_set(main_item, EINA_FALSE, EINA_FALSE);

	// main layout content box
	Evas_Object *main_content_box = elm_box_add(check_daily_outfit_layout);
	elm_layout_content_set(check_daily_outfit_layout, "elm.swallow.content", main_content_box);
	elm_box_padding_set(main_content_box, 0, 30);
	elm_box_align_set(main_content_box, 0.5, 0);
	evas_object_size_hint_align_set(main_content_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(main_content_box);

	// top menu
	Evas_Object *top_menu_box = elm_box_add(main_content_box);
	elm_box_horizontal_set(top_menu_box, EINA_TRUE);
	elm_box_padding_set(top_menu_box, 20, 0);
	elm_box_pack_end(main_content_box, top_menu_box);
	elm_box_align_set(top_menu_box, 0, 0.5);
	evas_object_size_hint_align_set(top_menu_box, EVAS_HINT_FILL, 0);
	evas_object_show(top_menu_box);

	// top menu - back button
	Evas_Object *back_to_main_btn = elm_button_add(top_menu_box);
	elm_object_style_set(back_to_main_btn, "image_button");
	evas_object_size_hint_min_set(back_to_main_btn, 50, 50);
	Evas_Object *back_img = elm_image_add(back_to_main_btn);
	char *back_img_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "back_button.png", &back_img_path);
	elm_image_file_set(back_img, back_img_path, NULL);
	elm_object_part_content_set(back_to_main_btn, "icon", back_img);
	elm_box_pack_end(top_menu_box, back_to_main_btn);
	evas_object_size_hint_align_set(back_to_main_btn, 0, 0.5);
	evas_object_show(back_to_main_btn);
	evas_object_smart_callback_add(back_to_main_btn, "clicked", back_to_main_cb, NULL);

	Evas_Object *menu_name = elm_label_add(top_menu_box);
	elm_object_text_set(menu_name, "<color=#FFFFFFFF font_size=50 font_weight=BOLD>착용 확인</color>");
	elm_box_pack_end(top_menu_box, menu_name);
	evas_object_show(menu_name);

	// main content tabs box
	Evas_Object *tabs_box = elm_box_add(main_content_box);
	elm_box_horizontal_set(tabs_box, EINA_TRUE);
	elm_box_padding_set(tabs_box, 30, 0);
	evas_object_size_hint_align_set(tabs_box, EVAS_HINT_FILL, 0);
	elm_box_pack_end(main_content_box, tabs_box);
	evas_object_show(tabs_box);

	/*
	 * 	first tab
	 */
	// select person layout
	Evas_Object *select_person_layout = elm_layout_add(tabs_box);
	elm_layout_file_set(select_person_layout, main_obj.edj_path, "tab_wrapper");
	elm_box_pack_end(tabs_box, select_person_layout);
	evas_object_size_hint_min_set(select_person_layout, 0, 760);
	evas_object_show(select_person_layout);
	profile_select_obj.main_wrapper = select_person_layout;

	// select person box
	Evas_Object *select_person_box = elm_box_add(select_person_layout);
	elm_box_padding_set(select_person_box, 0, 15);
	elm_layout_content_set(select_person_layout, "elm.swallow.content", select_person_box);
	elm_box_align_set(select_person_box, 0.5, 0);
	evas_object_show(select_person_box);

	// select person description label
	Evas_Object *select_person_label = elm_label_add(select_person_box);
	elm_box_pack_end(select_person_box, select_person_label);
	evas_object_show(select_person_label);
	profile_select_obj.title = select_person_label;

	Evas_Object *person_list_box = elm_box_add(select_person_box);
	elm_box_padding_set(person_list_box, 70, 15);
	elm_box_pack_end(select_person_box, person_list_box);
	evas_object_size_hint_weight_set(person_list_box, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(person_list_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(person_list_box);
	profile_select_obj.person_list_box = person_list_box;

	// dummy data
	char names[MAX_PROFILE][100] = { "사용자1", "사용자2", "사용자3" };
	char images[MAX_PROFILE][100] = { "profile_img1.png", "profile_img2.png", "profile_img3.png" };

	selectedIndex = -1;
	for(int i = 0; i < MAX_PROFILE; i++){
		Evas_Object *profile_wrapper = elm_layout_add(person_list_box);
		elm_layout_file_set(profile_wrapper, main_obj.edj_path, "profile_wrapper");
		elm_box_pack_end(person_list_box, profile_wrapper);
		profiles[i].number = i;
		profiles[i].selected = 0;
		strncpy(profiles[i].name, names[i], 100);
		profile_select_obj.profile[i].wrapper = profile_wrapper;

		Evas_Object *profile_box = elm_box_add(profile_wrapper);
		elm_box_padding_set(profile_box, 0, 15);
		elm_layout_content_set(profile_wrapper, "elm.swallow.content", profile_box);
		evas_object_show(profile_box);
		profile_select_obj.profile[i].box = profile_box;

		Evas_Object *profile_image = elm_image_add(profile_box);
		char *img_path = NULL;
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, images[i], &img_path);
		evas_object_size_hint_weight_set(profile_image, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
		evas_object_size_hint_align_set(profile_image, EVAS_HINT_FILL, EVAS_HINT_FILL);
		elm_image_file_set(profile_image, img_path, NULL);
		elm_box_pack_end(profile_box, profile_image);
		evas_object_show(profile_image);
		profile_select_obj.profile[i].image = profile_image;

		Evas_Object *profile_label = elm_label_add(profile_box);
		elm_box_pack_end(profile_box, profile_label);
		evas_object_show(profile_label);
		profile_select_obj.profile[i].name = profile_label;
	}

	/*
	 * 	second tab
	 */
	// tag clothes layout
	Evas_Object *tag_clothes_layout = elm_layout_add(tabs_box);
	elm_layout_file_set(tag_clothes_layout, main_obj.edj_path, "tab_wrapper");
	elm_box_pack_end(tabs_box, tag_clothes_layout);
	evas_object_size_hint_min_set(tag_clothes_layout, 0, 760);
	evas_object_show(tag_clothes_layout);
	outfit_check_obj.main_wrapper = tag_clothes_layout;

	// tag clothes box
	Evas_Object *tag_clothes_box = elm_box_add(tag_clothes_layout);
	elm_box_padding_set(tag_clothes_box, 0, 30);
	elm_layout_content_set(tag_clothes_layout, "elm.swallow.content", tag_clothes_box);
	elm_box_align_set(tag_clothes_box, 0.5, 0);
	evas_object_show(tag_clothes_box);
	outfit_check_obj.main_box = tag_clothes_box;

	// tag clothes title label
	Evas_Object *tag_clothes_label = elm_label_add(tag_clothes_box);
	elm_box_pack_end(tag_clothes_box, tag_clothes_label);
	evas_object_show(tag_clothes_label);
	outfit_check_obj.title = tag_clothes_label;

	Evas_Object *layout_description = elm_label_add(tag_clothes_box);
	evas_object_size_hint_weight_set(layout_description, 0, EVAS_HINT_EXPAND);
	evas_object_show(layout_description);
	outfit_check_obj.description = layout_description;

	Evas_Object *tag_content_box = elm_box_add(tag_clothes_box);
	elm_box_padding_set(tag_content_box, 0, 50);
	evas_object_size_hint_weight_set(tag_content_box, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(tag_content_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(tag_content_box);
	outfit_check_obj.data_box = tag_content_box;

	Evas_Object *clothes_list_layout = elm_layout_add(tag_content_box);
	elm_layout_file_set(clothes_list_layout, main_obj.edj_path, "empty_layout");
	evas_object_size_hint_min_set(clothes_list_layout, 1280, 450);
	elm_box_pack_end(tag_content_box, clothes_list_layout);
	evas_object_show(clothes_list_layout);

	Evas_Object *clothes_list_table = elm_table_add(clothes_list_layout);
	elm_table_padding_set(clothes_list_table, 70, 50);
	elm_table_align_set(clothes_list_table, 0, 0);
	elm_layout_content_set(clothes_list_layout, "elm.swallow.content", clothes_list_table);
	evas_object_size_hint_weight_set(clothes_list_table, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(clothes_list_table, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(clothes_list_table);
	outfit_check_obj.clothes_list_table = clothes_list_table;

	for(int i = 0; i < MAX_CLOTHES; i++){
		Evas_Object *clothes_img = elm_layout_add(clothes_list_table);
		elm_layout_file_set(clothes_img, main_obj.edj_path, "add_clothes_image_wrapper");
		evas_object_size_hint_min_set(clothes_img, 200, 200);
		elm_table_pack(clothes_list_table, clothes_img, i % 5, i / 5, 1, 1);
		evas_object_show(clothes_img);
	}

	Evas_Object *submit_button_box = elm_box_add(tag_content_box);
	elm_box_horizontal_set(submit_button_box, EINA_TRUE);
	elm_box_padding_set(submit_button_box, 30, 0);
	elm_box_align_set(submit_button_box, 1, 0.5);
	elm_box_pack_end(tag_content_box, submit_button_box);
	evas_object_size_hint_weight_set(submit_button_box, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(submit_button_box, EVAS_HINT_FILL, 0);
	evas_object_show(submit_button_box);

	Evas_Object *submin_btn = elm_button_add(submit_button_box);
	elm_object_style_set(submin_btn, "text_green_button");
	evas_object_size_hint_min_set(submin_btn, 150, 60);
	elm_object_part_text_set(submin_btn, "default", "등록 완료");
	elm_box_pack_end(submit_button_box, submin_btn);
	evas_object_show(submin_btn);

	check_daily_outfit_select_person_cb(NULL, NULL, NULL);
}

void check_daily_outfit_select_person_cb(void *data, Evas_Object *obj, void *event_info) {
	evas_object_event_callback_del(profile_select_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, check_daily_outfit_select_person_cb);
	evas_object_size_hint_weight_set(profile_select_obj.main_wrapper, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(profile_select_obj.main_wrapper, EVAS_HINT_FILL, 0);
	elm_object_text_set(profile_select_obj.title, "<color=#FFFFFFFF font_size=70>사용자를 선택해주세요</color>");
	elm_box_unpack_all(profile_select_obj.person_list_box);
	elm_box_horizontal_set(profile_select_obj.person_list_box, EINA_TRUE);
	elm_box_align_set(profile_select_obj.person_list_box, 0.5, 0.5);
	for(int i = 0; i < MAX_PROFILE; i++){
		char name_content[200] = { 0, };
		snprintf(name_content, 200, "<color font_size=35>%s</color>", profiles[i].name);
		elm_object_text_set(profile_select_obj.profile[i].name, name_content);
		evas_object_event_callback_add(profile_select_obj.profile[i].wrapper, EVAS_CALLBACK_MOUSE_UP, check_daily_outfit_select_profile_cb, (void*)&profiles[i]);

		evas_object_size_hint_min_set(profile_select_obj.profile[i].image, 250, 250);
		elm_box_pack_end(profile_select_obj.person_list_box, profile_select_obj.profile[i].wrapper);
		evas_object_show(profile_select_obj.profile[i].wrapper);
		elm_box_recalculate(profile_select_obj.profile[i].box);
	}

	evas_object_size_hint_weight_set(outfit_check_obj.main_wrapper, 0, 0);
	evas_object_size_hint_align_set(outfit_check_obj.main_wrapper, 0, 0);
	evas_object_size_hint_min_set(outfit_check_obj.main_wrapper, 300, 760);
	elm_object_text_set(outfit_check_obj.title, "<color=#FFFFFFFF font_size=40 align=center>RFID<br>태그</color>");

	evas_object_hide(outfit_check_obj.data_box);
	elm_box_unpack_all(outfit_check_obj.main_box);
	elm_box_pack_end(outfit_check_obj.main_box, outfit_check_obj.title);
	if(selectedIndex < 0){
		elm_object_text_set(outfit_check_obj.description, "<color=#FFFFFFFF font_size=50 align=center>사용자가<br>선택되지<br>않았습니다</color>");
	}
	else{
		evas_object_event_callback_add(outfit_check_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, check_daily_outfit_check_outfit_cb, NULL);
		elm_object_text_set(outfit_check_obj.description, "<color=#6390D6FF font_size=40 align=center>등록<br>가능</color>");
	}
	elm_box_pack_end(outfit_check_obj.main_box, outfit_check_obj.description);
	evas_object_show(outfit_check_obj.description);
}

void check_daily_outfit_select_profile_cb(void *data, Evas_Object *obj, void *event_info) {
	ProfileData *cur = (ProfileData*)data;
	if(selectedIndex < 0){
		cur->selected = 1;
		selectedIndex = cur->number;
		edje_object_signal_emit(profile_select_obj.profile[cur->number].wrapper, "select", "*");
		evas_object_event_callback_add(outfit_check_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, check_daily_outfit_check_outfit_cb, NULL);
		elm_object_text_set(outfit_check_obj.description, "<color=#6390D6FF font_size=40 align=center>등록<br>가능</color>");
	}
	else if(selectedIndex == cur->number){
		cur->selected = 0;
		selectedIndex = -1;
		edje_object_signal_emit(profile_select_obj.profile[cur->number].wrapper, "select", "*");
		evas_object_event_callback_del(outfit_check_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, check_daily_outfit_check_outfit_cb);
		elm_object_text_set(outfit_check_obj.description, "<color=#FFFFFFFF font_size=50 align=center>사용자가<br>선택되지<br>않았습니다</color>");
	}
	else{
		profiles[selectedIndex].selected = 0;
		edje_object_signal_emit(profile_select_obj.profile[selectedIndex].wrapper, "select", "*");

		cur->selected = 1;
		selectedIndex = cur->number;
		edje_object_signal_emit(profile_select_obj.profile[cur->number].wrapper, "select", "*");
	}
}

void check_daily_outfit_check_outfit_cb(void *data, Evas_Object *obj, void *event_info) {
	evas_object_event_callback_add(profile_select_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, check_daily_outfit_select_person_cb, NULL);
	evas_object_size_hint_weight_set(profile_select_obj.main_wrapper, 0, 0);
	evas_object_size_hint_align_set(profile_select_obj.main_wrapper, 0, 0);
	evas_object_size_hint_min_set(profile_select_obj.main_wrapper, 200, 760);
	elm_object_text_set(profile_select_obj.title, "<color=#FFFFFFFF font_size=40 align=center>사용자<br>선택</color>");
	elm_box_unpack_all(profile_select_obj.person_list_box);
	elm_box_horizontal_set(profile_select_obj.person_list_box, EINA_FALSE);
	elm_box_align_set(profile_select_obj.person_list_box, 0.5, 0);
	for(int i = 0; i < MAX_PROFILE; i++){
		evas_object_event_callback_del(profile_select_obj.profile[i].wrapper, EVAS_CALLBACK_MOUSE_UP, check_daily_outfit_select_profile_cb);
		if(!profiles[i].selected){
			evas_object_hide(profile_select_obj.profile[i].wrapper);
		}
		else{
			char name_content[200] = { 0, };
			snprintf(name_content, 200, "<color font_size=20>%s</color>", profiles[i].name);
			elm_object_text_set(profile_select_obj.profile[i].name, name_content);
			evas_object_size_hint_min_set(profile_select_obj.profile[i].image, 75, 75);
			elm_box_pack_end(profile_select_obj.person_list_box, profile_select_obj.profile[i].wrapper);
			evas_object_show(profile_select_obj.profile[i].wrapper);
			elm_box_recalculate(profile_select_obj.profile[i].box);
		}
	}

	evas_object_event_callback_del(outfit_check_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, check_daily_outfit_check_outfit_cb);
	evas_object_size_hint_weight_set(outfit_check_obj.main_wrapper, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(outfit_check_obj.main_wrapper, EVAS_HINT_FILL, 0);
	elm_object_text_set(outfit_check_obj.title, "<color=#FFFFFFFF font_size=70>옷의 RFID를 태그해주세요</color>");

	evas_object_hide(outfit_check_obj.description);
	elm_box_unpack_all(outfit_check_obj.main_box);
	elm_box_pack_end(outfit_check_obj.main_box, outfit_check_obj.title);
	elm_box_pack_end(outfit_check_obj.main_box, outfit_check_obj.data_box);
	evas_object_show(outfit_check_obj.data_box);
}

void add_clothes_cb(void *data, Evas_Object *obj, void *event_info) {
	// add clothes page main background layout
	Evas_Object *add_clothes_layout = elm_layout_add(main_obj.nf);
	elm_layout_file_set(add_clothes_layout, main_obj.edj_path, "inside_layout");
	elm_naviframe_item_push(main_obj.nf, NULL, NULL, NULL, add_clothes_layout, NULL);
	Elm_Object_Item *main_item = elm_naviframe_top_item_get(main_obj.nf);
	elm_naviframe_item_title_enabled_set(main_item, EINA_FALSE, EINA_FALSE);

	// main layout content box
	Evas_Object *main_content_box = elm_box_add(add_clothes_layout);
	elm_layout_content_set(add_clothes_layout, "elm.swallow.content", main_content_box);
	elm_box_padding_set(main_content_box, 0, 30);
	elm_box_align_set(main_content_box, 0.5, 0);
	evas_object_size_hint_align_set(main_content_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(main_content_box);

	// top menu
	Evas_Object *top_menu_box = elm_box_add(main_content_box);
	elm_box_horizontal_set(top_menu_box, EINA_TRUE);
	elm_box_padding_set(top_menu_box, 20, 0);
	elm_box_pack_end(main_content_box, top_menu_box);
	elm_box_align_set(top_menu_box, 0, 0.5);
	evas_object_size_hint_align_set(top_menu_box, EVAS_HINT_FILL, 0);
	evas_object_show(top_menu_box);

	// top menu - back button
	Evas_Object *back_to_main_btn = elm_button_add(top_menu_box);
	elm_object_style_set(back_to_main_btn, "image_button");
	evas_object_size_hint_min_set(back_to_main_btn, 50, 50);
	Evas_Object *back_img = elm_image_add(back_to_main_btn);
	char *back_img_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "back_button.png", &back_img_path);
	elm_image_file_set(back_img, back_img_path, NULL);
	elm_object_part_content_set(back_to_main_btn, "icon", back_img);
	elm_box_pack_end(top_menu_box, back_to_main_btn);
	evas_object_size_hint_align_set(back_to_main_btn, 0, 0.5);
	evas_object_show(back_to_main_btn);
	evas_object_smart_callback_add(back_to_main_btn, "clicked", back_to_main_cb, NULL);

	Evas_Object *menu_name = elm_label_add(top_menu_box);
	elm_object_text_set(menu_name, "<color=#FFFFFFFF font_size=50 font_weight=BOLD>옷 등록</color>");
	elm_box_pack_end(top_menu_box, menu_name);
	evas_object_show(menu_name);

	// main content tabs box
	Evas_Object *tabs_box = elm_box_add(main_content_box);
	elm_box_horizontal_set(tabs_box, EINA_TRUE);
	elm_box_padding_set(tabs_box, 30, 0);
	evas_object_size_hint_align_set(tabs_box, EVAS_HINT_FILL, 0);
	elm_box_pack_end(main_content_box, tabs_box);
	evas_object_show(tabs_box);

	/*
	 * 	first tab
	 */
	// select person layout
	Evas_Object *select_person_layout = elm_layout_add(tabs_box);
	elm_layout_file_set(select_person_layout, main_obj.edj_path, "tab_wrapper");
	elm_box_pack_end(tabs_box, select_person_layout);
	evas_object_size_hint_min_set(select_person_layout, 0, 760);
	evas_object_show(select_person_layout);
	profile_select_obj.main_wrapper = select_person_layout;

	// select person box
	Evas_Object *select_person_box = elm_box_add(select_person_layout);
	elm_box_padding_set(select_person_box, 0, 15);
	elm_layout_content_set(select_person_layout, "elm.swallow.content", select_person_box);
	elm_box_align_set(select_person_box, 0.5, 0);
	evas_object_show(select_person_box);

	// select person description label
	Evas_Object *select_person_label = elm_label_add(select_person_box);
	elm_box_pack_end(select_person_box, select_person_label);
	evas_object_show(select_person_label);
	profile_select_obj.title = select_person_label;

	Evas_Object *person_list_box = elm_box_add(select_person_box);
	elm_box_padding_set(person_list_box, 70, 15);
	elm_box_pack_end(select_person_box, person_list_box);
	evas_object_size_hint_weight_set(person_list_box, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(person_list_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(person_list_box);
	profile_select_obj.person_list_box = person_list_box;

	// dummy data
	char names[MAX_PROFILE][100] = { "사용자1", "사용자2", "사용자3" };
	char images[MAX_PROFILE][100] = { "profile_img1.png", "profile_img2.png", "profile_img3.png" };

	selectProfileCount = 0;
	for(int i = 0; i < MAX_PROFILE; i++){
		Evas_Object *profile_wrapper = elm_layout_add(person_list_box);
		elm_layout_file_set(profile_wrapper, main_obj.edj_path, "profile_wrapper");
		elm_box_pack_end(person_list_box, profile_wrapper);
		profiles[i].number = i;
		profiles[i].selected = 0;
		strncpy(profiles[i].name, names[i], 100);
		profile_select_obj.profile[i].wrapper = profile_wrapper;

		Evas_Object *profile_box = elm_box_add(profile_wrapper);
		elm_box_padding_set(profile_box, 0, 15);
		elm_layout_content_set(profile_wrapper, "elm.swallow.content", profile_box);
		evas_object_show(profile_box);
		profile_select_obj.profile[i].box = profile_box;

		Evas_Object *profile_image = elm_image_add(profile_box);
		char *img_path = NULL;
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, images[i], &img_path);
		evas_object_size_hint_weight_set(profile_image, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
		evas_object_size_hint_align_set(profile_image, EVAS_HINT_FILL, EVAS_HINT_FILL);
		elm_image_file_set(profile_image, img_path, NULL);
		elm_box_pack_end(profile_box, profile_image);
		evas_object_show(profile_image);
		profile_select_obj.profile[i].image = profile_image;

		Evas_Object *profile_label = elm_label_add(profile_box);
		elm_box_pack_end(profile_box, profile_label);
		evas_object_show(profile_label);
		profile_select_obj.profile[i].name = profile_label;
	}

	/*
	 * 	second tab
	 */
	// tag clothes layout
	Evas_Object *tag_clothes_layout = elm_layout_add(tabs_box);
	elm_layout_file_set(tag_clothes_layout, main_obj.edj_path, "tab_wrapper");
	elm_box_pack_end(tabs_box, tag_clothes_layout);
	evas_object_size_hint_min_set(tag_clothes_layout, 0, 760);
	evas_object_show(tag_clothes_layout);
	clothes_register_obj.main_wrapper = tag_clothes_layout;

	// tag clothes box
	Evas_Object *tag_clothes_box = elm_box_add(tag_clothes_layout);
	elm_box_padding_set(tag_clothes_box, 0, 30);
	elm_layout_content_set(tag_clothes_layout, "elm.swallow.content", tag_clothes_box);
	elm_box_align_set(tag_clothes_box, 0.5, 0);
	evas_object_show(tag_clothes_box);
	clothes_register_obj.main_box = tag_clothes_box;

	// tag clothes title label
	Evas_Object *tag_clothes_label = elm_label_add(tag_clothes_box);
	elm_box_pack_end(tag_clothes_box, tag_clothes_label);
	evas_object_show(tag_clothes_label);
	clothes_register_obj.title = tag_clothes_label;

	Evas_Object *layout_description = elm_label_add(tag_clothes_box);
	evas_object_size_hint_weight_set(layout_description, 0, EVAS_HINT_EXPAND);
	evas_object_show(layout_description);
	clothes_register_obj.description = layout_description;

	// tag clothes layout for hide
	Evas_Object *tag_content_layout = elm_layout_add(tag_clothes_box);
	elm_layout_file_set(tag_content_layout, main_obj.edj_path, "empty_layout");
	evas_object_size_hint_weight_set(tag_content_layout, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(tag_content_layout, EVAS_HINT_FILL, EVAS_HINT_FILL);
	elm_box_pack_end(tag_clothes_box, tag_content_layout);
	clothes_register_obj.data_layout = tag_content_layout;

	Evas_Object *tag_content_box = elm_box_add(tag_content_layout);
	elm_box_padding_set(tag_content_box, 0, 30);
	elm_layout_content_set(tag_content_layout, "elm.swallow.content", tag_content_box);
	elm_box_align_set(tag_content_box, 0.5, 0);
	evas_object_show(tag_content_box);

	Evas_Object *clothes_info_box = elm_box_add(tag_content_box);
	elm_box_horizontal_set(clothes_info_box, EINA_TRUE);
	elm_box_padding_set(clothes_info_box, 200, 0);
	elm_box_pack_end(tag_content_box, clothes_info_box);
	evas_object_size_hint_weight_set(clothes_info_box, EVAS_HINT_EXPAND, 0.9);
	evas_object_show(clothes_info_box);

	Evas_Object *clothes_image_box = elm_box_add(clothes_info_box);
	elm_box_padding_set(clothes_image_box, 0, 30);
	elm_box_pack_end(clothes_info_box, clothes_image_box);
	evas_object_show(clothes_image_box);

	Evas_Object *clothes_img = elm_layout_add(clothes_image_box);
	elm_layout_file_set(clothes_img, main_obj.edj_path, "add_clothes_image_wrapper");
	elm_box_pack_end(clothes_image_box, clothes_img);
	evas_object_size_hint_min_set(clothes_img, 300, 300);
	evas_object_show(clothes_img);

	Evas_Object *clothes_img_btn = elm_button_add(clothes_image_box);
	elm_object_style_set(clothes_img_btn, "text_gray_button");
	evas_object_size_hint_min_set(clothes_img_btn, 150, 60);
	elm_object_part_text_set(clothes_img_btn, "default", "사진 촬영");
	elm_box_pack_end(clothes_image_box, clothes_img_btn);
	evas_object_show(clothes_img_btn);

	Evas_Object *clothes_desc_box = elm_box_add(clothes_info_box);
	elm_box_padding_set(clothes_desc_box, 0, 80);
	elm_box_pack_end(clothes_info_box, clothes_desc_box);
	evas_object_show(clothes_desc_box);

	Evas_Object *clothes_category = elm_layout_add(clothes_desc_box);
	elm_layout_file_set(clothes_category, main_obj.edj_path, "add_clothes_image_wrapper");
	elm_box_pack_end(clothes_desc_box, clothes_category);
	evas_object_size_hint_min_set(clothes_category, 600, 100);
	evas_object_show(clothes_category);

	Evas_Object *clothes_texture = elm_layout_add(clothes_desc_box);
	elm_layout_file_set(clothes_texture, main_obj.edj_path, "add_clothes_image_wrapper");
	elm_box_pack_end(clothes_desc_box, clothes_texture);
	evas_object_size_hint_min_set(clothes_texture, 600, 100);
	evas_object_show(clothes_texture);

	Evas_Object *submit_button_box = elm_box_add(tag_content_box);
	elm_box_horizontal_set(submit_button_box, EINA_TRUE);
	elm_box_padding_set(submit_button_box, 30, 0);
	elm_box_align_set(submit_button_box, 1, 0.5);
	elm_box_pack_end(tag_content_box, submit_button_box);
	evas_object_size_hint_weight_set(submit_button_box, EVAS_HINT_EXPAND, 0.1);
	evas_object_size_hint_align_set(submit_button_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(submit_button_box);

	Evas_Object *extra_submit_btn = elm_button_add(submit_button_box);
	elm_object_style_set(extra_submit_btn, "text_green_button");
	evas_object_size_hint_min_set(extra_submit_btn, 150, 60);
	elm_object_part_text_set(extra_submit_btn, "default", "추가 등록");
	elm_box_pack_end(submit_button_box, extra_submit_btn);
	evas_object_show(extra_submit_btn);

	Evas_Object *submin_btn = elm_button_add(submit_button_box);
	elm_object_style_set(submin_btn, "text_green_button");
	evas_object_size_hint_min_set(submin_btn, 150, 60);
	elm_object_part_text_set(submin_btn, "default", "등록 완료");
	elm_box_pack_end(submit_button_box, submin_btn);
	evas_object_show(submin_btn);

	add_clothes_select_person_cb(NULL, NULL, NULL);
}

void add_clothes_select_person_cb(void *data, Evas_Object *obj, void *event_info) {
	evas_object_event_callback_del(profile_select_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_select_person_cb);
	evas_object_size_hint_weight_set(profile_select_obj.main_wrapper, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(profile_select_obj.main_wrapper, EVAS_HINT_FILL, 0);
	elm_object_text_set(profile_select_obj.title, "<color=#FFFFFFFF font_size=70>사용자를 선택해주세요</color>");
	elm_box_unpack_all(profile_select_obj.person_list_box);
	elm_box_horizontal_set(profile_select_obj.person_list_box, EINA_TRUE);
	elm_box_align_set(profile_select_obj.person_list_box, 0.5, 0.5);
	for(int i = 0; i < MAX_PROFILE; i++){
		char name_content[200] = { 0, };
		snprintf(name_content, 200, "<color font_size=35>%s</color>", profiles[i].name);
		elm_object_text_set(profile_select_obj.profile[i].name, name_content);
		evas_object_event_callback_add(profile_select_obj.profile[i].wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_select_profile_cb, (void*)&profiles[i]);

		evas_object_size_hint_min_set(profile_select_obj.profile[i].image, 250, 250);
		elm_box_pack_end(profile_select_obj.person_list_box, profile_select_obj.profile[i].wrapper);
		evas_object_show(profile_select_obj.profile[i].wrapper);
		elm_box_recalculate(profile_select_obj.profile[i].box);
	}

	evas_object_size_hint_weight_set(clothes_register_obj.main_wrapper, 0, 0);
	evas_object_size_hint_align_set(clothes_register_obj.main_wrapper, 0, 0);
	evas_object_size_hint_min_set(clothes_register_obj.main_wrapper, 300, 760);
	elm_object_text_set(clothes_register_obj.title, "<color=#FFFFFFFF font_size=40 align=center>RFID<br>태그</color>");

	evas_object_hide(clothes_register_obj.data_layout);
	elm_box_unpack_all(clothes_register_obj.main_box);
	elm_box_pack_end(clothes_register_obj.main_box, clothes_register_obj.title);
	if(selectProfileCount == 0){
		elm_object_text_set(clothes_register_obj.description, "<color=#FFFFFFFF font_size=50 align=center>사용자가<br>선택되지<br>않았습니다</color>");
	}
	else{
		evas_object_event_callback_add(clothes_register_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_register_clothes_cb, NULL);
		elm_object_text_set(clothes_register_obj.description, "<color=#6390D6FF font_size=40 align=center>등록<br>가능</color>");
	}
	elm_box_pack_end(clothes_register_obj.main_box, clothes_register_obj.description);
	evas_object_show(clothes_register_obj.description);
}

void add_clothes_select_profile_cb(void *data, Evas_Object *obj, void *event_info) {
	ProfileData *cur = (ProfileData*)data;
	if(cur->selected){
		selectProfileCount--;
		cur->selected = 0;

		if(selectProfileCount == 0){
			evas_object_event_callback_del(clothes_register_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_register_clothes_cb);
			elm_object_text_set(clothes_register_obj.description, "<color=#FFFFFFFF font_size=50 align=center>사용자가<br>선택되지<br>않았습니다</color>");
		}
	}
	else{
		if(selectProfileCount == 0){
			evas_object_event_callback_add(clothes_register_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_register_clothes_cb, NULL);
			elm_object_text_set(clothes_register_obj.description, "<color=#6390D6FF font_size=40 align=center>등록<br>가능</color>");
		}

		selectProfileCount++;
		cur->selected = 1;
	}
	edje_object_signal_emit(profile_select_obj.profile[cur->number].wrapper, "select", "*");
}

void add_clothes_register_clothes_cb(void *data, Evas_Object *obj, void *event_info) {
	evas_object_event_callback_add(profile_select_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_select_person_cb, NULL);
	evas_object_size_hint_weight_set(profile_select_obj.main_wrapper, 0, 0);
	evas_object_size_hint_align_set(profile_select_obj.main_wrapper, 0, 0);
	evas_object_size_hint_min_set(profile_select_obj.main_wrapper, 200, 760);
	elm_object_text_set(profile_select_obj.title, "<color=#FFFFFFFF font_size=40 align=center>사용자<br>선택</color>");
	elm_box_unpack_all(profile_select_obj.person_list_box);
	elm_box_horizontal_set(profile_select_obj.person_list_box, EINA_FALSE);
	elm_box_align_set(profile_select_obj.person_list_box, 0.5, 0);
	for(int i = 0; i < MAX_PROFILE; i++){
		evas_object_event_callback_del(profile_select_obj.profile[i].wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_select_profile_cb);
		if(!profiles[i].selected){
			evas_object_hide(profile_select_obj.profile[i].wrapper);
		}
		else{
			char name_content[200] = { 0, };
			snprintf(name_content, 200, "<color font_size=20>%s</color>", profiles[i].name);
			elm_object_text_set(profile_select_obj.profile[i].name, name_content);
			evas_object_size_hint_min_set(profile_select_obj.profile[i].image, 75, 75);
			elm_box_pack_end(profile_select_obj.person_list_box, profile_select_obj.profile[i].wrapper);
			evas_object_show(profile_select_obj.profile[i].wrapper);
			elm_box_recalculate(profile_select_obj.profile[i].box);
		}
	}

	evas_object_event_callback_del(clothes_register_obj.main_wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_register_clothes_cb);
	evas_object_size_hint_weight_set(clothes_register_obj.main_wrapper, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(clothes_register_obj.main_wrapper, EVAS_HINT_FILL, 0);
	elm_object_text_set(clothes_register_obj.title, "<color=#FFFFFFFF font_size=70>옷의 RFID를 태그해주세요</color>");

	evas_object_hide(clothes_register_obj.description);
	elm_box_unpack_all(clothes_register_obj.main_box);
	elm_box_pack_end(clothes_register_obj.main_box, clothes_register_obj.title);
	elm_box_pack_end(clothes_register_obj.main_box, clothes_register_obj.data_layout);
	evas_object_show(clothes_register_obj.data_layout);
}

static void
create_base_gui(appdata_s *ad)
{
	/* Window */
	/* Create and initialize elm_win.
	   elm_win is mandatory to manipulate window. */
	ad->win = elm_win_util_standard_add(PACKAGE, PACKAGE);
	elm_win_autodel_set(ad->win, EINA_TRUE);

	if (elm_win_wm_rotation_supported_get(ad->win)) {
		int rots[4] = { 0, 90, 180, 270 };
		elm_win_wm_rotation_available_rotations_set(ad->win, (const int *)(&rots), 4);
	}

	evas_object_smart_callback_add(ad->win, "delete,request", win_delete_request_cb, NULL);
	eext_object_event_callback_add(ad->win, EEXT_CALLBACK_BACK, win_back_cb, ad);

	/* Conformant */
	/* Create and initialize elm_conformant.
	   elm_conformant is mandatory for base gui to have proper size
	   when indicator or virtual keypad is visible. */
	ad->conform = elm_conformant_add(ad->win);
	elm_win_indicator_mode_set(ad->win, ELM_WIN_INDICATOR_HIDE);
	evas_object_size_hint_weight_set(ad->conform, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	elm_win_resize_object_add(ad->win, ad->conform);
	evas_object_show(ad->conform);

	// get edc resource
	char *edj_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_LAYOUT, "edje_res/airdresser.edj", &edj_path);
	elm_theme_extension_add(NULL, edj_path);
	main_obj.edj_path = edj_path;

	// naviframe
	Evas_Object *nf = elm_naviframe_add(ad->conform);
	elm_object_content_set(ad->conform, nf);
	evas_object_show(nf);
	main_obj.nf = nf;

	// default background layout
	Evas_Object *main_layout = elm_layout_add(nf);
	elm_layout_file_set(main_layout, edj_path, "main_layout");
	elm_naviframe_item_push(nf, NULL, NULL, NULL, main_layout, NULL);
	Elm_Object_Item *main_item = elm_naviframe_top_item_get(nf);
	elm_naviframe_item_title_enabled_set(main_item, EINA_FALSE, EINA_FALSE);

	Evas_Object *menu_scroller = elm_scroller_add(main_layout);
	elm_layout_content_set(main_layout, "elm.swallow.content", menu_scroller);
	evas_object_show(menu_scroller);

	Evas_Object *menu_box = elm_box_add(menu_scroller);
	elm_box_horizontal_set(menu_box, EINA_TRUE);
	elm_box_padding_set(menu_box, 100, 0);
	evas_object_size_hint_weight_set(menu_box, 0, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(menu_box, 0, EVAS_HINT_FILL);
	elm_layout_content_set(menu_scroller, "elm.swallow.content", menu_box);
	elm_box_align_set(menu_box, 0, 0.5);
	evas_object_show(menu_box);

	/*
	 * 	course menu
	 */
	Evas_Object *course_menu_box_wrapper = elm_layout_add(menu_box);
	elm_layout_file_set(course_menu_box_wrapper, edj_path, "main_menu_wrapper");
	evas_object_size_hint_weight_set(course_menu_box_wrapper, 0, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(course_menu_box_wrapper, 0, EVAS_HINT_FILL);
	evas_object_size_hint_min_set(course_menu_box_wrapper, 750, 0);
	elm_box_pack_end(menu_box, course_menu_box_wrapper);
	evas_object_show(course_menu_box_wrapper);

	Evas_Object *course_menu_box = elm_box_add(course_menu_box_wrapper);
	elm_box_padding_set(course_menu_box, 0, 25);
	elm_box_align_set(course_menu_box, 0.5, 0);
	evas_object_size_hint_weight_set(course_menu_box, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(course_menu_box, EVAS_HINT_FILL, 0);
	elm_layout_content_set(course_menu_box_wrapper, "elm.swallow.content", course_menu_box);
	evas_object_show(course_menu_box);

	Evas_Object *course_menu_top_menu = elm_box_add(course_menu_box);
	evas_object_size_hint_weight_set(course_menu_top_menu, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(course_menu_top_menu, EVAS_HINT_FILL, 0);
	elm_box_horizontal_set(course_menu_top_menu, EINA_TRUE);
	elm_box_pack_end(course_menu_box, course_menu_top_menu);
	evas_object_show(course_menu_top_menu);

	Evas_Object *course_menu_top_menu_label = elm_label_add(course_menu_top_menu);
	elm_object_text_set(course_menu_top_menu_label, "<color=#ABABABFF font_size=55 font_weight=BOLD>코스</color>");
	elm_box_pack_end(course_menu_top_menu, course_menu_top_menu_label);
	evas_object_show(course_menu_top_menu_label);

	Evas_Object *course_menu_top_menu_empty = elm_layout_add(course_menu_top_menu);
	evas_object_size_hint_weight_set(course_menu_top_menu_empty, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(course_menu_top_menu_empty, EVAS_HINT_FILL, 0);
	elm_box_pack_end(course_menu_top_menu, course_menu_top_menu_empty);
	evas_object_show(course_menu_top_menu_empty);

	Evas_Object *course_menu_top_menu_expand_btn = elm_button_add(course_menu_top_menu);
	elm_object_style_set(course_menu_top_menu_expand_btn, "image_button");
	evas_object_size_hint_min_set(course_menu_top_menu_expand_btn, 80, 80);
	elm_box_pack_end(course_menu_top_menu, course_menu_top_menu_expand_btn);
	evas_object_show(course_menu_top_menu_expand_btn);

	char *course_expand_img_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "expand.png", &course_expand_img_path);
	Evas_Object *course_expand_btn_img = elm_image_add(course_menu_top_menu_expand_btn);
	elm_image_file_set(course_expand_btn_img, course_expand_img_path, NULL);
	elm_object_part_content_set(course_menu_top_menu_expand_btn, "icon", course_expand_btn_img);

	Evas_Object *course_list_box = elm_box_add(course_menu_box);
	evas_object_size_hint_weight_set(course_list_box, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(course_list_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	elm_box_horizontal_set(course_list_box, EINA_TRUE);
	elm_box_padding_set(course_list_box, 50, 0);
	elm_box_pack_end(course_menu_box, course_list_box);
	evas_object_show(course_list_box);

	char course_img_names[2][100] = { "course_ai.png", "course_standard.png" };
	char course_names[2][100] = { "RFID 태그", "표준" };
	char course_css[100] = "<color=#CFCFCF font_size=45 font_weight=BOLD>%s</color>";

	for(int i = 0; i < 2; i++){
		// course wrapper
		Evas_Object *course_wrapper = elm_layout_add(course_list_box);
		evas_object_size_hint_weight_set(course_wrapper, 0, EVAS_HINT_EXPAND);
		evas_object_size_hint_align_set(course_wrapper, 0, EVAS_HINT_FILL);
		evas_object_size_hint_min_set(course_wrapper, 300, 0);
		elm_layout_file_set(course_wrapper, edj_path, "course_wrapper");
		elm_box_pack_end(course_list_box, course_wrapper);
		evas_object_show(course_wrapper);

		// course box
		Evas_Object *course = elm_box_add(course_wrapper);
		elm_box_align_set(course, 0.5, 0);
		elm_box_padding_set(course, 0, 20);
		elm_layout_content_set(course_wrapper, "elm.swallow.content", course);
		evas_object_show(course);

		// course image wrapper
		Evas_Object *course_image_wrapper = elm_layout_add(course);
		elm_layout_file_set(course_image_wrapper, edj_path, "course_image_wrapper");
		elm_box_pack_end(course, course_image_wrapper);
		evas_object_size_hint_align_set(course_image_wrapper, 0, 0.5);
		evas_object_show(course_image_wrapper);

		// course image
		char *course_img_path = NULL;
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, course_img_names[i], &course_img_path);
		Evas_Object *course_image = elm_image_add(course_image_wrapper);
		evas_object_size_hint_min_set(course_image, 60, 60);
		evas_object_size_hint_max_set(course_image, 60, 60);
		elm_image_file_set(course_image, course_img_path, NULL);
		elm_layout_content_set(course_image_wrapper, "elm.swallow.content", course_image);
		evas_object_show(course_image);

		// course name
		Evas_Object *course_label = elm_label_add(course);
		evas_object_size_hint_align_set(course_label, 0, 0.5);
		char content[200];
		snprintf(content, 200, course_css, course_names[i]);
		elm_object_text_set(course_label, content);
		elm_box_pack_end(course, course_label);
		evas_object_show(course_label);
	}

	/*
	 * 	outfit menu
	 */
	Evas_Object *outfit_menu_box_wrapper = elm_layout_add(menu_box);
	elm_layout_file_set(outfit_menu_box_wrapper, edj_path, "main_menu_wrapper");
	evas_object_size_hint_weight_set(outfit_menu_box_wrapper, 0, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(outfit_menu_box_wrapper, 0, EVAS_HINT_FILL);
	evas_object_size_hint_min_set(outfit_menu_box_wrapper, 750, 0);
	elm_box_pack_end(menu_box, outfit_menu_box_wrapper);
	evas_object_show(outfit_menu_box_wrapper);

	Evas_Object *outfit_menu_box = elm_box_add(outfit_menu_box_wrapper);
	elm_box_padding_set(outfit_menu_box, 0, 25);
	elm_box_align_set(outfit_menu_box, 0.5, 0);
	evas_object_size_hint_weight_set(outfit_menu_box, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(outfit_menu_box, EVAS_HINT_FILL, 0);
	elm_layout_content_set(outfit_menu_box_wrapper, "elm.swallow.content", outfit_menu_box);
	evas_object_show(outfit_menu_box);

	Evas_Object *outfit_menu_top_menu = elm_box_add(outfit_menu_box);
	elm_box_padding_set(outfit_menu_top_menu, 15, 0);
	evas_object_size_hint_weight_set(outfit_menu_top_menu, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(outfit_menu_top_menu, EVAS_HINT_FILL, 0);
	elm_box_horizontal_set(outfit_menu_top_menu, EINA_TRUE);
	elm_box_pack_end(outfit_menu_box, outfit_menu_top_menu);
	evas_object_show(outfit_menu_top_menu);

	Evas_Object *outfit_menu_top_menu_label = elm_label_add(outfit_menu_top_menu);
	elm_object_text_set(outfit_menu_top_menu_label, "<color=#ABABABFF font_size=55 font_weight=BOLD>코디</color>");
	elm_box_pack_end(outfit_menu_top_menu, outfit_menu_top_menu_label);
	evas_object_show(outfit_menu_top_menu_label);

	Evas_Object *outfit_menu_top_menu_empty = elm_layout_add(outfit_menu_top_menu);
	evas_object_size_hint_weight_set(outfit_menu_top_menu_empty, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(outfit_menu_top_menu_empty, EVAS_HINT_FILL, 0);
	elm_box_pack_end(outfit_menu_top_menu, outfit_menu_top_menu_empty);
	evas_object_show(outfit_menu_top_menu_empty);

	Evas_Object *check_daily_outfit_btn = elm_button_add(outfit_menu_top_menu);
	elm_object_style_set(check_daily_outfit_btn, "text_button");
	evas_object_size_hint_min_set(check_daily_outfit_btn, 140, 60);
	elm_object_text_set(check_daily_outfit_btn, "착용확인");
	elm_box_pack_end(outfit_menu_top_menu, check_daily_outfit_btn);
	evas_object_show(check_daily_outfit_btn);
	evas_object_smart_callback_add(check_daily_outfit_btn, "clicked", check_daily_outfit_cb, NULL);

	Evas_Object *add_clothes_btn = elm_button_add(outfit_menu_top_menu);
	elm_object_style_set(add_clothes_btn, "text_button");
	evas_object_size_hint_min_set(add_clothes_btn, 120, 60);
	elm_object_text_set(add_clothes_btn, "옷 등록");
	elm_box_pack_end(outfit_menu_top_menu, add_clothes_btn);
	evas_object_show(add_clothes_btn);
	evas_object_smart_callback_add(add_clothes_btn, "clicked", add_clothes_cb, NULL);

	Evas_Object *outfit_menu_top_menu_expand_btn = elm_button_add(outfit_menu_top_menu);
	elm_object_style_set(outfit_menu_top_menu_expand_btn, "image_button");
	evas_object_size_hint_min_set(outfit_menu_top_menu_expand_btn, 80, 80);
	elm_box_pack_end(outfit_menu_top_menu, outfit_menu_top_menu_expand_btn);
	evas_object_show(outfit_menu_top_menu_expand_btn);
	// button image
	char *outfit_expand_img_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "expand.png", &outfit_expand_img_path);
	Evas_Object *outfit_expand_btn_img = elm_image_add(outfit_menu_top_menu_expand_btn);
	elm_image_file_set(outfit_expand_btn_img, outfit_expand_img_path, NULL);
	elm_object_part_content_set(outfit_menu_top_menu_expand_btn, "icon", outfit_expand_btn_img);
	evas_object_smart_callback_add(outfit_menu_top_menu_expand_btn, "clicked", outfit_expand_cb, NULL);

	Evas_Object *outfit_list_box = elm_box_add(outfit_menu_box);
	evas_object_size_hint_weight_set(outfit_list_box, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(outfit_list_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	elm_box_horizontal_set(outfit_list_box, EINA_TRUE);
	elm_box_padding_set(outfit_list_box, 50, 0);
	elm_box_pack_end(outfit_menu_box, outfit_list_box);
	evas_object_show(outfit_list_box);

	// dummy data
	char outfit_image_paths[2][100] = { "outfit1.png", "outfit2.png" };
	char outfit_detail_name[2][100] = { "일정", "사용자" };
	char outfit_detail[2][2][100] = {
			{ "4/21", "사용자1" },
			{ "4/23", "사용자2" }
	};
	char outfit_detail_css[2][100] = {
			"<color=#A5A5A5FF font_size=27>%s</color>",
			"<color=#EFEFEFFF font_size=32>%s</color>"
	};

	for(int i = 0; i < 2; i++){
		// outfit wrapper
		Evas_Object *outfit_wrapper = elm_layout_add(outfit_list_box);
		evas_object_size_hint_weight_set(outfit_wrapper, 0, EVAS_HINT_EXPAND);
		evas_object_size_hint_align_set(outfit_wrapper, 0, EVAS_HINT_FILL);
		evas_object_size_hint_min_set(outfit_wrapper, 300, 0);
		elm_layout_file_set(outfit_wrapper, edj_path, "outfit_wrapper");
		elm_box_pack_end(outfit_list_box, outfit_wrapper);
		evas_object_show(outfit_wrapper);

		// outfit box
		Evas_Object *outfit = elm_box_add(outfit_wrapper);
		elm_box_align_set(outfit, 0.5, 0);
		elm_box_padding_set(outfit, 0, 30);
		elm_layout_content_set(outfit_wrapper, "elm.swallow.content", outfit);
		evas_object_show(outfit);

		// outfit image
		char *outfit_img_path = NULL;
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, outfit_image_paths[i], &outfit_img_path);
		Evas_Object *outfit_img = elm_image_add(outfit);
		evas_object_size_hint_min_set(outfit_img, 200, 200);
		evas_object_size_hint_max_set(outfit_img, 200, 200);
		elm_image_file_set(outfit_img, outfit_img_path, NULL);
		elm_box_pack_end(outfit, outfit_img);
		evas_object_show(outfit_img);

		// outfit info table
		Evas_Object *outfit_detail_table = elm_table_add(outfit);
		evas_object_size_hint_weight_set(outfit_detail_table, EVAS_HINT_EXPAND, 0);
		evas_object_size_hint_align_set(outfit_detail_table, 0, 0);
		elm_table_padding_set(outfit_detail_table, 15, 10);
		elm_box_pack_end(outfit, outfit_detail_table);
		evas_object_show(outfit_detail_table);

		for (int row = 0; row < 2; row++) {
			for (int col = 0; col < 2; col++) {
				// outfit data - title or data
				Evas_Object *outfit_detail_label = elm_label_add(outfit_detail_table);
				evas_object_size_hint_align_set(outfit_detail_label, 0, 0.5);
				char content[200];
				if(col == 0){
					snprintf(content, 200, outfit_detail_css[col], outfit_detail_name[row]);
				}
				else{
					switch(row){
					case 0:
						snprintf(content, 200, outfit_detail_css[col], outfit_detail[i][row]);
						break;
					case 1:
						snprintf(content, 200, outfit_detail_css[col], outfit_detail[i][row]);
						break;
					}	// end switch-case
				}
				elm_object_text_set(outfit_detail_label, content);
				elm_table_pack(outfit_detail_table, outfit_detail_label, col, row, 1, 1);
				evas_object_show(outfit_detail_label);
			}
		}
	}

	/*
	 *	notification(empty) box
	 */
	Evas_Object *notification_menu_box_wrapper = elm_layout_add(menu_box);
	elm_layout_file_set(notification_menu_box_wrapper, edj_path, "main_menu_wrapper");
	evas_object_size_hint_weight_set(notification_menu_box_wrapper, 0, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(notification_menu_box_wrapper, 0, EVAS_HINT_FILL);
	evas_object_size_hint_min_set(notification_menu_box_wrapper, 750, 0);
	elm_box_pack_end(menu_box, notification_menu_box_wrapper);
	evas_object_show(notification_menu_box_wrapper);

	// notification - label
	Evas_Object *notification_menu_label = elm_label_add(notification_menu_box_wrapper);
	elm_object_text_set(notification_menu_label, "<color=#ABABABFF font_size=55 font_weight=BOLD>알림</color>");
	elm_layout_content_set(notification_menu_box_wrapper, "elm.swallow.content", notification_menu_label);
	evas_object_size_hint_align_set(notification_menu_label, 0.5, 0);
	evas_object_show(notification_menu_label);

	/* Show window after base gui is set up */
	evas_object_show(ad->win);
}

static bool
app_create(void *data)
{
	/* Hook to take necessary actions before main event loop starts
		Initialize UI resources and application's data
		If this function returns true, the main loop of application starts
		If this function returns false, the application is terminated */
	appdata_s *ad = data;

	create_base_gui(ad);

	return true;
}

static void
app_control(app_control_h app_control, void *data)
{
	/* Handle the launch request. */
}

static void
app_pause(void *data)
{
	/* Take necessary actions when application becomes invisible. */
}

static void
app_resume(void *data)
{
	/* Take necessary actions when application becomes visible. */
}

static void
app_terminate(void *data)
{
	/* Release all resources. */
}

static void
ui_app_lang_changed(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_LANGUAGE_CHANGED*/

	int ret;
	char *language;

	ret = app_event_get_language(event_info, &language);
	if (ret != APP_ERROR_NONE) {
		dlog_print(DLOG_ERROR, LOG_TAG, "app_event_get_language() failed. Err = %d.", ret);
		return;
	}

	if (language != NULL) {
		elm_language_set(language);
		free(language);
	}
}

static void
ui_app_orient_changed(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_DEVICE_ORIENTATION_CHANGED*/
	return;
}

static void
ui_app_region_changed(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_REGION_FORMAT_CHANGED*/
}

static void
ui_app_low_battery(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_LOW_BATTERY*/
}

static void
ui_app_low_memory(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_LOW_MEMORY*/
}

int
main(int argc, char *argv[])
{
	appdata_s ad = {0,};
	int ret = 0;

	ui_app_lifecycle_callback_s event_callback = {0,};
	app_event_handler_h handlers[5] = {NULL, };

	event_callback.create = app_create;
	event_callback.terminate = app_terminate;
	event_callback.pause = app_pause;
	event_callback.resume = app_resume;
	event_callback.app_control = app_control;

	ui_app_add_event_handler(&handlers[APP_EVENT_LOW_BATTERY], APP_EVENT_LOW_BATTERY, ui_app_low_battery, &ad);
	ui_app_add_event_handler(&handlers[APP_EVENT_LOW_MEMORY], APP_EVENT_LOW_MEMORY, ui_app_low_memory, &ad);
	ui_app_add_event_handler(&handlers[APP_EVENT_DEVICE_ORIENTATION_CHANGED], APP_EVENT_DEVICE_ORIENTATION_CHANGED, ui_app_orient_changed, &ad);
	ui_app_add_event_handler(&handlers[APP_EVENT_LANGUAGE_CHANGED], APP_EVENT_LANGUAGE_CHANGED, ui_app_lang_changed, &ad);
	ui_app_add_event_handler(&handlers[APP_EVENT_REGION_FORMAT_CHANGED], APP_EVENT_REGION_FORMAT_CHANGED, ui_app_region_changed, &ad);

//	pthread_t socket_thread;
//	pthread_create(&socket_thread, NULL, set_socket, NULL);

	ret = ui_app_main(argc, argv, &event_callback, &ad);
	if (ret != APP_ERROR_NONE) {
		dlog_print(DLOG_ERROR, LOG_TAG, "app_main() is failed. err = %d", ret);
	}

//	pthread_join(socket_thread, NULL);

	return ret;
}
