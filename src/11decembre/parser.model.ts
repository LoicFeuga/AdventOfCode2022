import {Monkey} from "./monkey.model";
import {Thrown} from "./thrown.model";
import {Operation} from "./operation.model";

export class Parser {
    input: Array<string>;
    output: Array<Monkey>;

    constructor(input: Array<string>) {
        this.input = input;
        this.output = [];
        this.launch();
    }

    launch() {
        let monkeyEnCours = false;
        let testEnCours = false;
        let monkey: Partial<Monkey> = {};
        let thrown: Partial<Thrown> = {};

        for (let t of this.input) {
            if (!monkeyEnCours) {
                if (t.includes('Monkey')) {
                    monkey = {
                        id: +t.split('Monkey ')[1].split(':')[0]
                    }
                }
                monkeyEnCours = true;
            } else {
                if (t.includes('Starting items')) {
                    let items = t.split('Starting items: ')[1].split(',').map(c => +(c));
                    monkey.items = [...items];

                }

                if (t.includes('Operation')) {
                    let op: Operation = new Operation(t.split('Operation: new = ')[1])
                    monkey.operation = op;

                }


                if (testEnCours) {
                    if (t.includes('If true:')) {
                        thrown.yes = +t.split('If true: throw to monkey ')[1]
                    }
                    if (t.includes('If false:')) {
                        thrown.no = +t.split('If false: throw to monkey ')[1]
                        monkey.thrown = thrown as Thrown;
                        thrown = {}
                        monkey.inspectedItem = 0;
                        this.output.push(monkey as Monkey);
                    }
                }

                if (t.includes('Test:')) {
                    thrown.divisibleBy = +t.split('Test: divisible by ')[1];
                    testEnCours = true;
                }

                if (t === '') {
                    monkeyEnCours = false;
                    testEnCours = false

                }
            }

        }
    }

}
