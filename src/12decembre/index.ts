import * as fs from 'fs';
import * as path from 'path';
import {Parser} from "./parser.model";
import {Grid} from "./grid.model";

let inputFile = fs.readFileSync(path.resolve('./data/input12.txt'), {encoding: 'utf-8'});
let bra = fs.readFileSync(path.resolve('./a.json'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');
tab = tab.splice(0, tab.length -1);
let parser = new Parser(tab);
let grid = new Grid(parser.output);



let max = 0;
// for (let i = 0; !grid.ending; i++) {
//     grid.nextMove();
//
//
//     if(grid.restart) {
//         // max = max > grid.step ? max : grid.step;
//         // console.log(max);
//         grid.render();
//         grid.clear();
//
//         parser = new Parser(tab);
//         grid = new Grid(parser.output);
//         Grid.brain.push({
//             distance:10000,
//             tab:[]
//         })
//         // console.log(Grid.brain);
//
//         grid.restart = false;
//     }
// }

// grid.render();
