const jparse = require("./../../../lib/rpgmv/Parsers.js");
const fs = require('fs');


let datanew = [
   [
    {
     "codetype": 102,
     "indent": 0,
     "parameters": [
      "\\C[22]♥誘惑en(v[261]>=300)",
      "\\C[14]♠窃盗en(v[263]>=20)",
      "\\C[3]☠攻撃en(v[263]>=100)"
     ]
    }
   ],
   [
    {
     "codetype": 401,
     "indent": 1,
     "parameters": "\\C[1]\\v[111]\\C[0]"
    },
    {
     "codetype": 401,
     "indent": 1,
     "parameters": "な、なにをする…んじゃ…"
    },
    {
     "codetype": 401,
     "indent": 1,
     "parameters": "げほぉ…"
    }
   ],
   [
    {
     "codetype": 102,
     "indent": 0,
     "parameters": [
      "\\C[22]♥誘惑en(v[261]>=300)",
      "\\C[14]♠窃盗en(v[263]>=20)",
      "\\C[3]☠攻撃en(v[263]>=100)"
     ]
    }
   ],
   [
    {
     "codetype": 102,
     "indent": 0,
     "parameters": [
      "if(v[])",
      "en(v[])"
     ]
    }
   ]
  ]

let values = Object.values(datanew[0][0])

console.log(values[2][0])









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
