'use strict';

const fs = require('fs');

// Ask if array is array of arrays or a flat array

// arrType needs to be either "aoa" or "farr"
function compare (oldArr, newArr, arrType){
	
	let conflictArr = []
	
	
	if (arrType == "farr"){
		
		let conflicts = compare_flatArr(oldArr, newArr)
		
		if (conflicts.length > 0) {
			conflictArr.push(conflicts);
		}
		
	}
	else if (arrType == "aoa"){
		
		let lenDiff = arr_length_compare(oldArr, newArr)
		let iter = 0
		
		if (lenDiff < 0){ iter = newArr.length; }
		else if (lenDiff > 0){ iter = oldArr.length; }
		else { iter = oldArr.length; }
		
		for (let i = 0; i < iter; ++i){
			
			let conflicts = compare_flatArr(oldArr[i], newArr[i])
			
			if (conflicts.length > 0) {
				conflictArr.push(conflicts);
			}
		}
		
	}
	else {
		return;
	}
	return conflictArr;
}


function compare_flatArr (old_fArr, new_fArr){
	
	let conflicts = []
	
	for (let i = 0; i < old_fArr.length; ++i){
		
    let oldobj = old_fArr[i];
    let newobj = new_fArr[i];

		let oldValues = Object.values(oldobj);
		let newValues = Object.values(newobj);
		
		let conTMP = [];
		
		for (let v = 0; v < oldValues.length; ++v){
			
			if (oldValues[v] == newValues[v]){ continue; }
			else if (Array.isArray(oldValues[v]) == true){
				
				if (Array.isArray(newValues[v]) == false){
					conTMP.push({"old":oldValues[v], "new":newValues[v]});
					break;
				}
				
				for (let p = 0; p < oldValues[v].length; ++p){
					
					if (oldValues[v][p] == newValues[v][p]){ continue; }
					else {
						conTMP.push({"old":oldValues[v], "new":newValues[v]});
						break;
					}
					
				}
				
			}
			else {
				
				conTMP.push({"old":oldValues[v], "new":newValues[v]});
				
			}
			
		}
    if (conTMP.length == 0){ continue; }
    conflicts.push(conTMP);
		
	}
	return conflicts;
	
}

// Returns 0 if arrays are the same length
function arr_length_compare (oldLisArr, newLisArr){
	
	let oldLen = oldLisArr.length;
	let newLen = newLisArr.length;
	
	return oldLen - newLen;
}

// returns false if strings are different & true if they match
function string_compare(oldStr, newStr){
	
	const oldStrLen = oldStr.length;
	const newStrLen = newStr.length;
	
	const maxLenDiff = 1;
	let lenDiff = 0;
	
	if (oldStrLen != newStrLen){
		if (oldStrLen > newStrLen){ lenDiff = oldStrLen - newStrLen; }
		else { lenDiff = newStrLen - oldStrLen; }
	}
	if (lenDiff > maxLenDiff) {return false;}
	
	//if ( oldStr.length != newStr.length ){ return false; }
	
	const maxCharDiff = 2
	let charDiff = 0
	for (let i = 0; i < oldStrLen; ++i){
		
		if (charDiff > maxCharDiff) { return false; }
		
		if (oldStr[i] != newStr[i]){ ++charDiff; }
		
	}
	return true;
}




//Will be removed once comparer works
function load_json(fPath){
	let rawdata = fs.readFileSync(fPath, {encoding:'utf8'});
	let data = JSON.parse(rawdata);
	return data;
}

function write_Stuff (arr){
	const fs = require('fs');
	let stuff = JSON.stringify(arr, null, 1);
	fs.writeFile("Problems.json", stuff, (err) => {
		if (err) {
			console.error(err);
		}
	});
}



module.exports = { compare }