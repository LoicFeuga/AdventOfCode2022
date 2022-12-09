import {Point} from "./point.model";
import {Corde} from "./corde.model";

export class Grid {
    points: Array<Point> = [];
    corde: Corde = new Corde(0, 0);

    placeCordeInitial(x: number, y: number) {
        let p: Point = {
            bothPassed: true, hPassed: true, label: "T", tPassed: true, x: 0, y: 0
        }
        this.points.push(p);
        // this.placeCordeT();
    }

    placeCordeT() {
        let h = this.getHPoint();
        h.tPassed = true;
        h.bothPassed = h.tPassed && h.hPassed;
        let t: Point = {
            bothPassed: true, hPassed: true, label: "T", tPassed: true, x: 0, y: 0
        }
        this.points.push(t);

    }

    moveCorde(direction: string, distance: number) {

        for (let k = 0; k < distance; k++) {

            switch (direction) {
                case 'U':
                    this.corde.yH++;
                    if (Math.max(this.corde.yH, this.corde.yT) > (Math.min(this.corde.yH, this.corde.yT) + 1)) {
                        this.corde.yT++;
                        if (this.corde.xT != this.corde.xH) {
                            this.corde.xT = this.corde.xH;
                        }
                    }
                    break;
                case 'R':
                    this.corde.xH++;
                    if (Math.max(this.corde.xH, this.corde.xT) > (Math.min(this.corde.xH, this.corde.xT) + 1)) {
                        this.corde.xT++;
                        if (this.corde.yT != this.corde.yH) {
                            this.corde.yT = this.corde.yH;
                        }
                    }
                    break;
                case 'L':
                    this.corde.xH--;
                    if (Math.max(this.corde.xH, this.corde.xT) > (Math.min(this.corde.xH, this.corde.xT) + 1)) {
                        this.corde.xT--;
                        if (this.corde.yT != this.corde.yH) {
                            this.corde.yT = this.corde.yH;
                        }
                    }
                    break;
                case 'D':
                    this.corde.yH--;
                    if (Math.max(this.corde.yH, this.corde.yT) > (Math.min(this.corde.yH, this.corde.yT) + 1)) {
                        this.corde.yT--;
                        if (this.corde.xT != this.corde.xH) {
                            this.corde.xT = this.corde.xH;
                        }
                    }
                    break;
            }

            let nextH = this.getDotPoint(this.corde.xH, this.corde.yH);
            if (nextH) {
                nextH.hPassed = true;
            } else {
                this.points.push({bothPassed: false, hPassed: true, label: "", tPassed: false, x: this.corde.xH, y: this.corde.yH})
            }
            let nextT = this.getDotPoint(this.corde.xT, this.corde.yT);
            if (nextT) {
                nextT.tPassed = true;
                if(nextT.hPassed) {
                    nextT.bothPassed = true;
                }
            } else {
                this.points.push({bothPassed: false, hPassed: true, label: "", tPassed: true, x: this.corde.xT, y: this.corde.yT})
            }


        }
    }

    clearGrid() {
        let dot = this.points.filter(p => p.label !== '.' && p.bothPassed);
        let f = false;
        for (let dd of dot) {
            let index = this.points.findIndex(p => p.x === dd.x && p.y === dd.y && p.label === ".");
            if (index > -1) {
                this.points.splice(index, 1);
                f = true;
            }
        }
        if (f) {

            this.clearGrid();
        }
    }

    async render() {
        let yM: Array<any> = this.points.map(p => p.y);
        let yMax = Math.max(...yM);
        let xM: Array<any> = this.points.map(p => p.x);
        let xMax = Math.max(...xM);

        for (let y = yMax; y >= 0; y--) {
            let l = this.points.filter(p => p.y === y).sort((a, b) => {
                return a.x < b.x ? -1 : 1;
            });
            let line = '';
            for (let i = 0, ii = 0; i <= xMax; i++) {
                if ((l[ii]?.x === i && l[ii]?.y === y)) {
                    line += l[ii].bothPassed ? '#' : '.';
                    ii++;
                } else {
                    line += '.';
                }
            }
            console.log(line);
        }

    }

    private getHPoint(): Point {
        return this.points.find(p => p.label === 'H')!;
    }

    private getTPoint(): Point {
        return this.points.find(p => p.label === 'T')!;
    }

    private getDotPoint(x: number, y: number): Point | undefined {
        return this.points.find(p => p.y === y && p.x === x);
    }

}
