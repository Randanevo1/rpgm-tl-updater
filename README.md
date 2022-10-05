# rpgm-tl-tools
tools related to translating rpg maker games

started this to hopefully help in the translation of rpg maker games 

# Comparer
Takes two rpgm mv data directories and compares them to find strings that have been changed

currently only supports rpgm MV

To run

- You need to have javascript installed
- download repository
- Open the paths.js file in rpgm-tl-tools\tools\Comparer\js
- Add the old and new directory paths
- paths need all \ to be replaced with \\\ and spaces need / 
- example path "old":"C:\\\Users\\\user\\\Desktop\\\game/ with/ spaces\\\www\\\data"

- Open command line in rpgm-tl-tools\tools\Comparer\js
- Execute MainCompare.js with "node MainCompare.js"
- After it is done it will save the results in a json in the Comparer folder called "Results.json"

Results.json will have the names of the files that were compared in "differences". 

it will have all the id's that were different and what entries in that id were diffrent as well as how many diffrences in that entry
