# rpgm-tl-tools
tools related to translating rpg maker games

started this to hopefully help in the translation of rpg maker games 

# Comparer
Takes two rpgm mv data directories and compares them to find strings that have been changed

To run

- You need to have javascript installed
- download repository
- Open command line in rpgm-tl-tools\tools\Comparer\js
- Execute MainCompare.js with the arguments "node MainCompare.js old_data_folder_here new_data_folder_here"
- After it is done it will save the results in a json in the Comparer folder called "Results.json"

Results.json will have the names of the files that were compared in "differences". 
it will have all the id's that were different and what entries in that id were diffrent as well as how many diffrences in that entry
