import { ctx, baseValue, tileColors, papaj } from "./consts";
import { Tile } from "./Tile";
import { Controls, ToAnimate } from "./interfaces";
import { getAllHighscores, setHighScore } from "./storage";

class Game {
    before: {
        tiles: Tile[],
        score: number,
        moves: number
    }
    tiles: Tile[];
    boardSize: number;
    ded: boolean = false;
    squareSize: number;
    toAnimate: ToAnimate = {
        added: [],
        moved: []
    };
    moves: number = 0;
    score: number = 0;
    cheated: boolean = false;

    constructor(controls: Controls, boardSize: number) {
        this.boardSize = boardSize;
        this.squareSize = 800 / boardSize;
        this.tiles = [];
        this.addTile();
        this.addTile();
        this.setupMovement(controls);
        this.setupCanvas();
        this.drawLines();
        this.before = {
            tiles: this.tiles,
            score: 0,
            moves: 0,
        }
    }

    setupMovement(controls: Controls) {
        document.body.addEventListener("keyup", (e) => {
            if (this.ded)
                return;
            if (e.key === controls.back)
                this.fuckGoBack();
            else
                for (const [direction, key] of Object.entries(controls))
                    if (e.key === key)
                        this.move(direction);
        });

    }

    move(direction: string) {
        let before = {
            tiles: this.tiles.map(tile => { return Object.assign(Object.create(Object.getPrototypeOf(tile)), tile) }),
            score: this.score,
            moves: this.moves
        };
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
                    const tileToCheck = currentTiles.filter(t => t[dir] === tilePos)[0];
                    const nextTileToCheck = currentTiles.filter(t => t[dir] === tilePos - sense)[0];
                    let toA = { prevX: tile.x, prevY: tile.y, x: 0, y: 0, val: tile.val };
                    if (tileToCheck === undefined) {
                        tile[dir] = tilePos;
                        toA.x = tile.x;
                        toA.y = tile.y
                        this.toAnimate.moved.push(toA);
                        break;
                    }
                    else if ((nextTileToCheck === undefined || nextTileToCheck === tile) && tileToCheck.val === tile.val) {
                        this.tiles = this.tiles.filter(t => t !== tile);
                        currentTiles = currentTiles.filter(t => t !== tile);
                        tileToCheck.val++;
                        this.score += 2 * baseValue * 2 ** tile.val;
                        toA.x = tileToCheck.x;
                        toA.y = tileToCheck.y;
                        this.toAnimate.moved.push(toA);
                        break;
                    }
                }
            }
        }
        if (this.tiles.length !== this.boardSize ** 2) {
            this.moves++;
            this.addTile();
            this.before = before;
        }
    }

    update() {
        document.getElementById("score").innerText = this.score.toString();
        let stage = 0;
        let interval = setInterval(() => {
            this.drawLines();
            if (stage > 20) {
                this.toAnimate = {
                    added: [],
                    moved: []
                };
                this.setupCanvas();
                this.drawTiles();
                clearInterval(interval);
            }
            else if (stage > 9) {
                for (const newTile of this.toAnimate.added) {
                    let x = newTile.x + (20 - stage) / 20;
                    let y = newTile.y + (20 - stage) / 20;
                    let size = this.squareSize * (stage - 10) / 10;
                    this.drawTile(newTile.val, x, y, size);
                }
            }
            else {
                for (const movedTile of this.toAnimate.moved) {
                    let [prevX, x] = this.getMovingCoords(movedTile.prevX, movedTile.x, stage);
                    let [prevY, y] = this.getMovingCoords(movedTile.prevY, movedTile.y, stage);
                    this.clearTile(prevX, prevY);
                    this.drawTile(movedTile.val, x, y, this.squareSize);
                }
                if (stage === 9) {
                    this.setupCanvas();
                    this.drawTiles();
                    for (const newTile of this.toAnimate.added) {
                        this.clearTile(newTile.x, newTile.y);
                    }
                }
            }
            this.drawLines();
            stage++;
        }, 10);
    }

    getMovingCoords(prev: number, now: number, stage: number) {
        let diff = Math.abs(prev - now);
        let sense = prev > now ? -1 : 1;
        let stageDist = diff * sense / 10;
        let p = prev + stage * stageDist;
        let n = p + stageDist;
        return [p, n];
    }

    setupCanvas() {
        ctx.fillStyle = "#777";
        ctx.fillRect(0, 0, 800, 800);
    }

    addTile() {
        let x: number;
        let y: number;
        do {
            x = Math.floor(Math.random() * this.boardSize);
            y = Math.floor(Math.random() * this.boardSize);
        } while (this.tiles.filter(tile => tile.x == x && tile.y == y).length > 0);
        let tile = new Tile(x, y);
        this.tiles.push(tile);
        this.toAnimate.added.push({ x, y, val: tile.val });
        if (this.tiles.length == this.boardSize ** 2)
            this.checkForDie();
        this.update();
    }

    drawTiles() {
        for (const tile of this.tiles) {
            this.drawTile(tile.val, tile.x, tile.y, this.squareSize);
        }
    }

    drawTile(val: number, x: number, y: number, size: number) {
        let ratio = size / this.squareSize;
        if (val < 10) {
            ctx.fillStyle = '#' + tileColors[val < 10 ? val : 10];
            ctx.fillRect(x * this.squareSize, y * this.squareSize, size, size);
        }
        else {
            let div = val - 9;
            for (let i = 0; i < val - 9; i++)
                for (let j = 0; j < val - 9; j++)
                    ctx.drawImage(papaj, (x + i / div) * this.squareSize, (y + j / div) * this.squareSize, size / div, size / div);
            return;
        }
        ctx.font = `${(120 / this.boardSize) * ratio}px Arial`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText((baseValue * 2 ** val).toString(), (x + 0.5 * ratio) * this.squareSize, (y + 0.55 * ratio) * this.squareSize);
    }

    clearTile(x: number, y: number) {
        ctx.fillStyle = "#777";
        ctx.fillRect(x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);
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

    fuckGoBack() {
        this.cheated = true;
        this.tiles = this.before.tiles;
        this.moves = this.before.moves;
        this.score = this.before.score;
        document.getElementById("score").innerText = this.score.toString();
        this.setupCanvas();
        this.drawTiles();
        this.drawLines();
    }

    die() {
        this.ded = true;
        setTimeout(() => {
            let str = `You die lol\nMoves: ${this.moves}\nScore: ${this.score}`;
            if (this.score > getAllHighscores()[this.boardSize - 2].score) {
                str += "\nThat's new highscore! ";
                if (this.cheated)
                    window.alert(`${str}But you cheated L`);
                else
                    setHighScore(this.boardSize, { name: window.prompt(`${str}Enter your name:`), score: this.score });
            }
            else
                window.alert(str);
            window.location.reload();
        }, 300);
    }
}

export { Game };