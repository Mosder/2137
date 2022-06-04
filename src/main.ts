import { getAllHighscores, setupHighscores } from "./storage";
import { Game } from "./Game";

displayHighs();

let controls = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    back: "b"
}
let game = new Game(controls, 4);
let interval: NodeJS.Timer;
let playing = false;
let moves = 0;
let time = 0;

document.body.addEventListener("keyup", (e) => {
    if (e.key === 'c') {
        if (window.confirm("Are you sure you want to clear highscores?")) {
            setupHighscores();
            displayHighs();
        }
        return;
    }
    let key = parseInt(e.key);
    if (!Number.isInteger(key) || key < 2)
        return;
    game.ded = true;
    game = new Game(controls, key);
});

function displayHighs() {
    let list = document.getElementById("highList");
    list.innerHTML = "";
    let highs = getAllHighscores();
    for (let i = 2; i < 10; i++) {
        let li = document.createElement("li");
        li.innerText = `${i}x${i}: `;
        let span = document.createElement("span");
        span.id = `high${i}`;
        let h = highs[i - 2];
        span.innerText = h.score === 0 ? "not set" : `${h.score} by ${h.name}`;
        li.appendChild(span);
        list.appendChild(li);
    }
}