import { ctx, baseValue, tileColors } from "./consts";
import { Tile } from "./Tile";
import { Controls, ToAnimate } from "./interfaces";

class Game {
    tiles: Tile[];
    boardSize: number;
    ded: boolean = false;
    squareSize: number;
    toAnimate: ToAnimate = {
        added: [],
        moved: []
    };

    constructor(controls: Controls, boardSize: number) {
        this.boardSize = boardSize;
        this.squareSize = 800 / boardSize;
        this.tiles = [];
        this.addTile();
        this.addTile();
        this.setupMovement(controls);
    }

    setupMovement(controls: Controls) {
        document.body.addEventListener("keyup", (e) => {
            if (this.ded)
                return;
            for (const [direction, key] of Object.entries(controls))
                if (e.key == key)
                    this.move(direction);
        });

    }

    move(direction: string) {
        let dirInfo = this.getDirFromString(direction);
        let dir = dirInfo.dir as keyof Tile;
        let otherDir = dirInfo.otherDir as keyof Tile;
        let sense = dirInfo.sense;
        for (let step = 0; step < this.boardSize; step++) {
            let currentTiles = this.tiles.filter(tile => tile[otherDir] == step);
            currentTiles = currentTiles.sort((a, b) => (b[dir] - a[dir]) * sense);
            for (const tile of currentTiles) {
                let tilePos = (sense + 1) / 2 * (this.boardSize - 1);
                for (; tile[dir] != tilePos; tilePos -= sense) {
                    if (currentTiles.filter(t => t[dir] === tilePos).length === 0) {
                        let toA = {
                            prevX: tile.x,
                            prevY: tile.y,
                            x: 0,
                            y: 0,
                            val: tile.val
                        }
                        tile[dir] = tilePos;
                        toA.x = tile.x;
                        toA.y = tile.y
                        this.toAnimate.moved.push(toA);
                        break;
                    }
                    else if ((currentTiles.filter(t => t[dir] === tilePos - sense).length === 0 ||
                        currentTiles.filter(t => t[dir] === tilePos - sense)[0] === tile)
                        && currentTiles.filter(t => t[dir] === tilePos)[0].val === tile.val) {
                        this.tiles = this.tiles.filter(t => t !== tile);
                        currentTiles = currentTiles.filter(t => t !== tile);
                        currentTiles.filter(t => t[dir] === tilePos)[0].val++;
                        this.toAnimate.moved.push({
                            prevX: tile.x,
                            prevY: tile.y,
                            x: currentTiles.filter(t => t[dir] === tilePos)[0].x,
                            y: currentTiles.filter(t => t[dir] === tilePos)[0].y,
                            val: tile.val
                        });
                        break;
                    }
                }
            }
        }
        if (this.tiles.length !== this.boardSize ** 2)
            this.addTile();
    }

    update() {
        let stage = 0;
        let interval = setInterval(() => {
            if (stage == 20) {
                this.toAnimate = {
                    added: [],
                    moved: []
                };
                clearInterval(interval);
                this.setupCanvas();
                this.drawTiles();
                this.drawLines();
            }
            else if (stage >= 10) {
                for (const newTile of this.toAnimate.added) {
                    ctx.fillStyle = '#' + tileColors[newTile.val];
                    let x = newTile.x + (20 - stage) / 20;
                    let y = newTile.y + (20 - stage) / 20;
                    let size = this.squareSize * (stage - 10) / 10;
                    ctx.fillRect(x * this.squareSize, y * this.squareSize, size, size);
                    ctx.fillStyle = "#fff";
                    ctx.font = `${120 / this.boardSize * (stage - 10) / 10}px Arial`;
                    ctx.textAlign = "center";
                    ctx.fillText((baseValue * 2 ** newTile.val).toString(),
                        (x + 0.5 * (stage - 10) / 10) * this.squareSize, (y + 0.55 * (stage - 10) / 10) * this.squareSize);
                }
            }
            else {
                this.drawLines();
                for (const movedTile of this.toAnimate.moved) {
                    let x = movedTile.x;
                    let y = movedTile.y;
                    let prevX = movedTile.x;
                    let prevY = movedTile.y;
                    if (movedTile.prevX !== movedTile.x) {
                        let diff = Math.abs(movedTile.prevX - movedTile.x);
                        let sense = movedTile.prevX > movedTile.x ? -1 : 1;
                        x = movedTile.prevX + stage * diff / 10 * sense;
                        prevX = movedTile.prevX + (stage - 1) * diff / 10 * sense;
                    }
                    else {
                        let diff = Math.abs(movedTile.prevY - movedTile.y);
                        let sense = movedTile.prevY > movedTile.y ? -1 : 1;
                        y = movedTile.prevY + stage * diff / 10 * sense;
                        prevY = movedTile.prevY + (stage - 1) * diff / 10 * sense;
                    }
                    ctx.fillStyle = "#777";
                    ctx.fillRect(prevX * this.squareSize, prevY * this.squareSize, this.squareSize, this.squareSize);
                    ctx.fillStyle = '#' + tileColors[movedTile.val];
                    ctx.fillRect(x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);
                    ctx.fillStyle = "#fff";
                    ctx.font = `${120 / this.boardSize}px Arial`;
                    ctx.textAlign = "center";
                    ctx.fillText((baseValue * 2 ** movedTile.val).toString(), (x + 0.5) * this.squareSize, (y + 0.55) * this.squareSize);
                }
                if (stage == 9) {
                    this.setupCanvas();
                    this.drawTiles();
                    this.drawLines();
                    for (const newTile of this.toAnimate.added) {
                        ctx.fillStyle = "#777";
                        ctx.fillRect(newTile.x * this.squareSize, newTile.y * this.squareSize, this.squareSize, this.squareSize);
                    }
                }
            }
            stage++;
        }, 10);
    }

    setupCanvas() {
        ctx.fillStyle = "#777";
        ctx.fillRect(0, 0, 800, 800);
    }

    addTile() {
        let x = Math.floor(Math.random() * this.boardSize);
        let y = Math.floor(Math.random() * this.boardSize);
        while (this.tiles.filter(tile => tile.x == x && tile.y == y).length > 0) {
            x = Math.floor(Math.random() * this.boardSize);
            y = Math.floor(Math.random() * this.boardSize);
        }
        let tile = new Tile(x, y);
        this.tiles.push(tile);
        this.toAnimate.added.push({ x, y, val: tile.val });
        if (this.tiles.length == this.boardSize ** 2)
            this.checkForDie();
        this.update();
    }

    drawTiles() {
        for (const tile of this.tiles) {
            ctx.fillStyle = '#' + tileColors[tile.val];
            ctx.fillRect(tile.x * this.squareSize, tile.y * this.squareSize, this.squareSize, this.squareSize);
            ctx.fillStyle = "#fff";
            ctx.font = `${120 / this.boardSize}px Arial`;
            ctx.textAlign = "center";
            ctx.fillText((baseValue * 2 ** tile.val).toString(), (tile.x + 0.5) * this.squareSize, (tile.y + 0.55) * this.squareSize);
        }
    }

    drawLines() {
        ctx.lineWidth = 2;
        for (let i = 1; i < this.boardSize; i++) {
            this.drawLine(i * this.squareSize, 0, i * this.squareSize, 800);
            this.drawLine(0, i * this.squareSize, 800, i * this.squareSize);
        }
    }

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    getDirFromString(dir: string) {
        let dirs = {
            up: { dir: "y", otherDir: "x", sense: -1 },
            down: { dir: "y", otherDir: "x", sense: 1 },
            left: { dir: "x", otherDir: "y", sense: -1 },
            right: { dir: "x", otherDir: "y", sense: 1 },
        }
        return dirs[dir as keyof typeof dirs];
    }

    checkForDie() {
        for (const tile of this.tiles) {
            let neighbors = [
                { x: tile.x, y: tile.y - 1 },
                { x: tile.x + 1, y: tile.y },
                { x: tile.x, y: tile.y + 1 },
                { x: tile.x - 1, y: tile.y }
            ];
            for (const neighbor of neighbors) {
                let t = this.tiles.filter(til => til.x == neighbor.x && til.y == neighbor.y)[0];
                if (t == undefined)
                    continue;
                if (t.val === tile.val)
                    return;
            }
        }
        this.die();
    }

    die() {
        this.ded = true;
        setTimeout(() => {
            window.alert("You die lol");
            window.location.reload();
        }, 300);
    }
}

export { Game };