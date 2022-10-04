'use strict';

//---------------------------------------------------------//

const fs = require('fs');
const jparse  = require("./../../../lib/rpgmv/Parsers");
const compare = require("./../../../lib/general/compare");
const fileGet = require("./../../../lib/general/file_getter");
const dirFilt = require("./../../../lib/general/directory_files_filter");
const dirComp = require("./../../../lib/general/directory_compare");

//---------------------------------------------------------//


const old_dir_path = process.argv[process.argv.length -2];
const new_dir_path = process.argv[process.argv.length -1];

if ( fs.existsSync(old_dir_path) == false )     { return "invalid old directory path"; }
else if ( fs.existsSync(new_dir_path) == false ){ return "invalid new directory path"; }

const valid_file_mv_names = ["Actors", "Weapons", "Armors", "System", "Troops", "Enemies", "CommonEvents", "Classes", "Skills", "States", "Map"];

const oldFiles  = fileGet.get_dir_files(old_dir_path, "json");
const newFiles  = fileGet.get_dir_files(new_dir_path, "json");

// get files that have the same name as "valid_file_mv_names"
const oldNames  = dirFilt.file_filter(oldFiles, valid_file_mv_names);
const newNames  = dirFilt.file_filter(newFiles, valid_file_mv_names);

// gets names of files that are in both old & new folders and names of missing/additonal files
const compareResults = dirComp.compare_dir_files(oldNames, newNames);

const sizes = dirComp.get_sizes(old_dir_path, new_dir_path, compareResults["inBoth"]);

let   changedFiles = [];

// Get files that have been changed based off thier file sizes
for (let i = 0; i < sizes.length; ++i) {
	
	if (sizes[i][1] != 0){
		
		if (sizes[i][0] == "MapInfos.json"){ continue; }
		changedFiles.push(sizes[i][0]);
		
	}
}


let results = [];
// Loops through changed files 
// calls the correct parser on each file than gives it to comparer
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

write_to_json(results);

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

function write_to_json (arr){
	let stuff = JSON.stringify(arr, null, 1);
	fs.writeFile("./../Results.json", stuff, (err) => {
		if (err) {
			console.error(err);
		}
	});
}