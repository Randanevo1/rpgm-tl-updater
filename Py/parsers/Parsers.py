
def loop_id (data_id_array, type):
	parsed_data = []

	for i in data_id_array:

		if i == None:
			parsed_data.append("")
			continue

		if type == 0:
			parsed_list = parse_list(i["list"])
			tmp_dict = {"id":i["id"], "indexs":parsed_list[0], "list":parsed_list[1]}
			parsed_data.append(tmp_dict)
			continue

		if type == 1:
			parsed_pages = loop_page(i["pages"])
			tmp_dict = {"id":i["id"], "indexs":parsed_pages[0], "list":parsed_pages[1]}
			parsed_data.append(tmp_dict)

		else:
			parsed_obj = parse_other(i)
			tmp_dict = {"id":i["id"], "list":parsed_obj}
			parsed_data.append(tmp_dict)

	return parsed_data

def loop_page (data_id_page_array):
	
	parsed_lists = []

	indexs = []

	for i in data_id_page_array:

		list_parse = parse_list(i["list"])
		indexs.append(list_parse[0])
		parsed_lists.append(list_parse[1])

	return [indexs, parsed_lists]

def parse_list (data_list_array):

	parsed_data    = []
	indexs         = []

	related_data   = []
	related_indexs = []

	is_related   = False

	for i in enumerate(data_list_array):

		ctype = i[1]["code"]
		entry = repr(i[1])

		match ctype:

			case 101 | 105 | 0:
				if is_related == False:
					is_related = True
					related_indexs.append(i[0])

				else:
					if ctype == 0:
						is_related = False
					parsed_data.append(related_data)
					related_indexs.append(i[0])
					indexs.append(related_indexs)
					related_indexs = []
					related_data = []

			case 401 | 405:
				related_data.append(entry)

			case 102:
				if is_related == True:
					related_data.append(entry)
				else:
					parsed_data.append([entry])
					indexs.append([i[0]])

			case 108:
				if "text_indicator" in entry["parameters"][0]:
					parsed_data.append([entry])
					indexs.append([i[0]])

			case _:
				if is_related == True:
					is_related = False
					parsed_data.append(related_data)
					related_indexs.append(i[0])
					indexs.append(related_indexs)
					related_indexs = []
					related_data = []

	return [indexs, parsed_data]

def parse_other (data_id_obj):
	
	VALID_KEYS = ["description","name","message1","message2","message3","message4","nickname"]

	parsed_data = {}

	for i in VALID_KEYS:
		if i in data_id_obj:
			parsed_data[i] = data_id_obj[i] 

	return parsed_data

def parse_system (data_sys):

	data = {}

	data["gameTitle"]         = data_sys["gameTitle"]
	data["skillTypes"]        = data_sys["skillTypes"]
	data["weaponTypes"]       = data_sys["weaponTypes"]
	data["equipTypes"]        = data_sys["equipTypes"]
	data["armorTypes"]        = data_sys["armorTypes"]
	data["elements"]          = data_sys["elements"]
	data["terms"]["basic"]    = data_sys["terms"]["basic"]
	data["terms"]["commands"] = data_sys["terms"]["commands"]
	data["terms"]["params"]   = data_sys["terms"]["params"]
	data["terms"]["messages"] = data_sys["terms"]["messages"]

	return data