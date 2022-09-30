'use strict';

//-----------------------------------------------//

const fs = require('fs');

//-----------------------------------------------//

function compare_directories (dir_old, dir_new) {
	
	let conflicts = {"exists":"", "lengthDifference":0, "additonalFiles":[], "missingFiles":[]};
	
	const oldFiles = fs.readdirSync(dir_old);
	const newFiles = fs.readdirSync(dir_new);
	
	if (fs.existsSync(old_Game_Path_da) == false){ conflicts["exists"] =  "old directory does not exist"; return conflicts; }
	if (fs.existsSync(new_Game_Path_da) == false){ conflicts["exists"] =  "new directory does not exist"; return conflicts; }
	
	const oldLen = oldFiles.length;
	const newLen = newFiles.length;
	
	const lenDiff = oldLen - newLen;
	
	let iter = oldLen;
	
	if      (lendiff > 0){}
	else if (lendiff < 0){}
	
	
	
}