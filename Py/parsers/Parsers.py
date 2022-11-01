
def parse_list (data_list):

	parsed_data    = []
	indexs         = []

	related_data   = []
	related_indexs = []

	is_related   = False

	for i in enumerate(data_list):

		ctype = i[1]["code"]
		entry = i[1]

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

			case 401:
				related_data.append(entry)

			case 405:
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

def parse_other ():
	pass

def loop_page ():
	pass

def loop_id ():
	pass