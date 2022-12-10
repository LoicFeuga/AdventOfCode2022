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
    }

    moveBody(direction: string, depth: number) {

        let before: {x: number, y: number};
        let after: {x: number, y: number};
        if(depth === -1){
            before = {x: this.corde.xH, y: this.corde.yH};
            after = {x: this.corde.body[depth + 1].x, y: this.corde.body[depth + 1].y}
        } else if(depth === 7) {
            before = {x: this.corde.body[depth].x, y: this.corde.body[depth].y}
            after = {x: this.corde.xT, y: this.corde.yT}
        }
        else {
            before = {x: this.corde.body[depth].x, y: this.corde.body[depth].y}
            after = {x: this.corde.body[depth + 1].x, y: this.corde.body[depth + 1].y}
        }
        switch (direction) {
            case 'U':
                if (Math.max(before.y, after.y) > (Math.min(before.y, after.y) + 1)) {
                    after.y++;
                    if (before.x != after.x) {
                        after.x = before.x;
                    }
                }
                break;
            case 'R':
                if (Math.max(before.x, after.x) > (Math.min(before.x, after.x) + 1)) {
                    after.x++;
                    if (before.y != after.y) {
                        after.y = before.y;
                    }
                }
                break;
            case 'D':
                if (Math.max(before.y, after.y) > (Math.min(before.y, after.y) + 1)) {
                    after.y--;
                    if (before.x != after.x) {
                        after.x = before.x;
                    }
                }
                break;
            case 'L':
                if (Math.max(before.x, after.x) > (Math.min(before.x, after.x) + 1)) {
                    after.x--;
                    if (before.y != after.y) {
                        after.y = before.y;
                    }
                }
                break;
        }

        if(depth === 7) {
            this.corde.xT = after.x;
            this.corde.yT = after.y;
            return;
        }
        else {
            this.corde.body[depth + 1].x = after.x;
            this.corde.body[depth + 1].y = after.y;
            this.moveBody(direction, depth+1);
        }
    }

    moveCorde(direction: string, distance: number) {

        for (let k = 0; k < distance; k++) {

            switch (direction) {
                case 'U':
                    this.corde.yH++;
                    this.moveBody(direction,-1);
                    break;
                case 'R':
                    this.corde.xH++;
                    this.moveBody(direction,-1);
                    break;
                case 'L':
                    this.corde.xH--;
                    this.moveBody(direction,-1);

                    break;
                case 'D':
                    this.corde.yH--;
                    this.moveBody(direction,-1);

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
                console.log(nextT.x + ' ; ' + nextT.y);

            } else {
                this.points.push({bothPassed: false, hPassed: true, label: "", tPassed: true, x: this.corde.xT, y: this.corde.yT})
            }


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

    private getDotPoint(x: number, y: number): Point | undefined {
        return this.points.find(p => p.y === y && p.x === x);
    }

}
