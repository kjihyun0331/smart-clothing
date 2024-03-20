#include <washer.h>

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

struct temp {
	Evas_Object *nf;
	char *edj_path;
	Evas_Object *laundry_layout;
	Evas_Object *course_box;
} obj_temp;

void clicked_cb(void *data, Evas_Object *obj, void *event_info) {
	/*
	 *	laundry expand view
	 */
	obj_temp.laundry_layout = elm_layout_add(obj_temp.nf);
	elm_layout_file_set(obj_temp.laundry_layout, obj_temp.edj_path, "main_layout");
	elm_naviframe_item_push(obj_temp.nf, "laundry", NULL, NULL, obj_temp.laundry_layout, NULL);
	evas_object_size_hint_align_set(obj_temp.laundry_layout, 0.5, 0.5);

	obj_temp.course_box = elm_layout_add(obj_temp.laundry_layout);
	elm_layout_file_set(obj_temp.course_box, obj_temp.edj_path, "box_wrapper");
	evas_object_size_hint_min_set(obj_temp.course_box, 750, 750);
	elm_layout_content_set(obj_temp.laundry_layout, "elm.swallow.content", obj_temp.course_box);
	evas_object_show(obj_temp.course_box);
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
	elm_win_indicator_mode_set(ad->win, ELM_WIN_INDICATOR_SHOW);
	elm_win_indicator_opacity_set(ad->win, ELM_WIN_INDICATOR_OPAQUE);
	evas_object_size_hint_weight_set(ad->conform, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	elm_win_resize_object_add(ad->win, ad->conform);
	evas_object_show(ad->conform);

//	/* Label */
//	/* Create an actual view of the base gui.
//	   Modify this part to change the view. */
//	ad->label = elm_label_add(ad->conform);
//	elm_object_text_set(ad->label, "<align=center>Hello Tizen</align>");
//	evas_object_size_hint_weight_set(ad->label, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
//	elm_object_content_set(ad->conform, ad->label);


//	app_resource_manager_init();
//
//	Evas_Object *img;
//	char *img_path = NULL;
//
//	app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "test.jpg", &img_path);
//
//	Evas* canvas = evas_object_evas_get(ad->conform);
//	img = evas_object_image_filled_add(canvas);
//
//	if (img_path != NULL) {
//		dlog_print(DLOG_INFO, LOG_TAG, "img");
//	    evas_object_image_file_set(img, img_path, NULL);
//
//	    evas_object_move(img, 50, 50);
//	    evas_object_resize(img, 300, 200);
//	    evas_object_show(img);
//	    free(img_path);
//	}

	char *edj_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_LAYOUT, "edje_res/sample.edj", &edj_path);
	elm_theme_extension_add(NULL, edj_path);

	char *expand_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "expand.png", &expand_path);

	Evas_Object *nf = elm_naviframe_add(ad->conform);
	elm_object_content_set(ad->conform, nf);
	evas_object_show(nf);

	obj_temp.nf = nf;
	obj_temp.edj_path = edj_path;

	/*
	 *	main view
	 */
	Evas_Object *main_layout = elm_layout_add(nf);
	elm_layout_file_set(main_layout, edj_path, "main_layout");
	elm_naviframe_item_push(nf, NULL, NULL, NULL, main_layout, NULL);
	elm_box_align_set(main_layout, 0.5, 0.5);

	Evas_Object *menu_scroller = elm_scroller_add(main_layout);
	elm_object_style_set(menu_scroller, "menu_scroller");
	elm_layout_content_set(main_layout, "elm.swallow.content", menu_scroller);
	evas_object_show(menu_scroller);

	Evas_Object *menu_box = elm_box_add(menu_scroller);
	elm_box_horizontal_set(menu_box, EINA_TRUE);
	elm_box_padding_set(menu_box, 100, 0);
	elm_layout_content_set(menu_scroller, "elm.swallow.content", menu_box);
	evas_object_show(menu_box);

	/*
	 * 	course box
	 */
	Evas_Object *course_box_wrapper = elm_layout_add(menu_box);
	elm_layout_file_set(course_box_wrapper, edj_path, "box_wrapper");
	evas_object_size_hint_min_set(course_box_wrapper, 750, 750);
	elm_box_pack_end(menu_box, course_box_wrapper);
	evas_object_show(course_box_wrapper);

	Evas_Object *course_box = elm_box_add(course_box_wrapper);
	elm_layout_content_set(course_box_wrapper, "elm.swallow.content", course_box);
	elm_box_padding_set(course_box, 0, 25);
	evas_object_show(course_box);

	Evas_Object *course_menu_box = elm_box_add(course_box);
	evas_object_size_hint_align_set(course_menu_box, EVAS_HINT_FILL, 0);
	elm_box_horizontal_set(course_menu_box, EINA_TRUE);
	elm_box_pack_end(course_box, course_menu_box);
	evas_object_show(course_menu_box);

	Evas_Object *course_menu_label = elm_label_add(course_menu_box);
	elm_object_text_set(course_menu_label, "<color=#ABABABFF font_size=55 font_weight=BOLD>코스</color>");
	elm_box_pack_end(course_menu_box, course_menu_label);
	evas_object_show(course_menu_label);

	Evas_Object *course_menu_empty = elm_layout_add(course_menu_box);
	evas_object_size_hint_weight_set(course_menu_empty, EVAS_HINT_EXPAND, 0);
	elm_box_pack_end(course_menu_box, course_menu_empty);
	evas_object_show(course_menu_empty);

	Evas_Object *course_expand_btn = elm_button_add(course_menu_box);
	elm_object_style_set(course_expand_btn, "expand_button");
	evas_object_size_hint_min_set(course_expand_btn, 80, 80);
	Evas_Object *course_expand_btn_img = elm_image_add(course_expand_btn);
	elm_image_file_set(course_expand_btn_img, expand_path, NULL);
	elm_object_part_content_set(course_expand_btn, "icon", course_expand_btn_img);
	elm_box_pack_end(course_menu_box, course_expand_btn);
	evas_object_show(course_expand_btn);

	Evas_Object *course_list_box = elm_box_add(course_box);
	elm_box_horizontal_set(course_list_box, EINA_TRUE);
	elm_box_padding_set(course_list_box, 50, 0);
	elm_box_pack_end(course_box, course_list_box);
	evas_object_show(course_list_box);

	char course_img_names[2][100] = { "course_ai.png", "course_standard.png" };
	char course_names[2][100] = { "AI 맞춤", "표준" };
	char course_css[100] = "<color=#CFCFCF font_size=45 font_weight=BOLD>%s</color>";

	for(int i = 0; i < 2; i++){
		Evas_Object *course_wrapper = elm_layout_add(course_list_box);
		evas_object_size_hint_min_set(course_wrapper, 300, 600);
		elm_layout_file_set(course_wrapper, edj_path, "course_wrapper");
		elm_box_pack_end(course_list_box, course_wrapper);
		evas_object_show(course_wrapper);

		Evas_Object *course = elm_box_add(course_wrapper);
		elm_box_align_set(course, 0.5, 0);
		elm_box_padding_set(course, 0, 20);
		elm_layout_content_set(course_wrapper, "elm.swallow.content", course);
		evas_object_show(course);

		Evas_Object *course_image_wrapper = elm_layout_add(course);
		elm_layout_file_set(course_image_wrapper, edj_path, "course_image_wrapper");
		elm_box_pack_end(course, course_image_wrapper);
		evas_object_size_hint_align_set(course_image_wrapper, 0, 0.5);
		evas_object_show(course_image_wrapper);

		char *course_img_path = NULL;
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, course_img_names[i], &course_img_path);
		Evas_Object *course_image = elm_image_add(course_image_wrapper);
		evas_object_size_hint_min_set(course_image, 60, 60);
		evas_object_size_hint_max_set(course_image, 60, 60);
		elm_image_file_set(course_image, course_img_path, NULL);
		elm_layout_content_set(course_image_wrapper, "elm.swallow.content", course_image);
		evas_object_show(course_image);

		Evas_Object *course_label = elm_label_add(course);
		evas_object_size_hint_align_set(course_label, 0, 0.5);
		char content[200];
		snprintf(content, 200, course_css, course_names[i]);
		elm_object_text_set(course_label, content);
		elm_box_pack_end(course, course_label);
		evas_object_show(course_label);
	}

	/*
	 *	laundry box
	 */
	Evas_Object *laundry_box_wrapper = elm_layout_add(menu_box);
	elm_layout_file_set(laundry_box_wrapper, edj_path, "box_wrapper");
	evas_object_size_hint_min_set(laundry_box_wrapper, 750, 750);
	elm_box_pack_end(menu_box, laundry_box_wrapper);
	evas_object_show(laundry_box_wrapper);

	Evas_Object *laundry_box = elm_box_add(laundry_box_wrapper);
	elm_layout_content_set(laundry_box_wrapper, "elm.swallow.content", laundry_box);
	elm_box_padding_set(laundry_box, 0, 25);
	evas_object_show(laundry_box);

	Evas_Object *laundry_menu_box = elm_box_add(laundry_box);
	evas_object_size_hint_align_set(laundry_menu_box, EVAS_HINT_FILL, 0);
	elm_box_horizontal_set(laundry_menu_box, EINA_TRUE);
	elm_box_pack_end(laundry_box, laundry_menu_box);
	evas_object_show(laundry_menu_box);

	Evas_Object *laundry_menu_label = elm_label_add(laundry_menu_box);
	elm_object_text_set(laundry_menu_label, "<color=#ABABABFF font_size=55 font_weight=BOLD>세탁물 확인</color>");
	elm_box_pack_end(laundry_menu_box, laundry_menu_label);
	evas_object_show(laundry_menu_label);

	Evas_Object *laundry_menu_empty = elm_layout_add(laundry_menu_box);
	evas_object_size_hint_weight_set(laundry_menu_empty, EVAS_HINT_EXPAND, 0);
	elm_box_pack_end(laundry_menu_box, laundry_menu_empty);
	evas_object_show(laundry_menu_empty);

	Evas_Object *laundry_expand_btn = elm_button_add(laundry_menu_box);
	elm_object_style_set(laundry_expand_btn, "expand_button");
	evas_object_size_hint_min_set(laundry_expand_btn, 80, 80);
	Evas_Object *laundry_expand_btn_img = elm_image_add(laundry_expand_btn);
	elm_image_file_set(laundry_expand_btn_img, expand_path, NULL);
	elm_object_part_content_set(laundry_expand_btn, "icon", laundry_expand_btn_img);
	elm_box_pack_end(laundry_menu_box, laundry_expand_btn);
	evas_object_show(laundry_expand_btn);
	evas_object_smart_callback_add(laundry_expand_btn, "clicked", clicked_cb, NULL);

	Evas_Object *laundry_list_box = elm_box_add(laundry_box);
	elm_box_horizontal_set(laundry_list_box, EINA_TRUE);
	elm_box_padding_set(laundry_list_box, 50, 0);
	elm_box_pack_end(laundry_box, laundry_list_box);
	evas_object_show(laundry_list_box);

	char laundry_details[2][3][2][100] = {
			{
					{"재질", "코튼"},
					{"오염도", "2회 착용"},
					{"일정", "4/21"}
			},
			{
					{"재질", "코튼"},
					{"오염도", "1회 착용"},
					{"일정", "4/22"}
			}
	};
	char laundry_detail_css[2][100] = {
			"<color=#A5A5A5FF font_size=27>%s</color>",
			"<color=#EFEFEFFF font_size=32>%s</color>"
	};

	for(int i = 0; i < 2; i++){
		Evas_Object *laundry_wrapper = elm_layout_add(laundry_list_box);
		evas_object_size_hint_min_set(laundry_wrapper, 300, 600);
		elm_layout_file_set(laundry_wrapper, edj_path, "laundry_wrapper");
		elm_box_pack_end(laundry_list_box, laundry_wrapper);
		evas_object_show(laundry_wrapper);

		Evas_Object *laundry = elm_box_add(laundry_wrapper);
		elm_box_align_set(laundry, 0.5, 0);
		elm_box_padding_set(laundry, 0, 30);
		elm_layout_content_set(laundry_wrapper, "elm.swallow.content", laundry);
		evas_object_show(laundry);

		char *laundry_img_path = NULL;
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "clothes_example.png", &laundry_img_path);
		Evas_Object *laundry_img = elm_image_add(laundry);
		evas_object_size_hint_min_set(laundry_img, 150, 230);
		evas_object_size_hint_max_set(laundry_img, 150, 230);
		elm_image_file_set(laundry_img, laundry_img_path, NULL);
		elm_box_pack_end(laundry, laundry_img);
		evas_object_show(laundry_img);

		Evas_Object *laundry_detail_table = elm_table_add(laundry);
		evas_object_size_hint_weight_set(laundry_detail_table, EVAS_HINT_EXPAND, 0);
		evas_object_size_hint_align_set(laundry_detail_table, 0, 0);
		elm_table_padding_set(laundry_detail_table, 15, 0);
		elm_box_pack_end(laundry, laundry_detail_table);
		evas_object_show(laundry_detail_table);

		for (int row = 0; row < 3; row++) {
			for (int col = 0; col < 2; col++) {
				Evas_Object *laundry_detail_label = elm_label_add(laundry_detail_table);
				evas_object_size_hint_align_set(laundry_detail_label, 0, 0.5);
				char content[200];
				snprintf(content, 200, laundry_detail_css[col], laundry_details[i][row][col]);
				elm_object_text_set(laundry_detail_label, content);
				elm_table_pack(laundry_detail_table, laundry_detail_label, col, row, 1, 1);
				evas_object_show(laundry_detail_label);
			}
		}
	}

	/*
	 *	notification(empty) box
	 */
	Evas_Object *notification_box_wrapper = elm_layout_add(menu_box);
	elm_layout_file_set(notification_box_wrapper, edj_path, "box_wrapper");
	evas_object_size_hint_min_set(notification_box_wrapper, 750, 750);
	elm_box_pack_end(menu_box, notification_box_wrapper);
	evas_object_show(notification_box_wrapper);

	Evas_Object *notification_menu_label = elm_label_add(notification_box_wrapper);
	elm_object_text_set(notification_menu_label, "<color=#ABABABFF font_size=55 font_weight=BOLD>알림</color>");
	elm_layout_content_set(notification_box_wrapper, "elm.swallow.content", notification_menu_label);
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
	app_resource_manager_release();
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

void set_socket() {
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
	if (getaddrinfo("192.168.137.1", "12346", &hints, &result) != 0) {
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
		// write
		int count;
		char user_msg[200] = { 0, };
		if ((count = write(sockfd, user_msg, 200)) < 0) {
			dlog_print(DLOG_INFO, LOG_TAG, "write() error: %s\n", strerror(errno));

			freeaddrinfo(result);
			close(sockfd);
		}
		dlog_print(DLOG_INFO, LOG_TAG, "Sent count: %d, msg: %s\n", count, user_msg);

		// read
		char buf[257];
		memset(buf, 0x00, 257);

		if ((count = read(sockfd, buf, 256)) < 0) {
			dlog_print(DLOG_INFO, LOG_TAG, "read() error: %s\n", strerror(errno));

			freeaddrinfo(result);
			close(sockfd);
		}
		buf[count] = '\0';
		dlog_print(DLOG_INFO, LOG_TAG, "\nRead: %s\n", buf);

		close(sockfd);
	}

	freeaddrinfo(result);

	connection_profile_destroy(profile_h);
	connection_destroy(connection);
	free(local_ipv4);
	free(interface_name);
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

//	set_socket();

	ret = ui_app_main(argc, argv, &event_callback, &ad);
	if (ret != APP_ERROR_NONE) {
		dlog_print(DLOG_ERROR, LOG_TAG, "app_main() is failed. err = %d", ret);
	}

	return ret;
}
