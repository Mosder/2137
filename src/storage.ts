import { storageKey } from "./consts";
import { Highscore } from "./interfaces";

function setupHighscores() {
    let val = "";
    for (let i = 2; i < 10; i++)
        val += "null:0,";
    val = val.slice(0, -1);
    localStorage.setItem(storageKey, val);
}

function getAllHighscores(): Highscore[] {
    let highs = localStorage.getItem(storageKey);
    if (highs === null) {
        setupHighscores();
        return new Array(8).fill({ name: "null", score: 0 });
    }
    let highArr: Highscore[] = [];
    for (const high of highs.split(',')) {
        let h = high.split(':');
        highArr.push({ name: h[0], score: parseFloat(h[1]) });
    }
    return highArr;
}

function setHighScore(board: number, high: Highscore) {
    let highs = getAllHighscores();
    highs[board - 2] = high;
    let str = "";
    for (const h of highs)
        str += `${h.name}:${h.score},`;
    str = str.slice(0, -1);
    localStorage.setItem(storageKey, str);
}

export { setupHighscores, getAllHighscores, setHighScore }