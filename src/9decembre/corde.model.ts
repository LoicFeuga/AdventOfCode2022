export class Corde {
    xH: number;
    yH: number;
    body: Array<{ x: number, y: number }> = []
    xT: number;
    yT: number;

    constructor(initialX: number, initialY: number) {
        this.xH = initialX;
        this.yH = initialY;
        this.xT = initialX;
        this.yT = initialY;
        for (let i = 0; i < 8; i++) {
            this.body.push({x: initialX, y: initialY})
        }
    }

}
