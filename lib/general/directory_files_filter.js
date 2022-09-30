'use strict';

//-----------------------------------------------//


// file_name_array needs to be an array of files from a directory
// wanted_names_array needs to be an array of names you want ex. ["weapons", "items", "etc"]

function file_filter (file_name_array, wanted_names_array) {
	
	let filterdFileArray = [];
	
	for (let i = 0; i < file_name_array.length; ++i){
		
		let name = file_name_array[i].split(".");
			
		if (wanted_names_array.includes(name[0]) == true){
			
			filterdFileArray.push(file_name_array[i]);
			
		}
	}
	return filterdFileArray;
}