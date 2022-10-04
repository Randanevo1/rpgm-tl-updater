'use strict';

// arrType needs to be either "aoa" or "farr"
function compare (oldArr, newArr, id){
	
	let conflictArr = [];
	let tmpOBJ = {"id":id};
	
	let lenDiff = arr_length_compare(oldArr, newArr)
	let iter = 0
	
	if (lenDiff > 0){ iter = newArr.length; }
	else if (lenDiff < 0){ iter = oldArr.length; }
	else { iter = oldArr.length; }
	
	for (let i = 0; i < iter; ++i){
		
		let conflicts = compare_flatArr(oldArr[i], newArr[i])
		
		if (conflicts.length > 0) {
			conflictArr.push(conflicts);
		}
	}
	tmpOBJ["diffrences"] = conflictArr
	return tmpOBJ;
}


function compare_flatArr (old_fArr, new_fArr){
	
	let conflicts = [];

	let lenDiff = arr_length_compare(old_fArr, new_fArr);
	let iter = 0;
		
	if (lenDiff > 0){ iter = new_fArr.length; }
	else if (lenDiff < 0){ iter = old_fArr.length; }
	else { iter = old_fArr.length; }
	
	let totalDiffs = 0
	
	for (let i = 0; i < iter; ++i){

		let oldobj = old_fArr[i];
		let newobj = new_fArr[i];

		let oldValues = Object.values(oldobj);
		let newValues = Object.values(newobj);
		
		let conOBJ = {};
		
		let individualObjDiffs = 0;
		let objIndex = i;
		
		for (let v = 0; v < oldValues.length; ++v){
			
			if (oldValues[v] == newValues[v]){ continue; }
			else if (Array.isArray(oldValues[v]) == true){
				
				if (Array.isArray(newValues[v]) == false){
					++individualObjDiffs;
					break;
				}
				
				for (let p = 0; p < oldValues[v].length; ++p){
					
					if (oldValues[v][p] == newValues[v][p]){ continue; }
					else {
						++individualObjDiffs;
					}
					
				}
				
			}
			else {
				
				++individualObjDiffs;
				
			}
		}
		if (individualObjDiffs > 0) { conOBJ["entry"] = i; conOBJ["entrydiffrences"] = individualObjDiffs; }
		
    if (Object.keys(conOBJ).length == 0){ continue; }
    conflicts.push(conOBJ);
		
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
// function string_compare(oldStr, newStr){
	
	// const oldStrLen = oldStr.length;
	// const newStrLen = newStr.length;
	
	// const maxLenDiff = 1;
	// let lenDiff = 0;
	
	// if (oldStrLen != newStrLen){
		// if (oldStrLen > newStrLen){ lenDiff = oldStrLen - newStrLen; }
		// else { lenDiff = newStrLen - oldStrLen; }
	// }
	// if (lenDiff > maxLenDiff) {return false;}
	
	//if ( oldStr.length != newStr.length ){ return false; }
	
	// const maxCharDiff = 2
	// let charDiff = 0
	// for (let i = 0; i < oldStrLen; ++i){
		
		// if (charDiff > maxCharDiff) { return false; }
		
		// if (oldStr[i] != newStr[i]){ ++charDiff; }
		
	// }
	// return true;
// }


module.exports = { compare }