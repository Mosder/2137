class Tile {
    x: number;
    y: number;
    val: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.val = Math.floor(Math.random() * 10) ? 0 : 1;
    }
}

export { Tile };