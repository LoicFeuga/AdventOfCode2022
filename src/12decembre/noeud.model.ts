export class Noeud {
    value: string;
    wayFinishing: boolean;
    children: Array<Noeud>;
    parents: Array<Noeud>;

    constructor(value: string) {
        this.value = value;
        this.wayFinishing = false;
        this.children = [];
        this.parents = [];
    }

    addChild(child: Noeud){
        this.children.push(child);
    }

    addParent(parent: Noeud){
        this.parents.push(parent);
    }

}
