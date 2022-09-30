'use strict';

//-----------------------------------------------//

const fs = require('fs');

//-----------------------------------------------//

function compare_directories (dir_old_path, dir_new_path, old_file_names, new_file_names) {
	
	let conflicts = { "exists":"", "isAdditonal":false, "isMissing":false };
	
	if (fs.existsSync(dir_old_path) == false){ conflicts["exists"] =  "old directory does not exist"; return conflicts; }
	if (fs.existsSync(dir_new_path) == false){ conflicts["exists"] =  "new directory does not exist"; return conflicts; }
	
	const oldLen = old_file_names.length;
	const newLen = new_file_names.length;
	
	const lenDiff = oldLen - newLen;
	
	if      (lenDiff > 0){ conflicts["isMissing"]   = true; }
	else if (lenDiff < 0){ conflicts["isAdditonal"] = true; }
	
	
	
	//--------------------find any missing or additonal files-------------------------//
	
	let contained = []
	
	
	if (conflicts["isAdditonal"] == true){
		
		let foundAddi = 0;
		let addArray  = [];
		for (let i = 0; i < newLen; ++i){
			
			if (foundAddi == lenDiff * -1){ break; }
			if (old_file_names.includes(new_file_names[i]) == false){ addArray.push(new_file_names[i]); ++foundAddi; }
			else { contained.push(old_file_names[i]); }
			
		}
		conflicts["additonalFiles"] = addArray;
		
	}
	
	else if (conflicts["isMissing"] == true){
		
		let foundMiss = 0;
		let missArray = [];
		for (let i = 0; i < oldLen; ++i){
			
			if (foundMiss == lenDiff){ break; }
			if (new_file_names.includes(old_file_names[i]) == false){ missArray.push(old_file_names[i]); ++foundMiss; }
			else { contained.push(new_file_names[i]); }
			
		}
		conflicts["missingFiles"] = missArray;
		
	}
	
	else { contained = old_file_names; }
	
	//--------------------compare file sizes------------------------------------------//
	
	let sizeDiffs = [];
	for (let i = 0; i < contained.length; ++i){
		
		const oldStats = fs.statSync(dir_old_path + "\\" + contained[i]);
		const newStats = fs.statSync(dir_new_path + "\\" + contained[i]);
		
		sizeDiffs.push([contained[i], oldStats.size - newStats.size]);
		
	}
	conflicts["fileSizeDiffereces"] = sizeDiffs;
	
	
	return conflicts;
	
}

module.exports = { compare_directories }