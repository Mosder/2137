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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n\n\nclass Game {\n    tiles;\n    boardSize;\n    ded = false;\n    squareSize;\n    toAnimate = {\n        added: [],\n        moved: []\n    };\n    constructor(controls, boardSize) {\n        this.boardSize = boardSize;\n        this.squareSize = 800 / boardSize;\n        this.tiles = [];\n        this.addTile();\n        this.addTile();\n        this.setupMovement(controls);\n    }\n    setupMovement(controls) {\n        document.body.addEventListener(\"keyup\", (e) => {\n            if (this.ded)\n                return;\n            for (const [direction, key] of Object.entries(controls))\n                if (e.key == key)\n                    this.move(direction);\n        });\n    }\n    move(direction) {\n        let dirInfo = this.getDirFromString(direction);\n        let dir = dirInfo.dir;\n        let otherDir = dirInfo.otherDir;\n        let sense = dirInfo.sense;\n        for (let step = 0; step < this.boardSize; step++) {\n            let currentTiles = this.tiles.filter(tile => tile[otherDir] == step);\n            currentTiles = currentTiles.sort((a, b) => (b[dir] - a[dir]) * sense);\n            for (const tile of currentTiles) {\n                let tilePos = (sense + 1) / 2 * (this.boardSize - 1);\n                for (; tile[dir] != tilePos; tilePos -= sense) {\n                    if (currentTiles.filter(t => t[dir] === tilePos).length === 0) {\n                        let toA = {\n                            prevX: tile.x,\n                            prevY: tile.y,\n                            x: 0,\n                            y: 0,\n                            val: tile.val\n                        };\n                        tile[dir] = tilePos;\n                        toA.x = tile.x;\n                        toA.y = tile.y;\n                        this.toAnimate.moved.push(toA);\n                        break;\n                    }\n                    else if ((currentTiles.filter(t => t[dir] === tilePos - sense).length === 0 ||\n                        currentTiles.filter(t => t[dir] === tilePos - sense)[0] === tile)\n                        && currentTiles.filter(t => t[dir] === tilePos)[0].val === tile.val) {\n                        this.tiles = this.tiles.filter(t => t !== tile);\n                        currentTiles = currentTiles.filter(t => t !== tile);\n                        currentTiles.filter(t => t[dir] === tilePos)[0].val++;\n                        this.toAnimate.moved.push({\n                            prevX: tile.x,\n                            prevY: tile.y,\n                            x: currentTiles.filter(t => t[dir] === tilePos)[0].x,\n                            y: currentTiles.filter(t => t[dir] === tilePos)[0].y,\n                            val: tile.val\n                        });\n                        break;\n                    }\n                }\n            }\n        }\n        if (this.tiles.length !== this.boardSize ** 2)\n            this.addTile();\n    }\n    update() {\n        let stage = 0;\n        let interval = setInterval(() => {\n            if (stage == 20) {\n                this.toAnimate = {\n                    added: [],\n                    moved: []\n                };\n                clearInterval(interval);\n                this.setupCanvas();\n                this.drawTiles();\n                this.drawLines();\n            }\n            else if (stage >= 10) {\n                for (const newTile of this.toAnimate.added) {\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#' + _consts__WEBPACK_IMPORTED_MODULE_0__.tileColors[newTile.val];\n                    let x = newTile.x + (20 - stage) / 20;\n                    let y = newTile.y + (20 - stage) / 20;\n                    let size = this.squareSize * (stage - 10) / 10;\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(x * this.squareSize, y * this.squareSize, size, size);\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#fff\";\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.font = `${120 / this.boardSize * (stage - 10) / 10}px Arial`;\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.textAlign = \"center\";\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText((_consts__WEBPACK_IMPORTED_MODULE_0__.baseValue * 2 ** newTile.val).toString(), (x + 0.5 * (stage - 10) / 10) * this.squareSize, (y + 0.55 * (stage - 10) / 10) * this.squareSize);\n                }\n            }\n            else {\n                this.drawLines();\n                for (const movedTile of this.toAnimate.moved) {\n                    let x = movedTile.x;\n                    let y = movedTile.y;\n                    let prevX = movedTile.x;\n                    let prevY = movedTile.y;\n                    if (movedTile.prevX !== movedTile.x) {\n                        let diff = Math.abs(movedTile.prevX - movedTile.x);\n                        let sense = movedTile.prevX > movedTile.x ? -1 : 1;\n                        x = movedTile.prevX + stage * diff / 10 * sense;\n                        prevX = movedTile.prevX + (stage - 1) * diff / 10 * sense;\n                    }\n                    else {\n                        let diff = Math.abs(movedTile.prevY - movedTile.y);\n                        let sense = movedTile.prevY > movedTile.y ? -1 : 1;\n                        y = movedTile.prevY + stage * diff / 10 * sense;\n                        prevY = movedTile.prevY + (stage - 1) * diff / 10 * sense;\n                    }\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#777\";\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(prevX * this.squareSize, prevY * this.squareSize, this.squareSize, this.squareSize);\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#' + _consts__WEBPACK_IMPORTED_MODULE_0__.tileColors[movedTile.val];\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#fff\";\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.font = `${120 / this.boardSize}px Arial`;\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.textAlign = \"center\";\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText((_consts__WEBPACK_IMPORTED_MODULE_0__.baseValue * 2 ** movedTile.val).toString(), (x + 0.5) * this.squareSize, (y + 0.55) * this.squareSize);\n                }\n                if (stage == 9) {\n                    this.setupCanvas();\n                    this.drawTiles();\n                    this.drawLines();\n                    for (const newTile of this.toAnimate.added) {\n                        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#777\";\n                        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(newTile.x * this.squareSize, newTile.y * this.squareSize, this.squareSize, this.squareSize);\n                    }\n                }\n            }\n            stage++;\n        }, 10);\n    }\n    setupCanvas() {\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#777\";\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(0, 0, 800, 800);\n    }\n    addTile() {\n        let x = Math.floor(Math.random() * this.boardSize);\n        let y = Math.floor(Math.random() * this.boardSize);\n        while (this.tiles.filter(tile => tile.x == x && tile.y == y).length > 0) {\n            x = Math.floor(Math.random() * this.boardSize);\n            y = Math.floor(Math.random() * this.boardSize);\n        }\n        let tile = new _Tile__WEBPACK_IMPORTED_MODULE_1__.Tile(x, y);\n        this.tiles.push(tile);\n        this.toAnimate.added.push({ x, y, val: tile.val });\n        if (this.tiles.length == this.boardSize ** 2)\n            this.checkForDie();\n        this.update();\n    }\n    drawTiles() {\n        for (const tile of this.tiles) {\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#' + _consts__WEBPACK_IMPORTED_MODULE_0__.tileColors[tile.val];\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(tile.x * this.squareSize, tile.y * this.squareSize, this.squareSize, this.squareSize);\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#fff\";\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.font = `${120 / this.boardSize}px Arial`;\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.textAlign = \"center\";\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText((_consts__WEBPACK_IMPORTED_MODULE_0__.baseValue * 2 ** tile.val).toString(), (tile.x + 0.5) * this.squareSize, (tile.y + 0.55) * this.squareSize);\n        }\n    }\n    drawLines() {\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.lineWidth = 2;\n        for (let i = 1; i < this.boardSize; i++) {\n            this.drawLine(i * this.squareSize, 0, i * this.squareSize, 800);\n            this.drawLine(0, i * this.squareSize, 800, i * this.squareSize);\n        }\n    }\n    drawLine(x1, y1, x2, y2) {\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.moveTo(x1, y1);\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.lineTo(x2, y2);\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.stroke();\n    }\n    getDirFromString(dir) {\n        let dirs = {\n            up: { dir: \"y\", otherDir: \"x\", sense: -1 },\n            down: { dir: \"y\", otherDir: \"x\", sense: 1 },\n            left: { dir: \"x\", otherDir: \"y\", sense: -1 },\n            right: { dir: \"x\", otherDir: \"y\", sense: 1 },\n        };\n        return dirs[dir];\n    }\n    checkForDie() {\n        for (const tile of this.tiles) {\n            let neighbors = [\n                { x: tile.x, y: tile.y - 1 },\n                { x: tile.x + 1, y: tile.y },\n                { x: tile.x, y: tile.y + 1 },\n                { x: tile.x - 1, y: tile.y }\n            ];\n            for (const neighbor of neighbors) {\n                let t = this.tiles.filter(til => til.x == neighbor.x && til.y == neighbor.y)[0];\n                if (t == undefined)\n                    continue;\n                if (t.val === tile.val)\n                    return;\n            }\n        }\n        this.die();\n    }\n    die() {\n        this.ded = true;\n        setTimeout(() => {\n            window.alert(\"You die lol\");\n            window.location.reload();\n        }, 300);\n    }\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/Game.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"baseValue\": () => (/* binding */ baseValue),\n/* harmony export */   \"ctx\": () => (/* binding */ ctx),\n/* harmony export */   \"tileColors\": () => (/* binding */ tileColors)\n/* harmony export */ });\nconst ctx = document.getElementById(\"game\").getContext(\"2d\");\nconst baseValue = 2.0869140625;\nconst tileColors = [\n    \"603814\",\n    \"ff1e26\",\n    \"f6aab7\",\n    \"55cdfd\",\n    \"e38d00\",\n    \"e7c601\",\n    \"5faad7\",\n    \"1f3554\",\n    \"a8d47a\",\n    \"3ba740\",\n    \"810081\"\n];\n\n\n\n//# sourceURL=webpack://subterra/./src/consts.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nlet controls = {\n    up: \"ArrowUp\",\n    down: \"ArrowDown\",\n    left: \"ArrowLeft\",\n    right: \"ArrowRight\"\n};\nlet game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(controls, 4);\nlet playing = false;\nlet interval;\ndocument.body.addEventListener(\"keyup\", (e) => {\n    let key = parseInt(e.key);\n    if (!Number.isInteger(key) || key == 1)\n        return;\n    game.ded = true;\n    game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(controls, key ? key : 10);\n});\ndocument.body.addEventListener(\"keyup\", (e) => {\n    if (e.key !== \"r\")\n        return;\n    let dirs = [\"up\", \"down\", \"left\", \"right\"];\n    let count = 0;\n    let int = setInterval(() => {\n        game.move(dirs[Math.floor(Math.random() * 4)]);\n        if (++count >= 100)\n            clearInterval(int);\n    }, 10);\n});\ndocument.body.addEventListener(\"keyup\", (e) => {\n    if (e.key !== \"t\")\n        return;\n    let dirs = [\"up\", \"down\", \"left\", \"right\"];\n    if (!playing) {\n        interval = setInterval(() => {\n            game.move(dirs[Math.floor(Math.random() * 4)]);\n        }, 10);\n    }\n    else {\n        clearInterval(interval);\n    }\n    playing = !playing;\n});\n\n\n//# sourceURL=webpack://subterra/./src/main.ts?");

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