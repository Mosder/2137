/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ \"./src/storage.ts\");\n\n\n\nclass Game {\n    before;\n    tiles;\n    boardSize;\n    ded = false;\n    squareSize;\n    toAnimate = {\n        added: [],\n        moved: []\n    };\n    moves = 0;\n    score = 0;\n    cheated = false;\n    constructor(controls, boardSize) {\n        this.boardSize = boardSize;\n        this.squareSize = 800 / boardSize;\n        this.tiles = [];\n        this.addTile();\n        this.addTile();\n        this.setupMovement(controls);\n        this.setupCanvas();\n        this.drawLines();\n        this.before = {\n            tiles: this.tiles,\n            score: 0,\n            moves: 0,\n        };\n    }\n    setupMovement(controls) {\n        document.body.addEventListener(\"keyup\", (e) => {\n            if (this.ded)\n                return;\n            if (e.key === controls.back)\n                this.fuckGoBack();\n            else\n                for (const [direction, key] of Object.entries(controls))\n                    if (e.key === key)\n                        this.move(direction);\n        });\n    }\n    move(direction) {\n        let before = {\n            tiles: this.tiles.map(tile => { return Object.assign(Object.create(Object.getPrototypeOf(tile)), tile); }),\n            score: this.score,\n            moves: this.moves\n        };\n        let dirInfo = this.getDirFromString(direction);\n        let dir = dirInfo.dir;\n        let otherDir = dirInfo.otherDir;\n        let sense = dirInfo.sense;\n        for (let step = 0; step < this.boardSize; step++) {\n            let currentTiles = this.tiles.filter(tile => tile[otherDir] == step);\n            currentTiles = currentTiles.sort((a, b) => (b[dir] - a[dir]) * sense);\n            for (const tile of currentTiles) {\n                let tilePos = (sense + 1) / 2 * (this.boardSize - 1);\n                for (; tile[dir] != tilePos; tilePos -= sense) {\n                    const tileToCheck = currentTiles.filter(t => t[dir] === tilePos)[0];\n                    const nextTileToCheck = currentTiles.filter(t => t[dir] === tilePos - sense)[0];\n                    let toA = { prevX: tile.x, prevY: tile.y, x: 0, y: 0, val: tile.val };\n                    if (tileToCheck === undefined) {\n                        tile[dir] = tilePos;\n                        toA.x = tile.x;\n                        toA.y = tile.y;\n                        this.toAnimate.moved.push(toA);\n                        break;\n                    }\n                    else if ((nextTileToCheck === undefined || nextTileToCheck === tile) && tileToCheck.val === tile.val) {\n                        this.tiles = this.tiles.filter(t => t !== tile);\n                        currentTiles = currentTiles.filter(t => t !== tile);\n                        tileToCheck.val++;\n                        this.score += 2 * _consts__WEBPACK_IMPORTED_MODULE_0__.baseValue * 2 ** tile.val;\n                        toA.x = tileToCheck.x;\n                        toA.y = tileToCheck.y;\n                        this.toAnimate.moved.push(toA);\n                        break;\n                    }\n                }\n            }\n        }\n        if (this.tiles.length !== this.boardSize ** 2) {\n            this.moves++;\n            this.addTile();\n            this.before = before;\n        }\n    }\n    update() {\n        document.getElementById(\"score\").innerText = this.score.toString();\n        let stage = 0;\n        let interval = setInterval(() => {\n            this.drawLines();\n            if (stage > 20) {\n                this.toAnimate = {\n                    added: [],\n                    moved: []\n                };\n                this.setupCanvas();\n                this.drawTiles();\n                clearInterval(interval);\n            }\n            else if (stage > 9) {\n                for (const newTile of this.toAnimate.added) {\n                    let x = newTile.x + (20 - stage) / 20;\n                    let y = newTile.y + (20 - stage) / 20;\n                    let size = this.squareSize * (stage - 10) / 10;\n                    this.drawTile(newTile.val, x, y, size);\n                }\n            }\n            else {\n                for (const movedTile of this.toAnimate.moved) {\n                    let [prevX, x] = this.getMovingCoords(movedTile.prevX, movedTile.x, stage);\n                    let [prevY, y] = this.getMovingCoords(movedTile.prevY, movedTile.y, stage);\n                    this.clearTile(prevX, prevY);\n                    this.drawTile(movedTile.val, x, y, this.squareSize);\n                }\n                if (stage === 9) {\n                    this.setupCanvas();\n                    this.drawTiles();\n                    for (const newTile of this.toAnimate.added) {\n                        this.clearTile(newTile.x, newTile.y);\n                    }\n                }\n            }\n            this.drawLines();\n            stage++;\n        }, 10);\n    }\n    getMovingCoords(prev, now, stage) {\n        let diff = Math.abs(prev - now);\n        let sense = prev > now ? -1 : 1;\n        let stageDist = diff * sense / 10;\n        let p = prev + stage * stageDist;\n        let n = p + stageDist;\n        return [p, n];\n    }\n    setupCanvas() {\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#777\";\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(0, 0, 800, 800);\n    }\n    addTile() {\n        let x;\n        let y;\n        do {\n            x = Math.floor(Math.random() * this.boardSize);\n            y = Math.floor(Math.random() * this.boardSize);\n        } while (this.tiles.filter(tile => tile.x == x && tile.y == y).length > 0);\n        let tile = new _Tile__WEBPACK_IMPORTED_MODULE_1__.Tile(x, y);\n        this.tiles.push(tile);\n        this.toAnimate.added.push({ x, y, val: tile.val });\n        if (this.tiles.length == this.boardSize ** 2)\n            this.checkForDie();\n        this.update();\n    }\n    drawTiles() {\n        for (const tile of this.tiles) {\n            this.drawTile(tile.val, tile.x, tile.y, this.squareSize);\n        }\n    }\n    drawTile(val, x, y, size) {\n        let ratio = size / this.squareSize;\n        if (val < 10) {\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#' + _consts__WEBPACK_IMPORTED_MODULE_0__.tileColors[val < 10 ? val : 10];\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(x * this.squareSize, y * this.squareSize, size, size);\n        }\n        else {\n            let div = val - 9;\n            for (let i = 0; i < val - 9; i++)\n                for (let j = 0; j < val - 9; j++)\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.drawImage(_consts__WEBPACK_IMPORTED_MODULE_0__.papaj, (x + i / div) * this.squareSize, (y + j / div) * this.squareSize, size / div, size / div);\n            return;\n        }\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.font = `${(120 / this.boardSize) * ratio}px Arial`;\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.textAlign = \"center\";\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#fff\";\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText((_consts__WEBPACK_IMPORTED_MODULE_0__.baseValue * 2 ** val).toString(), (x + 0.5 * ratio) * this.squareSize, (y + 0.55 * ratio) * this.squareSize);\n    }\n    clearTile(x, y) {\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#777\";\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);\n    }\n    drawLines() {\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.lineWidth = 2;\n        for (let i = 1; i < this.boardSize; i++) {\n            this.drawLine(i * this.squareSize, 0, i * this.squareSize, 800);\n            this.drawLine(0, i * this.squareSize, 800, i * this.squareSize);\n        }\n    }\n    drawLine(x1, y1, x2, y2) {\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.moveTo(x1, y1);\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.lineTo(x2, y2);\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.stroke();\n    }\n    getDirFromString(dir) {\n        let dirs = {\n            up: { dir: \"y\", otherDir: \"x\", sense: -1 },\n            down: { dir: \"y\", otherDir: \"x\", sense: 1 },\n            left: { dir: \"x\", otherDir: \"y\", sense: -1 },\n            right: { dir: \"x\", otherDir: \"y\", sense: 1 },\n        };\n        return dirs[dir];\n    }\n    checkForDie() {\n        for (const tile of this.tiles) {\n            let neighbors = [\n                { x: tile.x, y: tile.y - 1 },\n                { x: tile.x + 1, y: tile.y },\n                { x: tile.x, y: tile.y + 1 },\n                { x: tile.x - 1, y: tile.y }\n            ];\n            for (const neighbor of neighbors) {\n                let t = this.tiles.filter(til => til.x == neighbor.x && til.y == neighbor.y)[0];\n                if (t == undefined)\n                    continue;\n                if (t.val === tile.val)\n                    return;\n            }\n        }\n        this.die();\n    }\n    fuckGoBack() {\n        this.cheated = true;\n        this.tiles = this.before.tiles;\n        this.moves = this.before.moves;\n        this.score = this.before.score;\n        document.getElementById(\"score\").innerText = this.score.toString();\n        this.setupCanvas();\n        this.drawTiles();\n        this.drawLines();\n    }\n    die() {\n        this.ded = true;\n        setTimeout(() => {\n            let str = `You die lol\\nMoves: ${this.moves}\\nScore: ${this.score}`;\n            if (this.score > (0,_storage__WEBPACK_IMPORTED_MODULE_2__.getAllHighscores)()[this.boardSize - 2].score) {\n                str += \"\\nThat's new highscore! \";\n                if (this.cheated)\n                    window.alert(`${str}But you cheated L`);\n                else\n                    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.setHighScore)(this.boardSize, { name: window.prompt(`${str}Enter your name:`), score: this.score });\n            }\n            else\n                window.alert(str);\n            window.location.reload();\n        }, 300);\n    }\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/Game.ts?");

/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tile\": () => (/* binding */ Tile)\n/* harmony export */ });\nclass Tile {\n    x;\n    y;\n    val;\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n        this.val = Math.floor(Math.random() * 10) ? 0 : 1;\n    }\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/Tile.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"baseValue\": () => (/* binding */ baseValue),\n/* harmony export */   \"ctx\": () => (/* binding */ ctx),\n/* harmony export */   \"papaj\": () => (/* binding */ papaj),\n/* harmony export */   \"storageKey\": () => (/* binding */ storageKey),\n/* harmony export */   \"tileColors\": () => (/* binding */ tileColors)\n/* harmony export */ });\nconst ctx = document.getElementById(\"game\").getContext(\"2d\");\nconst baseValue = 2.0869140625;\nconst tileColors = [\n    \"ff1e26\",\n    \"f6aab7\",\n    \"55cdfd\",\n    \"e38d00\",\n    \"e7c601\",\n    \"5faad7\",\n    \"1f3554\",\n    \"a8d47a\",\n    \"3ba740\",\n    \"810081\"\n];\nconst papaj = new Image();\npapaj.src = \"./assets/gfx/papaj.jpg\";\nconst storageKey = \"2137-highscores\";\n\n\n\n//# sourceURL=webpack://subterra/./src/consts.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/storage.ts\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\n\ndisplayHighs();\nlet controls = {\n    up: \"ArrowUp\",\n    down: \"ArrowDown\",\n    left: \"ArrowLeft\",\n    right: \"ArrowRight\",\n    back: \"b\"\n};\nlet game = new _Game__WEBPACK_IMPORTED_MODULE_1__.Game(controls, 4);\nlet interval;\nlet playing = false;\nlet moves = 0;\nlet time = 0;\ndocument.body.addEventListener(\"keyup\", (e) => {\n    if (e.key === 'c') {\n        if (window.confirm(\"Are you sure you want to clear highscores?\")) {\n            (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setupHighscores)();\n            displayHighs();\n        }\n        return;\n    }\n    let key = parseInt(e.key);\n    if (!Number.isInteger(key) || key < 2)\n        return;\n    game.ded = true;\n    game = new _Game__WEBPACK_IMPORTED_MODULE_1__.Game(controls, key);\n});\nfunction displayHighs() {\n    let list = document.getElementById(\"highList\");\n    list.innerHTML = \"\";\n    let highs = (0,_storage__WEBPACK_IMPORTED_MODULE_0__.getAllHighscores)();\n    for (let i = 2; i < 10; i++) {\n        let li = document.createElement(\"li\");\n        li.innerText = `${i}x${i}: `;\n        let span = document.createElement(\"span\");\n        span.id = `high${i}`;\n        let h = highs[i - 2];\n        span.innerText = h.score === 0 ? \"not set\" : `${h.score} by ${h.name}`;\n        li.appendChild(span);\n        list.appendChild(li);\n    }\n}\n\n\n//# sourceURL=webpack://subterra/./src/main.ts?");

/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAllHighscores\": () => (/* binding */ getAllHighscores),\n/* harmony export */   \"setHighScore\": () => (/* binding */ setHighScore),\n/* harmony export */   \"setupHighscores\": () => (/* binding */ setupHighscores)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n\nfunction setupHighscores() {\n    let val = \"\";\n    for (let i = 2; i < 10; i++)\n        val += \"null:0,\";\n    val = val.slice(0, -1);\n    localStorage.setItem(_consts__WEBPACK_IMPORTED_MODULE_0__.storageKey, val);\n}\nfunction getAllHighscores() {\n    let highs = localStorage.getItem(_consts__WEBPACK_IMPORTED_MODULE_0__.storageKey);\n    if (highs === null) {\n        setupHighscores();\n        return new Array(8).fill({ name: \"null\", score: 0 });\n    }\n    let highArr = [];\n    for (const high of highs.split(',')) {\n        let h = high.split(':');\n        highArr.push({ name: h[0], score: parseFloat(h[1]) });\n    }\n    return highArr;\n}\nfunction setHighScore(board, high) {\n    let highs = getAllHighscores();\n    highs[board - 2] = high;\n    let str = \"\";\n    for (const h of highs)\n        str += `${h.name == '' ? \"John Doe\" : h.name}:${h.score},`;\n    str = str.slice(0, -1);\n    localStorage.setItem(_consts__WEBPACK_IMPORTED_MODULE_0__.storageKey, str);\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/storage.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;