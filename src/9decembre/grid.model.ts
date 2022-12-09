import {Point} from "./point.model";

export class Grid {
    points: Array<Point> = [];

    placeCordeInitial(x: number, y: number) {
        let p: Point = {
            bothPassed: false,
            hPassed: true,
            tPassed: false,
            x: 0,
            y: 0,
            label: 'H',
        }
        this.points.push(p);
        this.placeCordeT();
    }

    moveCorde() {

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


    async moveCordeD(distance: number) {
        for (let i = 0; i < distance; i++) {
            let h = this.getHPoint();
            let t = this.getTPoint();

            let newH = {...h};
            let nPh = this.getDotPoint(newH.x,newH.y);

            h.label = h.bothPassed ? '#' : '.';
            newH.y--;

            newH.label = 'H';
            newH.tPassed =  nPh ? nPh.tPassed : false;
            newH.bothPassed =  nPh ? nPh.bothPassed : false;
            this.points.push(newH);

            if (Math.max(newH.y, t.y) > (Math.min(newH.y, t.y) + 1)) {
                let newT = {...t};
                if (t.hPassed && t.tPassed) {
                    t.bothPassed = true;
                    t.label = '#';

                }


                newT.y--;
                if(newT.x != newH.x) {
                    newT.x = newH.x;
                }
                newT.tPassed = true;
                this.points.push(newT);
            }

            this.clearGrid();
        }
    }

    async moveCordeU(distance: number) {
        for (let i = 0; i < distance; i++) {
            let h = this.getHPoint();
            let t = this.getTPoint();

            let newH = {...h};

            h.label = h.bothPassed ? '#' : '.';
            newH.y++;
            newH.label = 'H';
            let nPh = this.getDotPoint(newH.x,newH.y);
            newH.tPassed =  nPh ? nPh.tPassed : false;
            newH.bothPassed =  nPh ? nPh.bothPassed : false;
            this.points.push(newH);

            if (Math.max(newH.y, t.y) > (Math.min(newH.y, t.y) + 1)) {
                let newT = {...t};
                if (t.hPassed && t.tPassed) {
                    t.bothPassed = true;
                    t.label = '#';
                }
                newT.y++;
                if(newT.x != newH.x) {
                    newT.x = newH.x;
                }
                newT.tPassed = true;

                this.points.push(newT);
            }

            this.clearGrid();

        }
    }

    async moveCordeR(distance: number) {

        for (let i = 0; i < distance; i++) {
            let h = this.getHPoint();
            let t = this.getTPoint();

            let newH = {...h};

            h.label = h.bothPassed ? '#' : '.';
            newH.x++;
            newH.label = 'H';
            let nPh = this.getDotPoint(newH.x,newH.y);
            newH.tPassed =  nPh ? nPh.tPassed : false;
            newH.bothPassed =  nPh ? nPh.bothPassed : false;
            this.points.push(newH);

            if (Math.max(newH.x, t.x) > (Math.min(newH.x, t.x) + 1)) {
                let newT = {...t};
                if (t.hPassed && t.tPassed) {
                    t.bothPassed = true;
                    t.label = '#';
                }

                newT.x++;
                if(newT.y != newH.y) {
                    newT.y = newH.y;
                }
                newT.tPassed = true;
                this.points.push(newT);
            }

            this.clearGrid();

        }

    }

    moveCorde(direction: string, distance: number) {

        for (let k = 0; k < distance; k++) {
            let h = this.getHPoint();
            let t = this.getTPoint();

        }
    }

    async moveCordeL(distance: number) {

        for (let i = 0; i < distance; i++) {
            let h = this.getHPoint();
            let t = this.getTPoint();

            let newH = {...h};

            h.label = h.bothPassed ? '#' : '.';
            newH.x--;
            newH.label = 'H';

            let nPh = this.getDotPoint(newH.x,newH.y);
            newH.tPassed =  nPh ? nPh.tPassed : false;
            newH.bothPassed =  nPh ? nPh.bothPassed : false;
            this.points.push(newH);

            if (Math.max(newH.x, t.x) > (Math.min(newH.x, t.x) + 1)) {
                let newT = {...t};
                if (t.hPassed && t.tPassed) {
                    t.bothPassed = true;
                    t.label = '#';

                }

                newT.x--;
                if(newT.y != newH.y) {
                    newT.y = newH.y;
                }
                newT.tPassed = true;
                this.points.push(newT);
            }


            this.clearGrid();
        }

    }

    clearGrid() {
        let dot = this.points.filter(p => p.label !== '.' && p.bothPassed);
        for(let dd of dot){
            let index = this.points.findIndex(p => p.x === dd.x && p.y === dd.y && p.label === "." );
            if(index > -1) {
                this.points.splice(index,1);
                this.clearGrid();
            }
        }
    }
    findIndexOf(p: Point) {
        return this.points.findIndex(p => p === p);
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

    async render() {
        let yM: Array<any> = this.points.map(p => p.y);
        let yMax = Math.max(...yM);
        let xM: Array<any> = this.points.map(p => p.x);
        let xMax = Math.max(...xM);

        for(let y = yMax; y >= 0; y--){
            let l = this.points.filter(p => p.y === y).sort((a,b) => {
                return a.x < b.x ? -1 : 1;
            });
            let line = '';
            for(let i = 0, ii = 0; i <= xMax;i++){
                if((l[ii]?.x === i && l[ii]?.y ===y )){
                    line+=l[ii].bothPassed ? '#' : l[ii].label;
                    ii++;
                } else {
                    line+='.';
                }
            }
            console.log(line);
        }

    }

}
