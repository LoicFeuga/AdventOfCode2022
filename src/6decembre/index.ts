import * as fs from "fs";
import * as path from "path";

let inputFile = fs.readFileSync(path.resolve('./data/input6.txt'), {encoding: 'utf-8'});


let four = [];

for(let i = 0; i < inputFile.length; i++ ) {
    four.push(inputFile[i])
    four.push(inputFile[i+1])
    four.push(inputFile[i+2])
    four.push(inputFile[i+3])
    
    if(four.length === Array.from(new Set(four)).length) {
        console.log(i + 4);
        break;
            
    }
    four = []
}
