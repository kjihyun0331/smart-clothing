#include "airdresser.h"

#define MAX_PROFILE 3

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
} path_obj;

struct AddClothesLayout {
	Evas_Object *profile_layout;
	Evas_Object *clothes_layout;
} clothes_layout;

typedef struct _UserProfile {
	Evas_Object *wrapper;
	Evas_Object *image;
	Evas_Object *name;
} UserProfile;

struct ProfileWidget {
	Evas_Object *label;
	Evas_Object *person_list_box;
	UserProfile profile[MAX_PROFILE];
} profile_widget;

struct ClothesWidget {
	Evas_Object *label;
	Evas_Object *clothes_data_layout;
} clothes_widget;

typedef struct _ProfileData {
	int number;
	int selected;
} ProfileData;

int profile_size = MAX_PROFILE;
ProfileData profiles[MAX_PROFILE];

void back_to_main_cb(void*, Evas_Object*, void*);
void set_person_layout(void*, Evas_Object*, void*);
void add_clothes_profile_clicked_cb(void*, Evas_Object*, void*);
void set_tag_layout(void*, Evas_Object*, void*);
void clicked_cb(void*, Evas_Object*, void*);

void back_to_main_cb(void *data, Evas_Object *obj, void *event_info) {
	elm_naviframe_item_pop(path_obj.nf);
}

void set_person_layout(void *data, Evas_Object *obj, void *event_info) {
	evas_object_event_callback_del(clothes_layout.profile_layout, EVAS_CALLBACK_MOUSE_UP, set_person_layout);
	evas_object_size_hint_weight_set(clothes_layout.profile_layout, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(clothes_layout.profile_layout, EVAS_HINT_FILL, 0);
	elm_object_text_set(profile_widget.label, "<color=#FFFFFFFF font_size=70>사용자를 선택해주세요</color>");
	elm_box_horizontal_set(profile_widget.person_list_box, EINA_TRUE);
	elm_box_align_set(profile_widget.person_list_box, 0.5, 0.5);
	for(int i = 0; i < MAX_PROFILE; i++){
		elm_object_text_set(profile_widget.profile[i].name, "<color font_size=35>사용자</color>");
		evas_object_event_callback_add(profile_widget.profile[i].wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_profile_clicked_cb, (void*)&profiles[i]);

		evas_object_size_hint_min_set(profile_widget.profile[i].wrapper, 250, 400);
		evas_object_show(profile_widget.profile[i].wrapper);
	}

	evas_object_event_callback_add(clothes_layout.clothes_layout, EVAS_CALLBACK_MOUSE_UP, set_tag_layout, NULL);
	evas_object_size_hint_weight_set(clothes_layout.clothes_layout, 0, 0);
	evas_object_size_hint_align_set(clothes_layout.clothes_layout, 0, 0);
	evas_object_size_hint_min_set(clothes_layout.clothes_layout, 200, 760);
	elm_object_text_set(clothes_widget.label, "<color=#FFFFFFFF font_size=40 align=center>RFID<br>태그</color>");
	evas_object_size_hint_min_set(clothes_widget.clothes_data_layout, 0, 0);
	evas_object_hide(clothes_widget.clothes_data_layout);
}

void add_clothes_profile_clicked_cb(void *data, Evas_Object *obj, void *event_info) {
	ProfileData *cur = (ProfileData*)data;
	cur->selected ^= 1;
	edje_object_signal_emit(profile_widget.profile[cur->number].wrapper, "select", "*");
}

void set_tag_layout(void *data, Evas_Object *obj, void *event_info) {
	evas_object_event_callback_add(clothes_layout.profile_layout, EVAS_CALLBACK_MOUSE_UP, set_person_layout, NULL);
	evas_object_size_hint_weight_set(clothes_layout.profile_layout, 0, 0);
	evas_object_size_hint_align_set(clothes_layout.profile_layout, 0, 0);
	evas_object_size_hint_min_set(clothes_layout.profile_layout, 200, 760);
	elm_object_text_set(profile_widget.label, "<color=#FFFFFFFF font_size=40 align=center>사용자<br>선택</color>");
	elm_box_horizontal_set(profile_widget.person_list_box, EINA_FALSE);
	elm_box_align_set(profile_widget.person_list_box, 0.5, 0);
	for(int i = 0; i < MAX_PROFILE; i++){
		evas_object_event_callback_del(profile_widget.profile[i].wrapper, EVAS_CALLBACK_MOUSE_UP, add_clothes_profile_clicked_cb);
		if(!profiles[i].selected){
			evas_object_size_hint_min_set(profile_widget.profile[i].wrapper, 0, 0);
			evas_object_hide(profile_widget.profile[i].wrapper);
		}
		else{
			elm_object_text_set(profile_widget.profile[i].name, "<color font_size=20>사용자1</color>");
			evas_object_size_hint_min_set(profile_widget.profile[i].wrapper, 100, 160);
			evas_object_show(profile_widget.profile[i].wrapper);
		}
	}
	elm_box_recalculate(profile_widget.person_list_box);

	evas_object_event_callback_del(clothes_layout.clothes_layout, EVAS_CALLBACK_MOUSE_UP, set_tag_layout);
	evas_object_size_hint_weight_set(clothes_layout.clothes_layout, EVAS_HINT_EXPAND, 0);
	evas_object_size_hint_align_set(clothes_layout.clothes_layout, EVAS_HINT_FILL, 0);
	elm_object_text_set(clothes_widget.label, "<color=#FFFFFFFF font_size=70>옷의 RFID를 태그해주세요</color>");
	evas_object_size_hint_weight_set(clothes_widget.clothes_data_layout, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(clothes_widget.clothes_data_layout, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(clothes_widget.clothes_data_layout);
}

void clicked_cb(void *data, Evas_Object *obj, void *event_info) {
	// add clothes page main background layout
	Evas_Object *add_clothes_layout = elm_layout_add(path_obj.nf);
	elm_layout_file_set(add_clothes_layout, path_obj.edj_path, "inside_layout");
	elm_naviframe_item_push(path_obj.nf, NULL, NULL, NULL, add_clothes_layout, NULL);
	Elm_Object_Item *main_item = elm_naviframe_top_item_get(path_obj.nf);
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
	elm_layout_file_set(select_person_layout, path_obj.edj_path, "tab_wrapper");
	elm_box_pack_end(tabs_box, select_person_layout);
	evas_object_size_hint_min_set(select_person_layout, 0, 760);
	evas_object_show(select_person_layout);
	clothes_layout.profile_layout = select_person_layout;

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
	profile_widget.label = select_person_label;

	Evas_Object *person_list_box = elm_box_add(select_person_box);
	elm_box_padding_set(person_list_box, 100, 15);
	elm_box_pack_end(select_person_box, person_list_box);
	evas_object_size_hint_weight_set(person_list_box, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(person_list_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	evas_object_show(person_list_box);
	profile_widget.person_list_box = person_list_box;

	for(int i = 0; i < MAX_PROFILE; i++){
		Evas_Object *profile_wrapper = elm_layout_add(person_list_box);
		elm_layout_file_set(profile_wrapper, path_obj.edj_path, "profile_wrapper");
		elm_box_pack_end(person_list_box, profile_wrapper);
		profiles[i].number = i;
		profiles[i].selected = 0;
		profile_widget.profile[i].wrapper = profile_wrapper;

		Evas_Object *profile_box = elm_box_add(profile_wrapper);
		elm_box_padding_set(profile_box, 0, 15);
		elm_layout_content_set(profile_wrapper, "elm.swallow.content", profile_box);
		evas_object_show(profile_box);

		Evas_Object *profile_image = elm_image_add(profile_box);
		char *img_path = NULL;
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "profile_img1.png", &img_path);
		evas_object_size_hint_weight_set(profile_image, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
		evas_object_size_hint_align_set(profile_image, EVAS_HINT_FILL, EVAS_HINT_FILL);
		elm_image_file_set(profile_image, img_path, NULL);
		elm_box_pack_end(profile_box, profile_image);
		evas_object_show(profile_image);
		profile_widget.profile[i].image = profile_image;

		Evas_Object *profile_label = elm_label_add(profile_box);
		elm_box_pack_end(profile_box, profile_label);
		evas_object_show(profile_label);
		profile_widget.profile[i].name = profile_label;
	}

	/*
	 * 	second tab
	 */
	// tag clothes layout
	Evas_Object *tag_clothes_layout = elm_layout_add(tabs_box);
	elm_layout_file_set(tag_clothes_layout, path_obj.edj_path, "tab_wrapper");
	elm_box_pack_end(tabs_box, tag_clothes_layout);
	evas_object_size_hint_min_set(tag_clothes_layout, 0, 760);
	evas_object_show(tag_clothes_layout);
	clothes_layout.clothes_layout = tag_clothes_layout;

	// tag clothes box
	Evas_Object *tag_clothes_box = elm_box_add(tag_clothes_layout);
	elm_box_padding_set(tag_clothes_box, 0, 30);
	elm_layout_content_set(tag_clothes_layout, "elm.swallow.content", tag_clothes_box);
	elm_box_align_set(tag_clothes_box, 0.5, 0);
	evas_object_show(tag_clothes_box);

	// tag clothes description label
	Evas_Object *tag_clothes_label = elm_label_add(tag_clothes_box);
	elm_box_pack_end(tag_clothes_box, tag_clothes_label);
	evas_object_show(tag_clothes_label);
	clothes_widget.label = tag_clothes_label;

	// tag clothes layout for hide
	Evas_Object *tag_content_layout = elm_layout_add(tag_clothes_box);
	elm_layout_file_set(tag_content_layout, path_obj.edj_path, "empty_layout");
	elm_box_pack_end(tag_clothes_box, tag_content_layout);
	clothes_widget.clothes_data_layout = tag_content_layout;

	Evas_Object *tag_content_box = elm_box_add(tag_content_layout);
	elm_box_padding_set(tag_content_box, 0, 50);
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
	elm_layout_file_set(clothes_img, path_obj.edj_path, "add_clothes_image_wrapper");
	elm_box_pack_end(clothes_image_box, clothes_img);
	evas_object_size_hint_min_set(clothes_img, 300, 300);
	evas_object_show(clothes_img);

	Evas_Object *clothes_img_btn = elm_button_add(clothes_image_box);
	elm_object_text_set(clothes_img_btn, "사진 촬영");
	elm_box_pack_end(clothes_image_box, clothes_img_btn);
	evas_object_show(clothes_img_btn);

	Evas_Object *clothes_desc_box = elm_box_add(clothes_info_box);
	elm_box_padding_set(clothes_desc_box, 0, 80);
	elm_box_pack_end(clothes_info_box, clothes_desc_box);
	evas_object_show(clothes_desc_box);

	Evas_Object *clothes_category = elm_layout_add(clothes_desc_box);
	elm_layout_file_set(clothes_category, path_obj.edj_path, "add_clothes_image_wrapper");
	elm_box_pack_end(clothes_desc_box, clothes_category);
	evas_object_size_hint_min_set(clothes_category, 600, 100);
	evas_object_show(clothes_category);

	Evas_Object *clothes_texture = elm_layout_add(clothes_desc_box);
	elm_layout_file_set(clothes_texture, path_obj.edj_path, "add_clothes_image_wrapper");
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
	elm_object_text_set(extra_submit_btn, "추가 등록");
	elm_box_pack_end(submit_button_box, extra_submit_btn);
	evas_object_show(extra_submit_btn);

	Evas_Object *submin_btn = elm_button_add(submit_button_box);
	elm_object_text_set(submin_btn, "등록 완료");
	elm_box_pack_end(submit_button_box, submin_btn);
	evas_object_show(submin_btn);

	set_person_layout(data, obj, event_info);
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
	path_obj.edj_path = edj_path;

	// naviframe
	Evas_Object *nf = elm_naviframe_add(ad->conform);
	elm_object_content_set(ad->conform, nf);
	evas_object_show(nf);
	path_obj.nf = nf;

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

	// 임시 버튼
	Evas_Object *button = elm_button_add(outfit_menu_top_menu);
	elm_object_text_set(button, "옷 등록");
	evas_object_size_hint_max_set(button, 100, 100);
	elm_box_pack_end(outfit_menu_top_menu, button);
	evas_object_show(button);
	evas_object_smart_callback_add(button, "clicked", clicked_cb, NULL);

	Evas_Object *outfit_menu_top_menu_expand_btn = elm_button_add(outfit_menu_top_menu);
	elm_object_style_set(outfit_menu_top_menu_expand_btn, "image_button");
	evas_object_size_hint_min_set(outfit_menu_top_menu_expand_btn, 80, 80);
	elm_box_pack_end(outfit_menu_top_menu, outfit_menu_top_menu_expand_btn);
	evas_object_show(outfit_menu_top_menu_expand_btn);

	char *outfit_expand_img_path = NULL;
	app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "expand.png", &outfit_expand_img_path);
	Evas_Object *outfit_expand_btn_img = elm_image_add(outfit_menu_top_menu_expand_btn);
	elm_image_file_set(outfit_expand_btn_img, outfit_expand_img_path, NULL);
	elm_object_part_content_set(outfit_menu_top_menu_expand_btn, "icon", outfit_expand_btn_img);

	Evas_Object *outfit_list_box = elm_box_add(outfit_menu_box);
	evas_object_size_hint_weight_set(outfit_list_box, EVAS_HINT_EXPAND, EVAS_HINT_EXPAND);
	evas_object_size_hint_align_set(outfit_list_box, EVAS_HINT_FILL, EVAS_HINT_FILL);
	elm_box_horizontal_set(outfit_list_box, EINA_TRUE);
	elm_box_padding_set(outfit_list_box, 50, 0);
	elm_box_pack_end(outfit_menu_box, outfit_list_box);
	evas_object_show(outfit_list_box);

	// dummy data
	char outfit_detail_name[2][100] = { "일정", "사용자" };
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
		app_resource_manager_get(APP_RESOURCE_TYPE_IMAGE, "outfit1.png", &outfit_img_path);
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
						snprintf(content, 200, outfit_detail_css[col], "4/21");
						break;
					case 1:
						snprintf(content, 200, outfit_detail_css[col], "사용자1");
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

	ret = ui_app_main(argc, argv, &event_callback, &ad);
	if (ret != APP_ERROR_NONE) {
		dlog_print(DLOG_ERROR, LOG_TAG, "app_main() is failed. err = %d", ret);
	}

	return ret;
}
