import * as fs from 'fs';
import * as path from 'path';

let inputFile = fs.readFileSync(path.resolve('./data/input3.txt'), {encoding: 'utf-8'});
let tab = inputFile.split(';');

let sumPrio = 0;

for (let item of tab) {
    const item1 = item.slice(0, item.length / 2);
    const item2 = item.slice(item.length / 2, item.length);
        let found = false;
    for (let i = 0; i < item1.length; i++, found = false ) {
        for (let j = 0; j < item2.length && !found; j++) {

            if (item1[i] === item2[j]) {
                let prio = 0;
                if(item1[i].toLowerCase() === item1[i]){
                    prio += item1[i].charCodeAt(0) - 96;
                }else {
                    prio += item1[i].charCodeAt(0) - 38;
                }
                console.log(item1[i] + '-' +prio);
                sumPrio += prio;
                found = true;
            }
        }
        if(found) {
            break;
        }
    }
}

console.log(sumPrio);
