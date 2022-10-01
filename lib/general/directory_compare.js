'use strict';

//-----------------------------------------------//

const fs = require('fs');

//-----------------------------------------------//

// Returns object of either missing or additonalFiles if there are any and files that exists in both old & new_file_names
function compare_dir_files (old_file_names, new_file_names) {
	
	const oldLen = old_file_names.length;
	const newLen = new_file_names.length;
	
	const lenDiff = oldLen - newLen;
	
	let fMissing = false;
	let fadditon = false;
	
	if      (lenDiff > 0){ fMissing = true; }
	else if (lenDiff < 0){ fadditon = true; }
	
	let inBothDirs = [];
	let conflicts = {};
	
	
	if (fadditon == true){
		
		let foundAddi = 0;
		let addArray  = [];
		for (let i = 0; i < newLen; ++i){
			
			if (foundAddi == lenDiff * -1){ break; }
			if (old_file_names.includes(new_file_names[i]) == false){ addArray.push(new_file_names[i]); ++foundAddi; }
			else { inBothDirs.push(new_file_names[i]); }
			
		}
		conflicts["additonalFiles"] = addArray;
		conflicts["inBoth"] = inBothDirs;
		
	}
	
	else if (fMissing == true){
		
		let foundMiss = 0;
		let missArray = [];
		for (let i = 0; i < oldLen; ++i){
			
			if (foundMiss == lenDiff){ break; }
			if (new_file_names.includes(old_file_names[i]) == false){ missArray.push(old_file_names[i]); ++foundMiss; }
			else { inBothDirs.push(new_file_names[i]); }
			
		}
		conflicts["additonalFiles"] = addArray;
		conflicts["inBoth"] = inBothDirs;
		
	}
	else { conflicts["inBoth"] = inBothDirs; }
	return conflicts;
	
}

//-----------------------------------------------//

// compares file sizes and returns results as array "name", "size difference"
function get_sizes (dir_old_path, dir_new_path, file_names){
	
	let sizeDiffs = [];
	for (let i = 0; i < file_names.length; ++i){
		
		const oldStats = fs.statSync(dir_old_path + "\\" + file_names[i]);
		const newStats = fs.statSync(dir_new_path + "\\" + file_names[i]);
		
		sizeDiffs.push([file_names[i], oldStats.size - newStats.size]);
	}
	
	return sizeDiffs;
}



module.exports = { get_sizes, compare_dir_files }