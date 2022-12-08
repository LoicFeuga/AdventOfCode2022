import * as fs from 'fs';
import * as path from 'path';

let inputFile = fs.readFileSync(path.resolve('./data/input2.txt'), {encoding: 'utf-8'});
let tab = inputFile.split('\n');

enum Signe {
    "Rock",
    "Paper",
    "Scissors"
}


class Round {
    adv: Signe;
    moi: Signe;
    points: number;

    constructor(adv: string, moi: string) {
        this.adv = Signe.Rock;
        this.moi = Signe.Rock;
        switch (adv) {
            case 'A':
                this.adv = Signe.Rock;
                break;
            case 'B':
                this.adv = Signe.Paper;
                break;
            case 'C':
                this.adv = Signe.Scissors;
                break;
        }
        switch (moi) {
            case 'X':
                this.moi = Signe.Rock;
                break;
            case 'Y':
                this.moi = Signe.Paper;
                break;
            case 'Z':
                this.moi = Signe.Scissors;
                break;
        }
        this.points = 0;
    }

    private addPointAboutMySigne() {
        switch (this.moi) {
            case Signe.Rock:
                this.points += 1;
                break;
            case Signe.Paper:
                this.points += 2;
                break;
            case Signe.Scissors:
                this.points += 3;
                break;
        }
    }

    launchGame() {
        let win = false;
        switch (this.moi) {
            case Signe.Rock:
                if (this.adv === Signe.Scissors) {
                    win = true;
                }
                break;
            case Signe.Paper:
                if (this.adv === Signe.Rock) {
                    win = true;
                }
                break;
            case Signe.Scissors:
                if (this.adv === Signe.Paper) {
                    win = true;
                }
                break;
        }
        if (win) {
            this.points += 6;
        }

        if (this.adv === this.moi) {
            this.points += 3;
        }
        this.addPointAboutMySigne();
    }
}

let rounds: Array<Round> = [];
for (let i = 0; i < tab.length; i++) {
    let signes = tab[i].split(' ');
    if (signes[0] && signes[1]) {
        let round = new Round(signes[0], signes[1].charAt(0));
        rounds.push(round);
    }
}

for (let i = 0; i < rounds.length; i++) {
    rounds[i].launchGame();
}
console.log(rounds.reduce((acc, cur) => {
    return acc + cur.points;
}, 0));
