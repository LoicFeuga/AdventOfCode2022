export class Noeud {
    value: string;
    id: number;
    i: number;
    j: number;
    wayFinishing: boolean;
    children: Array<Noeud>;
    parents: Array<Noeud>;

    constructor(value: string, i: number, j: number) {
        this.value = value;
        this.id = (i * 1000) + j;
        this.i = i;
        this.j = j;
        this.wayFinishing = false;
        
        this.children = [];
        this.parents = [];
    }

    addChild(child: Noeud) {
        if (!this.children.find(c => c.id === child.id)) {
            this.children.push(child);
            return true;
        }
        else {
            return false;
        }
    }

    addParent(parent: Noeud) {
        if (!this.parents.find(c => c.id === parent.id)) {
            this.parents.push(parent);
        }
    }

}
