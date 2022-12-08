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
            if (!grid[grid.length - 1 - profondeur][i].visible && maxSiOnDescendLigne(grid, grid.length - 1 - profondeur, i)) {
                grid[grid.length - 1 - profondeur][i].visible = true;
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        if (profondeur === 0) {
            grid[i][0].visible = true;
        } else {
            if (!grid[i][profondeur].visible && maxSiOnVaGauche(grid, i, profondeur)) {
                grid[i][profondeur].visible = true;
            }
        }
    }

    if (profondeur < ((grid.length - 1))) {
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
                // grid[i][j].value = '.';
            }
        }
    }
    return count;
}

// makeTurn(grid, 0);

// console.log(calculVisible(grid));

function calculUp(grid: Array<any>, i: number, j: number) {
    if (i === 0) {
        return 0;
    }
    let howManyIsee = 0;
    let lastMax = 0;
    let smaller = true;
    for (let x = i - 1; x >= 0; x--) {
        if (grid[x][j].value < grid [i][j].value && smaller) {
            howManyIsee++;
        } else if (grid[x][j].value >= grid [i][j].value ) {
            lastMax = grid[x][j].value;
            smaller = false;
            howManyIsee++;

            return howManyIsee;
        }
    }
    return howManyIsee;
}

function calculDown(grid: Array<any>, i: number, j: number) {
    if (i === grid.length - 1) {
        return 0;
    }
    let howManyIsee = 0;
    let lastMax = 0;
    let smaller = true;

    for (let x = i + 1; x < grid.length; x++) {
        if (grid[x][j].value < grid[i][j].value && smaller) {
            howManyIsee++;
        } else if (grid[x][j].value >= grid[i][j].value ) {
            lastMax = grid[x][j].value;
            smaller = false;
            howManyIsee++;

            return howManyIsee;
        }
    }
    return howManyIsee;
}


function calculRight(grid: Array<any>, i: number, j: number) {
    if (j === grid.length - 1) {
        return 0;
    }
    let howManyIsee = 0;
    let lastMax = 0;
    let smaller = true;
    for (let y = j + 1; y < grid.length; y++) {
        if (grid[i][y].value < grid[i][j].value && smaller) {
            howManyIsee++;
        } else if (grid[i][y].value >= grid[i][j].value ) {
            lastMax = grid[i][y].value;
            smaller = false;
            howManyIsee++;

            return howManyIsee;
        }
    }
    return howManyIsee;
}


function calculLeft(grid: Array<any>, i: number, j: number) {
    if (j === grid.length - 1) {
        return 0;
    }
    let howManyIsee = 0;
    let lastMax = 0;

    let smaller = true;
    for (let y = j - 1; y >= 0; y--) {
        if (grid[i][y].value < grid [i][j].value && smaller) {
            howManyIsee++;
        } else if (grid[i][y].value >= grid [i][j].value ) {
            lastMax = grid[i][y].value;
            smaller = true;
            howManyIsee++;

            return howManyIsee;
        }
    }
    return howManyIsee;
}

let maxTrees = 0;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        let up = calculUp(grid, i, j);
        let down = calculDown(grid, i, j);
        let left = calculLeft(grid, i, j);
        let right = calculRight(grid, i, j);

        if (up === 0) {
            up = 1;
        }
        if (down === 0) {
            down = 1;
        }
        if (left === 0) {
            left = 1;
        }
        if (right === 0) {
            right = 1;
        }
        let cal = up * down * left * right;
        if (cal > maxTrees) {
            maxTrees = cal;
        }
    }
}

console.log('Max trees : ' + maxTrees);


let lines = '';
for (let i = 0; i < grid.length; i++) {
    let c = '';
    for (let j = 0; j < grid.length; j++) {
        c += grid[i][j].value;
    }
    lines += c + '\n';
}
// console.log(lines);




