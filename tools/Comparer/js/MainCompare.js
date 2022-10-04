'use strict';

//---------------------------------------------------------//

const fs = require('fs');
const jparse  = require("./../../../lib/rpgmv/Parsers");
const compare = require("./../../../lib/general/compare");
const fileGet = require("./../../../lib/general/file_getter");
const dirFilt = require("./../../../lib/general/directory_files_filter");
const dirComp = require("./../../../lib/general/directory_compare");

//---------------------------------------------------------//


const old_dir_path = "./dataold";//process.argv[process.argv.length -3];
const new_dir_path = "./datanew";//process.argv[process.argv.length -2];

//let stuff = load_json("./datanew/CommonEvents.json")
//let fsasd = jparse.ce_Parser(stuff)
//write_Stuff(fsasd)
//return;

const valid_file_names = ["Actors", "Weapons", "Armors", "System", "Troops", "Enemies", "CommonEvents", "Classes", "Skills", "States", "Map"];

const oldFiles  = fileGet.get_dir_files(old_dir_path, "json");
const newFiles  = fileGet.get_dir_files(new_dir_path, "json");

const oldNames  = dirFilt.file_filter(oldFiles, valid_file_names);
const newNames  = dirFilt.file_filter(newFiles, valid_file_names);

const compareResults = dirComp.compare_dir_files(oldNames, newNames);

const sizes = dirComp.get_sizes(old_dir_path, new_dir_path, compareResults["inBoth"]);

let   changedFiles = [];

for (let i = 0; i < sizes.length; ++i) {
	
	if (sizes[i][1] != 0){
		
		if (sizes[i][0] == "MapInfos.json"){ continue; }
		changedFiles.push(sizes[i][0]);
		
	}
}


let results = [];
for (let n = 0; n < changedFiles.length; ++n){
	
	let oldData = load_json(old_dir_path + "\\" + changedFiles[n]);
	let newData = load_json(new_dir_path + "\\" + changedFiles[n]);
	
	if ( changedFiles[n].includes("Map") ){
		
		let oldParsedData = jparse.map_Parser(oldData);
		let newParsedData = jparse.map_Parser(newData);
		
		let compare = call_comparer(oldParsedData, newParsedData);
		if (compare.length > 0){results.push({"name":changedFiles[n], "results":compare});}
		
		
	}
	else if ( changedFiles[n].includes("CommonEvents") ) {
		
		let oldParsedData = jparse.ce_Parser(oldData);
		let newParsedData = jparse.ce_Parser(newData);
		
		let compare = call_comparer(oldParsedData, newParsedData);
		results.push({"name":changedFiles[n], "results":compare});
		
	}
	else if ( changedFiles[n].includes("System") ) {
		
		let oldParsedData = jparse.system_Parser(oldData);
		let newParsedData = jparse.system_Parser(newData);
		
		let compare = call_comparer(oldParsedData, newParsedData);
		results.push({"name":changedFiles[n], "results":compare});
		
	}
	else {
		
		let oldParsedData = jparse.aacesstw_Parser(oldData);
		let newParsedData = jparse.aacesstw_Parser(newData);
		
		let compare = call_comparer(oldParsedData, newParsedData);
		results.push({"name":changedFiles[n], "results":compare});
		
	}
}

write_Stuff(results);

//----------------------------------------------------------//

// Structure of object 
// need to pass comparer "list" array
// [{"id":0, "list":[{any keys}, {any keys}, {any keys}]}, {"id":1, "list":[]}]

function call_comparer (oldParsedJson, newParsedJson) {
	
	let oldLen = oldParsedJson.length;
	let newLen = newParsedJson.length;
	let iter = 0;
	
	if ( newLen < oldLen ){ iter = newLen; }
	else { iter = oldLen; }
	
	let compared = [];
	
	for (let i = 0; i < iter; ++i){
		
		if ( oldParsedJson[i]["list"].length == 0 ){ continue; }
		else if ( newParsedJson[i]["list"].length == 0 ){ continue; }
		
		let results = compare.compare(oldParsedJson[i]["list"], newParsedJson[i]["list"], oldParsedJson[i]["id"]);
		if ( results["diffrences"].length != 0 ) { compared.push(results); }
		
	}
	
	return compared;
	
}


//----------------------------------------------------------//
function load_json(fPath){
	let rawdata = fs.readFileSync(fPath, {encoding:'utf8'});
	let data = JSON.parse(rawdata);
	return data;
}

function write_Stuff (arr){
	const fs = require('fs');
	let stuff = JSON.stringify(arr, null, 1);
	fs.writeFile("Results.json", stuff, (err) => {
		if (err) {
			console.error(err);
		}
	});
}