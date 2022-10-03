'use strict';

const fs = require('fs');

function map_Parser(jData){

	let data = jData;
	let extractedText = [];

	//jump to a event id
	const codeTypes = [401, 405, 102, 108, 105, 101, 0];

	//Event loop
	let evLength = data["events"].length;
	for (let ev = 0; ev < evLength; ++ev){
		
		if (data["events"][ev] == null){continue;}
		let tmpArr = []
		
		//Page loop
		let paLength = data["events"][ev]["pages"].length;
		for (let pa = 0; pa < paLength; ++pa){
			
			// relatedChunk is an int to make it easier to check for repeats
			let relatedChunk = 0;
			let arrInArr = [];
			
			//List loop
			let liLength = data["events"][ev]["pages"][pa]["list"].length;
			for (let li = 0; li < liLength; ++li){
				
				let cType = data["events"][ev]["pages"][pa]["list"][li]["code"];
				let Param = data["events"][ev]["pages"][pa]["list"][li]["parameters"][0];
				let inden = data["events"][ev]["pages"][pa]["list"][li]["indent"];
				
				// Checks if cType is in codeTypes array and pushes it to an array
				if (codeTypes.indexOf(cType) > -1){
					
					if (cType == 108){
						if (Param.includes("text_indicator") == true){
							tmpArr.push([{"codetype":cType, "indent":inden, "parameters":Param}]);
							continue;
						}
						continue;
					}
					
					if (cType == 105 || cType == 101){
						relatedChunk += 1;
					}
					if (cType == 0 && arrInArr.length > 0){
						relatedChunk = 0;
						tmpArr.push(arrInArr)
						arrInArr = [];
						continue;
					}
					if (cType == 101 && relatedChunk > 1 || cType == 105 && relatedChunk > 1){
						relatedChunk = 1;
						tmpArr.push(arrInArr);
						arrInArr = [];
						continue;
					}
					
					if (cType == 102 && relatedChunk > 1 || cType == 102 && relatedChunk == 0){
						tmpArr.push([{"codetype":cType, "indent":inden, "parameters":Param}])
						}
					if (relatedChunk == 1 && cType != 101 && cType != 105 ){
						arrInArr.push({"codetype":cType, "indent":inden, "parameters":Param});
						continue;
					}

				}
			}	
		}
		extractedText.push({"id":ev, "list":tmpArr});
	}
	return extractedText;
}

function ce_Parser(jData){
	
	let data = jData;
	let extractedText = [];

	//jump to a event id
	const codeTypes = [401, 405, 102, 108, 105, 101, 0];
	
	//Event loop
	let evLength = data.length
	for (let ev = 0; ev < evLength; ++ev){
		if (data[ev] == null){continue;}
		let tmpArr = [];
		let arrInArr = [];
		let relatedChunk = 0
		//List loop
		let liLength = data[ev]["list"].length;
		for (let li = 0; li < liLength; ++li){
			
			let cType = data[ev]["list"][li]["code"];
			let Param = data[ev]["list"][li]["parameters"][0];
			let inden = data[ev]["list"][li]["indent"];
			
			// Checks if cType is in codeTypes array and if it is pushs it to extractedText array
			if (codeTypes.indexOf(cType) > -1){
				
				if (cType == 108){
					if (Param.includes("text_indicator") == true){
						tmpArr.push([{"codetype":cType, "indent":inden, "parameters":Param}]);
						continue;
					}
					continue;
				}
				
				if (cType == 105 || cType == 101){
					relatedChunk += 1;
				}
				if (cType == 0 && arrInArr.length > 0){
					relatedChunk = 0;
					tmpArr.push(arrInArr)
					arrInArr = [];
					continue;
				}
				if (cType == 101 && relatedChunk > 1 || cType == 105 && relatedChunk > 1){
					relatedChunk = 1;
					tmpArr.push(arrInArr);
					arrInArr = [];
					continue;
				}
				
				if (cType == 102 && relatedChunk > 1 || cType == 102 && relatedChunk == 0){
					tmpArr.push([{"codetype":cType, "indent":inden, "parameters":Param}])
					}
				if (relatedChunk == 1 && cType != 101 && cType != 105 ){
					arrInArr.push({"codetype":cType, "indent":inden, "parameters":Param});
					continue;
				}
			}
		}
		extractedText.push({"id":ev, "list":tmpArr});
	}
	return extractedText;
}

// short for actors armors classes skills states troops weapons
// can't think of a better name for this
function aacesstw_Parser(jData){
	
	let data = jData;
	let extractedText = [];
	
	let validKeys = ["name","description","message1","message2","message3","message4","nickname"];
	let fileKeys  = Object.keys(data[1]);
	
	let presentValidKeys = [];
	let vKeyLength = validKeys.length;
	
	
	//Finds valid keys in current file
	for (let v = 0; v < vKeyLength; ++v){
		if (fileKeys.indexOf(validKeys[v]) > -1){
			presentValidKeys.push(validKeys[v])
		}
	}
	
	let pVKLength = presentValidKeys.length
	let idLength = data.length
	for (let id = 0; id < idLength; ++id){
		if (data[id] === null){continue;}
		let tmpArr = [];
		for (let k = 0; k < pVKLength; ++k){
			tmpArr.push([presentValidKeys[k], data[id][presentValidKeys[k]]]);
		}
		const obj = Object.fromEntries(tmpArr);
		extractedText.push({"id":id, "list":[obj]});
	}
	return extractedText;
}

function system_Parser(jData){
	
	let data = jData;
	let extractedText = [];
	let tmpArr = [];
	
	tmpArr.push([
		Object.values(data['gameTitle']),
		Object.values(data['skillTypes']),
		Object.values(data['weaponTypes']),
		Object.values(data['equipTypes']),
		Object.values(data['armorTypes']),
		Object.values(data['elements']),
		Object.values(data['terms']['basic']),
		Object.values(data['terms']['commands']),
		Object.values(data['terms']['params']),
		Object.values(data['terms']['messages'])
		]);
	
	extractedText.push({"id":0, "list":tmpArr});
	return extractedText;
}

module.exports = {system_Parser, aacesstw_Parser, ce_Parser, map_Parser};