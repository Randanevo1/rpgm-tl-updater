# rpgm-tl-tools
tools related to translating rpg maker games

started this to hopefully help in the translation of rpg maker games 

# Comparer
Takes two rpgm mv data directories and compares them to find strings that have been changed

currently only supports rpgm MV

To run from command line

- You need to have javascript installed
- download repository
- Open the paths.js file in rpgm-tl-tools\tools\Comparer\js
- Add the old and new directory paths for the game
- Open command line in rpgm-tl-tools\tools\Comparer\js
- Execute MainCompare.js with "node MainCompare.js"

To run with .exe

- Open paths.js
- Add the old and new directory paths for the game
- run exe

Results.json will have the names of the files that were compared in "differences". 

it will have all the id's that were different and what entries in that id were diffrent as well as how many diffrences in that entry
