import * as fs from "fs";
import * as path from "path";

let inputFile = fs.readFileSync(path.resolve('./data/input1.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');


console.log(tab);

let max = 0;
let current = 0;
let maxes = [];

for(let i = 0; i< tab.length; i++){
    if(tab[i] === ""){
        if(current > max){
            max = current;
        }
        maxes.push(current);
        current =0;
    }else {
        current+= +tab[i];
    }
}
maxes.sort((a,b) => a > b ? -1 : 1);
console.log(maxes[0] + maxes[1] + maxes[2]);
console.log(max);

