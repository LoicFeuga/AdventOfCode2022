import * as fs from 'fs';
import * as path from 'path';
import {Corde} from "./corde.model";
import {Point} from "./point.model";
import {Grid} from "./grid.model";

let inputFile = fs.readFileSync(path.resolve('./data/input9easy.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');
tab = tab.splice(0, tab.length - 1);

let corde: Corde = new Corde(0,0);
let grid: Grid = new Grid();
grid.placeCordeInitial(0,0);

let i =0;

for(let line of tab) {
    let direction = line.split(' ')[0];
    let distance = +line.split(' ')[1];

    console.log(i++);

    switch (direction) {
        case 'U':
            grid.moveCordeU(distance);
            break;
        case 'R':
            grid.moveCordeR(distance);
            break;
        case 'D':
            grid.moveCordeD(distance);
            break;
        case 'L':
            grid.moveCordeL(distance);
            break;
    }


    grid.clearGrid();

}

grid.clearGrid();
grid.render();

console.log(grid.points.filter(p => p.bothPassed).length)
