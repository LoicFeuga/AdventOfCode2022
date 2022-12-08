import * as fs from 'fs';
import * as path from 'path';

let inputFile = fs.readFileSync(path.resolve('./data/input4.txt'), {encoding: 'utf-8'});
let tab = inputFile.split(';');

console.log(tab);
let count = 0;
for(let i = 0; i < tab.length;i++){
    let ttt = tab[i];
    let e1Gauche = +(tab[i].split(',')[0].split('-')[0]);
    let e1Droite = +tab[i].split(',')[0].split('-')[1];
    let e2Gauche = +tab[i].split(',')[1].split('-')[0];
    let e2Droite = +tab[i].split(',')[1].split('-')[1];


    if((e1Gauche >= e2Gauche && e1Droite <= e2Droite) || (e2Gauche >= e1Gauche && e2Droite <= e1Droite) ||

        (e2Gauche >= e1Gauche && e2Gauche <= e1Droite) || (e2Droite <= e1Droite && e2Droite >= e1Gauche )
    ){
        count++;
    }

}

console.log(count);
