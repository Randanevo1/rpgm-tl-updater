'use strict';

// Import start
const jparse  = require("./../../../lib/rpgmv/Parsers.js");
const compare = require("./../../../lib/general/compare");
// Import end


const argLen = process.argv.length;

// Checking if arg length is correct
if (argLen <= 2){
	console.log("ERROR: Missing 2 arguments");
	process.exit();
	}
if (argLen <= 3){
	console.log("ERROR: Missing 1 argument");
	process.exit();
}

const old_Game_Path = process.argv[argLen - 2];
const new_Game_Path = process.argv[argLen - 1];

const old_Game_Path_da = old_Game_Path + "//www//data";
//const old_Game_Path_js = old_Game_Path + "//www//plugins.js";
const new_Game_Path_da = new_Game_Path + "//www//data";
//const new_Game_Path_js = new_Game_Path + "//www//js//plugins.js";

// Checking if dir paths are valid
if (fs.existsSync(old_Game_Path_da)){}
else{
	console.log("Invalid old game directory");
	process.exit();
	}
if (fs.existsSync(new_Game_Path_da)){}
else{
	console.log("Invalid new game directory");
	process.exit();
	}

const old_Game_Data_Files = fs.readdirSync(old_Game_Path_da);
const new_Game_Data_Files = fs.readdirSync(new_Game_Path_da);

if (old_Game_Data_Files.length < new_Game_Data_Files.length){console.log("new files in new game directory detected");}
if (old_Game_Data_Files.length > new_Game_Data_Files.length){console.log("fewer files in new game directory detected");}

const valid_Jsons = ["Actors.json", "Weapons.json", "Armors.json", "System.json", "Troops.json", "Enemies.json", "CommonEvents.json", "Classes.json", "Skills.json", "States.json", "Map"];





function load_json(fPath){
	let rawdata = fs.readFileSync(fPath, {encoding:'utf8'});
	let data = JSON.parse(rawdata);
	return data;
}


//function write_Stuff (arr){
	//const fs = require('fs');
	//let stuff = JSON.stringify(arr);
	//fs.writeFile("stuff.json", stuff, (err) => {
		//if (err) {
			//console.error(err);
		//}
	//});
//}