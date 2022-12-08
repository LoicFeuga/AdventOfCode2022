import * as fs from 'fs';
import * as path from 'path';

let inputFile = fs.readFileSync(path.resolve('./data/input5.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');
// console.log(tab);

let cargos = [['C', 'Z', 'N', 'B', 'M', 'W', 'Q', 'V'], ['H', 'Z', 'R', 'W', 'C', 'B'], ['F', 'Q', 'R', 'J'], ['Z', 'S', 'W', 'H', 'F', 'N', 'M', 'T'],
    ['G', 'F', 'W', 'L', 'N', 'Q', 'P'], ['L', 'P', 'W'], ['V', 'B', 'D', 'R', 'G', 'C', 'Q', 'J'], ['Z', 'Q', 'N', 'B', 'W'], ['H', 'L', 'F', 'C', 'G', 'T', 'J']];

tab = tab.splice(10, tab.length);
// console.log(tab);

for (let i = 0; i < tab.length - 1; i++) {
    let times = +tab[i].split('from')[0].split('move')[1];
    let from = +tab[i].split('to')[0].split('from')[1];
    let to = +tab[i].split('to')[1]?.split('\r')[0];
    to = to - 1;
    from = from - 1;

    let pops = [];
    for (let j = 0; j < times; j++) {
        const pop = cargos[from].pop();
        pops.push(pop);
    }

    pops.reverse();

    for (let j = 0; j < pops.length; j++) {
        cargos[to].push(pops[j] || '');
    }
}

let message = "";

for (let i = 0; i < cargos.length; i++) {
    message += cargos[i].pop();
}

console.log(message);
