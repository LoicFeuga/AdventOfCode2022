import * as fs from 'fs';
import * as path from 'path';

let inputFile = fs.readFileSync(path.resolve('./data/input10.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');
let X = 1;
let strengh = 0;
let tabStr = [];

interface Instruction {
    commande: string;
    value?: number;
}

let actionEnCours: Instruction | null = null;

let indexInstruction = 0;

for (let i = 1; indexInstruction < tab.length; i++) {

    console.log('Cycle '+i+ ' : ');



    if (i === 20 || i === 60 || i === 100 || i === 140 || i === 180 || i === 220) {
        let cyclStrengh = i * X;
        tabStr.push(cyclStrengh);
        console.log(cyclStrengh);
    }

    if (actionEnCours) {

        if (actionEnCours.commande === 'addx') {
            X += actionEnCours.value!;
        }

        actionEnCours = null;

    } else {
        let commande = tab[indexInstruction].split(' ')[0];
        if (commande === 'noop') {
            /*actionEnCours = {
                commande: tab[indexInstruction].split(' ')[0]
            }*/
        } else {
            actionEnCours = {
                commande: tab[indexInstruction].split(' ')[0],
                value: +tab[indexInstruction].split(' ')[1]
            }
        }
        indexInstruction++;
    }

}

    strengh = tabStr[0] +  tabStr[1] + tabStr[2] + tabStr[3] + tabStr[4] + tabStr[5];

        console.log(strengh);

