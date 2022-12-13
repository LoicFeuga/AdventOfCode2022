import {Point} from "./point.model";
import {XY} from "./xy.model";
import * as fs from 'fs';
import {Noeud} from "./noeud.model";
import {StringDecoder} from "string_decoder";

export class Grid {
    static try = 0;
    static brain: Array<{ tab: Array<number>, distance: number }> = [];
    map: Array<Array<Point>> = [];
    i: number;
    j: number;
    step: number = 0;
    ending: boolean = false;
    restart: boolean = false;
    eI = 20;
    eJ = 148;
    dijkstra: Noeud;
    noeuds: Array<Noeud> = [];


    constructor(map: Array<Array<Point>>) {
        this.map = map;
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j].value === 'S') {
                    this.i = i;
                    this.j = j;
                    this.dijkstra = new Noeud(this.map[i][j].value, i, j);
                    this.addNoeud(this.dijkstra);
                    this.startSeeding(this.dijkstra, i, j);
                    this.renderTree();
                    return;
                }
            }
        }
        this.i = 0;
        this.j = 0;
        this.dijkstra = new Noeud(this.map[0][0].value, 0, 0);
    }

    addNoeud(noeud: Noeud): boolean {
        let find = this.noeuds.find((n) => n.id === noeud.id);
        if (!find) {
            this.noeuds.push(noeud);
            return true;
        } else {
            return false;
        }
    }

    startSeeding(currentNoeud: Noeud, i: number, j: number) {
        this.i = i;
        this.j = j;
        let moves = [this.moveDown(), this.moveUp(), this.moveLeft(), this.moveRight()];

        for (let move of moves) {
            if (move) {
                let noeud = new Noeud(this.map[move.i][move.j].value, move.i, move.j);

                if (this.noeuds.find(n => n.id === noeud.id)) {
                    continue;
                }
                if (currentNoeud.parents.find(p => p.id === noeud.id)) {
                    continue;
                }
                noeud.addParent(currentNoeud);
                this.addNoeud(noeud);
                currentNoeud.addChild(noeud);
                this.startSeeding(noeud, move.i, move.j);
            }
        }
    }

    nextMove() {
        if (this.ending) {
            console.log('END ' + this.step);
        }
        let moves = [this.moveDown(), this.moveUp(), this.moveLeft(), this.moveRight()];
        let endMove = moves.find(e => e?.ending);
        let c;
        if (!endMove) {
            moves = moves.filter(v => v !== null);

            c = this.getRandomInt(moves.length);
            let cBefore = c;

            // if (Grid.try > 1000) {
            let a = [...Grid.brain].sort((a, b) => {
                return a.distance < b.distance ? -1 : 1
            });
            if (a.length > (this.step)) {
                c = a[0].tab[this.step];
            }
            if ((this.step + 30) > a[0].tab.length) {

                // fs.writeFileSync('./a.json',JSON.stringify(a[0]));
                c = this.getRandomInt(moves.length);
            }
            // }
            // else {

            // }
        } else {
            moves = [endMove];
            c = 0;
            this.ending = true;
            console.log('END ' + this.step);
        }
        if (moves.length) {
            this.i = moves[c]!.i;
            this.j = moves[c]!.j;
            Grid.brain[Grid.try].tab.push(c);
            Grid.brain[Grid.try].distance = (this.eI - this.i) + ((this.eJ - this.j));
            this.map[this.i][this.j].visited = true;
            this.step++;
        } else {
            Grid.try++;
            this.restart = true;
        }
    }

    moveUp()
        :
        XY | null {
        let nI = this.i;
        if (this.i === 0) {
            return null;
        } else {
            if (!this.map[this.i - 1][this.j].visited && (
                (this.map[this.i - 1][this.j].value <= this.map[this.i][this.j].value && this.map[this.i - 1][this.j].value != 'E') ||
                (this.map[this.i - 1][this.j].value === 'a' && this.map[this.i][this.j].value === 'S') ||
                (this.map[this.i - 1][this.j].value.charCodeAt(0) === (this.map[this.i][this.j].value.charCodeAt(0) + 1)) ||
                (this.map[this.i - 1][this.j].value === 'E' && this.map[this.i][this.j].value === 'z' ))) {
                nI--;
                return {i: nI, j: this.j, ending: this.map[nI][this.j].value === 'E'};
            } else {
                return null;
            }
        }
    }


    moveDown()
        :
        XY | null {
        let nI = this.i;
        if (this.i >= (this.map.length - 1)) {
            return null;
        } else {
            if (!this.map[this.i + 1][this.j].visited && (
                (this.map[this.i + 1][this.j].value <= this.map[this.i][this.j].value && this.map[this.i + 1][this.j].value != 'E') ||
                (this.map[this.i + 1][this.j].value === 'a' && this.map[this.i][this.j].value === 'S') ||
                (this.map[this.i + 1][this.j].value.charCodeAt(0) === (this.map[this.i][this.j].value.charCodeAt(0) + 1)) ||
                (this.map[this.i + 1][this.j].value === 'E' && this.map[this.i][this.j].value === 'z' ))) {
                nI++;
                return {i: nI, j: this.j, ending: this.map[nI][this.j].value === 'E'};
            } else {
                return null;
            }
        }
    }


    moveLeft()
        :
        XY | null {
        let nJ = this.j;
        if (this.j == 0) {
            return null;
        } else {
            if (!this.map[this.i][this.j - 1].visited && (
                (this.map[this.i][this.j - 1].value <= this.map[this.i][this.j].value && this.map[this.i][this.j - 1].value != 'E') ||
                (this.map[this.i][this.j - 1].value === 'a' && this.map[this.i][this.j].value === 'S') ||
                (this.map[this.i][this.j - 1].value.charCodeAt(0) === (this.map[this.i][this.j].value.charCodeAt(0) + 1)) ||
                (this.map[this.i][this.j - 1].value === 'E' && this.map[this.i][this.j].value === 'z'))) {
                nJ--;
                return {i: this.i, j: nJ, ending: this.map[this.i][nJ].value === 'E'};
            } else {
                return null;
            }

        }
    }

    moveRight()
        :
        XY | null {
        let nJ = this.j;
        if (this.j >= this.map[0].length - 1) {
            return null;
        } else {
            if (!this.map[this.i][this.j + 1].visited && (
                (this.map[this.i][this.j + 1].value <= this.map[this.i][this.j].value && this.map[this.i][this.j + 1].value != 'E') ||
                (this.map[this.i][this.j + 1].value === 'a' && this.map[this.i][this.j].value === 'S') ||
                (this.map[this.i][this.j + 1].value.charCodeAt(0) === (this.map[this.i][this.j].value.charCodeAt(0) + 1)) ||
                (this.map[this.i][this.j + 1].value === 'E' && this.map[this.i][this.j].value === 'z'))) {
                nJ++;
                return {i: this.i, j: nJ, ending: this.map[this.i][nJ].value === 'E'};
            } else {
                return null;
            }
        }
    }


    render() {
        for (let i = 0; i < this.map.length; i++) {
            let line = "";
            for (let j = 0; j < this.map[i].length; j++) {
                line += this.i === i && this.j === j ? 'S' : this.map[i][j].visited ? '.' : this.map[i][j].value;
            }

            console.log(line);

        }
    }

    clear() {
        for (let i = 0; i < Grid.brain.length; i++) {
            for (let j = 0; j < Grid.brain.length; j++) {
                if (i === j) {
                    continue;
                }
                if (Grid.brain[i] === Grid.brain[j]) {
                    Grid.brain.slice(j, 1);
                    j--;
                }
            }
        }
    }

    renderTree() {

        for (let i = 0; i < this.map.length; i++) {
            let line = '';
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.noeuds.find(n => n.i === i && n.j === j)) {
                    line += '.';
                } else {
                    line += this.map[i][j].value;
                }
            }
            console.log(line);
        }

        let n = this.noeuds.find(n => n.value === 'E')!;
        this.findWayParent(n, 0);
    }

    findWayParent(noeud: Noeud, count: number) {
        if (noeud.value === 'S') {
            console.log('E: ' + count);
            return;
        }
        for (let parent of noeud.parents) {
            console.log(noeud.value);
            
            this.findWayParent(parent, count + 1);
        }
    }

    getRandomInt(max
                     :
                     number
    ) {
        return Math.floor(Math.random() * max);
    }
}
