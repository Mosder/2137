const ctx = (document.getElementById("game") as HTMLCanvasElement).getContext("2d");
const baseValue = 2.0869140625;
const tileColors = [
    "ff1e26",
    "f6aab7",
    "55cdfd",
    "e38d00",
    "e7c601",
    "5faad7",
    "1f3554",
    "a8d47a",
    "3ba740",
    "810081"
];
const papaj = new Image();
papaj.src = "./assets/gfx/papaj.jpg";
const storageKey = "2137-highscores";

export { ctx, baseValue, tileColors, papaj, storageKey };