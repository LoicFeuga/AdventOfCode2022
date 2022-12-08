import * as fs from 'fs';
import * as path from 'path';

let inputFile = fs.readFileSync(path.resolve('./data/input3.txt'), {encoding: 'utf-8'});
let tab = inputFile.split(';');

let sumPrio = 0;

for (let k = 0; k < tab.length ; k+=3) {
    const item1 = tab[k];
    const item2 = tab[k+1];
    const item3 = tab[k+2];
        let found = false;
    for (let i = 0; i < item1.length; i++, found = false ) {
        for (let j = 0; j < item2.length && !found; j++) {

            if (item1[i] === item2[j]) {
                for(let l = 0; l < item3.length && !found; l++ ) {

                    if (item1[i] === item3[l]) {
                        let prio = 0;
                        if (item1[i].toLowerCase() === item1[i]) {
                            prio += item1[i].charCodeAt(0) - 96;
                        } else {
                            prio += item1[i].charCodeAt(0) - 38;
                        }
                        sumPrio += prio;
                        found = true;
                    }
                }
            }
        }
        if(found) {
            break;
        }
    }
}

console.log(sumPrio);
