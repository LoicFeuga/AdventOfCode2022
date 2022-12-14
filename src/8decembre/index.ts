import * as fs from 'fs';
import * as path from 'path';

let inputFile = fs.readFileSync(path.resolve('./data/input8.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');
tab = tab.splice(0, tab.length - 1);
let grid = [];

for (let i = 0; i < tab.length; i++) {
    grid.push(tab[i].split('').map((v) => {
        return {value: +v, visible: false}
    }));
}

function maxSiOnRemonteLigne(grid: Array<any>, ii: number, j: number) {
    let nbrs = [];
    for (let i = ii - 1; i >= 0; i--) {
        nbrs.push(grid[i][j].value);
    }
    return Math.max(...nbrs) < grid[ii][j].value;

}

function maxSiOnDescendLigne(grid: Array<any>, ii: number, j: number) {
    let nbrs = [];
    for (let i = ii + 1; i < grid.length; i++) {
        nbrs.push(grid[i][j].value);
    }
    return Math.max(...nbrs) < grid[ii][j].value;

}

function maxSiOnVaDroite(grid: Array<any>, i: number, jj: number) {
    let nbrs = [];
    for (let j = jj + 1; j < grid[i].length; j++) {
        nbrs.push(grid[i][j].value);
    }
    return Math.max(...nbrs) < grid[i][jj].value;
}

function maxSiOnVaGauche(grid: Array<any>, i: number, jj: number) {
    let nbrs = [];
    for (let j = jj - 1; j >= 0; j--) {
        nbrs.push(grid[i][j].value);
    }
    return Math.max(...nbrs) < grid[i][jj].value;
}

function makeTurn(grid: Array<any>, profondeur: number): any {
    for (let i = 0; i < grid.length; i++) {
        if (profondeur === 0) {
            grid[0][i].visible = true;
        } else {
            if (!grid[profondeur][i].visible
                && maxSiOnRemonteLigne(grid, profondeur, i)) {
                grid[profondeur][i].visible = true;
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        if (profondeur === 0) {
            grid[i][grid.length - 1].visible = true;
        } else {
            if (!grid[i][grid.length - 1 - profondeur].visible && maxSiOnVaDroite(grid, i, grid.length - profondeur - 1)) {
                grid[i][grid.length - 1 - profondeur].visible = true;
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        if (profondeur === 0) {
            grid[grid.length - 1][i].visible = true;
        } else {
            if (!grid[grid.length - 1 - profondeur][i].visible && maxSiOnDescendLigne(grid, grid.length - 1 - profondeur,i)) {
                grid[grid.length - 1 - profondeur][i].visible = true;
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        if (profondeur === 0) {
            grid[i][0].visible = true;
        } else {
            if (!grid[i][profondeur].visible && maxSiOnVaGauche(grid,i,profondeur)) {
                grid[i][profondeur].visible = true;
            }
        }
    }

    if (profondeur < ((grid.length - 1) )) {
        profondeur++;
        return makeTurn(grid, profondeur);
    }
}

function calculVisible(grid: Array<any>) {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].visible) {
                count++;
                // grid[i][j].value = '.';
            } else {

                grid[i][j].value = '.';
            }
        }
    }
    return count;
}

makeTurn(grid, 0);

console.log(calculVisible(grid));

let lines = '';
for (let i = 0; i < grid.length; i++) {
    let c = '';
    for (let j = 0; j < grid.length; j++) {
        c += grid[i][j].value;
    }
    lines += c + '\n';
}
console.log(lines);




