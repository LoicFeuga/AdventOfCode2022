import {Point} from "./point.model";
import {XY} from "./xy.model";

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

    constructor(map: Array<Array<Point>>) {
        this.map = map;
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j].value === 'S') {
                    this.i = i;
                    this.j = j;
                    return;
                }
            }
        }
        this.i = 0;
        this.j = 0;
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

            if (Grid.try > 10000) {
                let a = [...Grid.brain].sort((a, b) => {
                    return a.distance < b.distance ? -1 : 1
                });
                if (a.length > (this.step)) {
                    c = a[0].tab[this.step];
                }
                if ((this.step + 50) > a[0].tab.length) {
                    c = this.getRandomInt(moves.length);
                }
            } else {

            }
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
            Grid.brain[Grid.try].distance = (this.eI - this.i) + (10 * (this.eJ - this.j));
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
                (this.map[this.i - 1][this.j].value === this.map[this.i][this.j].value) ||
                (this.map[this.i - 1][this.j].value === 'a' && this.map[this.i][this.j].value === 'S') ||
                (this.map[this.i - 1][this.j].value.charCodeAt(0) === (this.map[this.i][this.j].value.charCodeAt(0) + 1)) ||
                (this.map[this.i - 1][this.j].value === 'E'))) {
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
                (this.map[this.i + 1][this.j].value === this.map[this.i][this.j].value) ||
                (this.map[this.i + 1][this.j].value === 'a' && this.map[this.i][this.j].value === 'S') ||
                (this.map[this.i + 1][this.j].value.charCodeAt(0) === (this.map[this.i][this.j].value.charCodeAt(0) + 1)) ||
                (this.map[this.i + 1][this.j].value === 'E'))) {
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
                (this.map[this.i][this.j - 1].value === this.map[this.i][this.j].value) ||
                (this.map[this.i][this.j - 1].value === 'a' && this.map[this.i][this.j].value === 'S') ||
                (this.map[this.i][this.j - 1].value.charCodeAt(0) === (this.map[this.i][this.j].value.charCodeAt(0) + 1)) ||
                (this.map[this.i][this.j - 1].value === 'E'))) {
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
                (this.map[this.i][this.j + 1].value === this.map[this.i][this.j].value) ||
                (this.map[this.i][this.j + 1].value === 'a' && this.map[this.i][this.j].value === 'S') ||
                (this.map[this.i][this.j + 1].value.charCodeAt(0) === (this.map[this.i][this.j].value.charCodeAt(0) + 1)) ||
                (this.map[this.i][this.j + 1].value === 'E'))) {
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

    getRandomInt(max
                     :
                     number
    ) {
        return Math.floor(Math.random() * max);
    }
}
