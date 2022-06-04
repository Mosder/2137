interface Controls {
    up: string;
    down: string;
    left: string;
    right: string;
    back: string;
}
interface ToAnimate {
    added: { x: number, y: number, val: number }[];
    moved: { prevX: number, prevY: number, x: number, y: number, val: number }[];
}
interface Highscore {
    name: string;
    score: number;
}

export { Controls, ToAnimate, Highscore };