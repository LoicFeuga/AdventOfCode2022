import * as fs from 'fs';
import * as path from 'path';
import {Parser} from "./parser.model";

let inputFile = fs.readFileSync(path.resolve('./data/input11easy.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');
let parser: Parser = new Parser(tab);
let monkeys = parser.output;
let a = BigInt('2');
for (let i = 0; i < 1000; i++) {
    a *= a;
}
console.log(a);

/*
for (let i = 1; i < 10001; i++) {
    console.log('Round ' + i);

    for (let monkey of monkeys) {
        for (let k = 0; k < monkey.items.length; k++) {
            monkey.operation.apply(monkey.items[k]);
            let nI = (eval(monkey.operation.calcul));
            if(Math.sqrt(nI) % 1 === 0 && Math.sqrt(nI) > 100) {
                nI = Math.sqrt(nI);
            }
            monkey.inspectedItem++;
            if (nI % monkey.thrown.divisibleBy === 0) {
                monkeys[monkey.thrown.yes].items.push(nI);
            } else {
                monkeys[monkey.thrown.no].items.push(nI);
            }
            monkey.items.shift();
            k--;

        }
    }

    for (let m of monkeys) {
        console.log('Monkey ' + m.id + ': ' + m.items);
    }

}

monkeys = monkeys.sort((a, b) => {
    return a.inspectedItem > b.inspectedItem ? -1 : 1;
})
console.log(monkeys[0].inspectedItem * monkeys[1].inspectedItem);

*/
