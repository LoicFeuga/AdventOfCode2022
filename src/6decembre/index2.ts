import * as fs from "fs";
import * as path from "path";
let inputFile = fs.readFileSync(path.resolve('./data/input6.txt'), {encoding: 'utf-8'});
let four = [];

for(let i = 0; i < inputFile.length; i++ ) {
    for(let j = 0; j < 14; j++){
        four.push(inputFile[i+j])
    }
    if(four.length === Array.from(new Set(four)).length) {
        console.log(i + 14);
        break;
    }
    four = []
}
