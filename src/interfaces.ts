interface Controls {
    up: string;
    down: string;
    left: string;
    right: string;
}
interface ToAnimate {
    added: { x: number, y: number, val: number }[];
    moved: { prevX: number, prevY: number, x: number, y: number, val: number }[];
}

export { Controls, ToAnimate };