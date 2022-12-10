import * as fs from 'fs';
import * as path from 'path';
import {Grid} from "./grid2.model";

let inputFile = fs.readFileSync(path.resolve('./data/input9easy2.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');
tab = tab.splice(0, tab.length - 1);

let grid: Grid = new Grid();
grid.placeCordeInitial(0,0);

let i =0;

for(let line of tab) {
    let direction = line.split(' ')[0];
    let distance = +line.split(' ')[1];

    grid.moveCorde(direction, distance);


}

grid.render();

console.log(grid.points.filter(p => p.bothPassed).length)
