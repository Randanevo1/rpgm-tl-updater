'use strict';

//---------------------------------------------------------//

const jparse  = require("./../../../lib/rpgmv/Parsers");
const compare = require("./../../../lib/general/compare");
const fileGet = require("./../../../lib/general/file_getter");
const dirFilt = require("./../../../lib/general/directory_files_filter");
const dirComp = require("./../../../lib/general/directory_compare");

//---------------------------------------------------------//


const valid_Jsons = ["Actors.json", "Weapons.json", "Armors.json", "System.json", "Troops.json", "Enemies.json", "CommonEvents.json", "Classes.json", "Skills.json", "States.json", "Map"];





//
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