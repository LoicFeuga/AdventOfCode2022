import {Operation} from "./operation.model";
import {Thrown} from "./thrown.model";

export class Monkey {
    id: number;
    items: Array<number>;
    operation: Operation;
    thrown: Thrown;
    inspectedItem: number = 0;

    constructor(id: number, items: Array<number>, operation: Operation, thrown: Thrown) {
        this.id = id;
        this.items = items;
        this.operation = operation;
        this.thrown = thrown;
    }

}
