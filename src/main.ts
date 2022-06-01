import { Game } from "./Game";

let controls = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
}
let game = new Game(controls, 4);
let interval: NodeJS.Timer;
let playing = false;
let moves = 0;
let time = 0;

document.body.addEventListener("keyup", (e) => {
    let key = parseInt(e.key);
    if (!Number.isInteger(key) || key == 1)
        return;
    game.ded = true;
    game = new Game(controls, key ? key : 10);
});

document.body.addEventListener("keyup", (e) => {
    if (e.key === 'r')
        playGame(10);
    else if (e.key === 't')
        playGame();
});

function playGame(speed?: number) {
    let dirs = ["up", "down", "left", "right"];
    playing = !playing;
    if (playing) {
        if (speed === undefined)
            speed = parseInt(prompt("Enter interval delay"));
        if (!Number.isInteger(speed)) {
            alert("idiot");
            playing = !playing;
            return;
        }
        time = Date.now();
        interval = setInterval(() => {
            if (!playing) {
                clearInterval(interval);
                return;
            }
            game.move(dirs[Math.floor(Math.random() * 4)]);
            moves++;
        }, speed);
    }
    else {
        console.log(`Did ${moves} moves in ${(Date.now() - time) / 1000} seconds`);
        moves = 0;
    }
}