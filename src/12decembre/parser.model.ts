import {Point} from "./point.model";

export class Parser {
    output:Array<Array<Point>>;

    constructor(input: Array<string>) {
        this.output = [];
        for(let line of input){
            let p: Array<Point> = line.split('').map(e => {
                return {
                    value: e,
                    visited: e === 'S'
                }
            })
            this.output.push(p);
        }


    }

}
