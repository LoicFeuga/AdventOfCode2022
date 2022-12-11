export class Operation {
    calcul: string;
    calculOriginel: string;

    constructor(c: string) {
        this.calcul = c;
        this.calculOriginel = c;
    }

    apply(val: number){
        let c = this.calculOriginel;
        this.calcul = c.replace('old', val+'');
        this.calcul = this.calcul.replace('old', val+'');
    }

}

