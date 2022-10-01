'use strict';

//---------------------------------------------------------//

const jparse  = require("./../../../lib/rpgmv/Parsers");
const compare = require("./../../../lib/general/compare");
const fileGet = require("./../../../lib/general/file_getter");
const dirFilt = require("./../../../lib/general/directory_files_filter");
const dirComp = require("./../../../lib/general/directory_compare");

//---------------------------------------------------------//


const old_dir_path = "./dataold";//process.argv[process.argv.length -2];
const new_dir_path = "./datanew";//process.argv[process.argv.length -1];

const valid_file_names = ["Actors", "Weapons", "Armors", "System", "Troops", "Enemies", "CommonEvents", "Classes", "Skills", "States", "Map"];

let oldFiles = fileGet.get_dir_files(old_dir_path, "json");
let newFiles = fileGet.get_dir_files(new_dir_path, "json");

let oldNames = dirFilt.file_filter(oldFiles, valid_file_names);
let newNames = dirFilt.file_filter(newFiles, valid_file_names);





//----------------------------------------------------------//
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