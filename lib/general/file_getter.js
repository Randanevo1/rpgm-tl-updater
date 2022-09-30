'use strict';

//---------------------------------------//

const fs = require('fs');

//---------------------------------------//

// Returns files in target directory with given extension ex. ".json"
function get_dir_files (dir_path, extension) {
	
	if (fs.existsSync(dir_path) != true){return "directory does not exist";}
	
	const dirFileNames = fs.readdirSync(dir_path);
	
	let checkdContent = check_files(dirFileNames, extension);
	
	return checkdContent;
	
}

function check_files (file_name_array, extension) {
	
	let PathArray = [];
	
	for (let i = 0; i < file_name_array.length; ++i){
		
		let fileExt = file_name_array[i].split(".");
		
		if (fileExt[1] != extension){continue;}
		
		PathArray.push(file_name_array[i]);
		
	}
	
	return PathArray;
	
}

module.exports = { get_dir_files }