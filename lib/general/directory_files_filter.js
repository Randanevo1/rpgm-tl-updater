'use strict';

//-----------------------------------------------//

// file_name_array needs to be an array of files from a directory
// wanted_names_array needs to be an array of names you want ex. ["weapons", "items", "etc"]

function file_filter (file_name_array, wanted_names_array) {
	
	let filterdFileArray = [];
	
	const fileLen   = file_name_array.length
	const wantedLen = wanted_names_array.length
	
	for (let i = 0; i < fileLen; ++i){
		
		let name = file_name_array[i].split(".");
			
		// Check file_name_array for substrings from wanted_names_array
		for (let n = 0; n < wantedLen; ++n){
			
			if (name[0].includes(wanted_names_array[n]) == true){
				
				filterdFileArray.push(file_name_array[i]);
				
			}
			
		}
		
	}
	return filterdFileArray;
}

module.exports = { file_filter }