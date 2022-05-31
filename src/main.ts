import { Game } from "./Game";

let controls = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
}
let game = new Game(controls, 4);

document.body.addEventListener("keyup", (e) => {
    let key = parseInt(e.key);
    if (!Number.isInteger(key) || key == 1)
        return;
    game.ded = true;
    game = new Game(controls, key ? key : 10);
});

document.body.addEventListener("keyup", (e) => {
    if (e.key !== "r")
        return;
    let dirs = ["up", "down", "left", "right"];
    let count = 0;
    let interval = setInterval(() => {
        game.move(dirs[Math.floor(Math.random() * 4)]);
        if (++count >= 100)
            clearInterval(interval);
    }, 10);
});