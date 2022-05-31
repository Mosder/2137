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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n\r\n\r\nclass Game {\r\n    tiles;\r\n    boardSize;\r\n    ded = false;\r\n    squareSize;\r\n    toAnimate = {\r\n        added: [],\r\n        moved: []\r\n    };\r\n    constructor(controls, boardSize) {\r\n        this.boardSize = boardSize;\r\n        this.squareSize = 800 / boardSize;\r\n        this.tiles = [];\r\n        this.addTile();\r\n        this.addTile();\r\n        this.setupMovement(controls);\r\n    }\r\n    setupMovement(controls) {\r\n        document.body.addEventListener(\"keyup\", (e) => {\r\n            if (this.ded)\r\n                return;\r\n            for (const [direction, key] of Object.entries(controls))\r\n                if (e.key == key)\r\n                    this.move(direction);\r\n        });\r\n    }\r\n    move(direction) {\r\n        let dirInfo = this.getDirFromString(direction);\r\n        let dir = dirInfo.dir;\r\n        let otherDir = dirInfo.otherDir;\r\n        let sense = dirInfo.sense;\r\n        for (let step = 0; step < this.boardSize; step++) {\r\n            let currentTiles = this.tiles.filter(tile => tile[otherDir] == step);\r\n            currentTiles = currentTiles.sort((a, b) => (b[dir] - a[dir]) * sense);\r\n            for (const tile of currentTiles) {\r\n                let tilePos = (sense + 1) / 2 * (this.boardSize - 1);\r\n                for (; tile[dir] != tilePos; tilePos -= sense) {\r\n                    if (currentTiles.filter(t => t[dir] === tilePos).length === 0) {\r\n                        let toA = {\r\n                            prevX: tile.x,\r\n                            prevY: tile.y,\r\n                            x: 0,\r\n                            y: 0,\r\n                            val: tile.val\r\n                        };\r\n                        tile[dir] = tilePos;\r\n                        toA.x = tile.x;\r\n                        toA.y = tile.y;\r\n                        this.toAnimate.moved.push(toA);\r\n                        break;\r\n                    }\r\n                    else if ((currentTiles.filter(t => t[dir] === tilePos - sense).length === 0 ||\r\n                        currentTiles.filter(t => t[dir] === tilePos - sense)[0] === tile)\r\n                        && currentTiles.filter(t => t[dir] === tilePos)[0].val === tile.val) {\r\n                        this.tiles = this.tiles.filter(t => t !== tile);\r\n                        currentTiles = currentTiles.filter(t => t !== tile);\r\n                        currentTiles.filter(t => t[dir] === tilePos)[0].val++;\r\n                        this.toAnimate.moved.push({\r\n                            prevX: tile.x,\r\n                            prevY: tile.y,\r\n                            x: currentTiles.filter(t => t[dir] === tilePos)[0].x,\r\n                            y: currentTiles.filter(t => t[dir] === tilePos)[0].y,\r\n                            val: tile.val\r\n                        });\r\n                        break;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        if (this.tiles.length !== this.boardSize ** 2)\r\n            this.addTile();\r\n    }\r\n    update() {\r\n        let stage = 0;\r\n        let interval = setInterval(() => {\r\n            if (stage == 20) {\r\n                this.toAnimate = {\r\n                    added: [],\r\n                    moved: []\r\n                };\r\n                clearInterval(interval);\r\n                this.setupCanvas();\r\n                this.drawTiles();\r\n                this.drawLines();\r\n            }\r\n            else if (stage >= 10) {\r\n                for (const newTile of this.toAnimate.added) {\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#' + _consts__WEBPACK_IMPORTED_MODULE_0__.tileColors[newTile.val];\r\n                    let x = newTile.x + (20 - stage) / 20;\r\n                    let y = newTile.y + (20 - stage) / 20;\r\n                    let size = this.squareSize * (stage - 10) / 10;\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(x * this.squareSize, y * this.squareSize, size, size);\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#fff\";\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.font = `${120 / this.boardSize * (stage - 10) / 10}px Arial`;\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.textAlign = \"center\";\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText((_consts__WEBPACK_IMPORTED_MODULE_0__.baseValue * 2 ** newTile.val).toString(), (x + 0.5 * (stage - 10) / 10) * this.squareSize, (y + 0.55 * (stage - 10) / 10) * this.squareSize);\r\n                }\r\n            }\r\n            else {\r\n                this.drawLines();\r\n                for (const movedTile of this.toAnimate.moved) {\r\n                    let x = movedTile.x;\r\n                    let y = movedTile.y;\r\n                    let prevX = movedTile.x;\r\n                    let prevY = movedTile.y;\r\n                    if (movedTile.prevX !== movedTile.x) {\r\n                        let diff = Math.abs(movedTile.prevX - movedTile.x);\r\n                        let sense = movedTile.prevX > movedTile.x ? -1 : 1;\r\n                        x = movedTile.prevX + stage * diff / 10 * sense;\r\n                        prevX = movedTile.prevX + (stage - 1) * diff / 10 * sense;\r\n                    }\r\n                    else {\r\n                        let diff = Math.abs(movedTile.prevY - movedTile.y);\r\n                        let sense = movedTile.prevY > movedTile.y ? -1 : 1;\r\n                        y = movedTile.prevY + stage * diff / 10 * sense;\r\n                        prevY = movedTile.prevY + (stage - 1) * diff / 10 * sense;\r\n                    }\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#777\";\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(prevX * this.squareSize, prevY * this.squareSize, this.squareSize, this.squareSize);\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#' + _consts__WEBPACK_IMPORTED_MODULE_0__.tileColors[movedTile.val];\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#fff\";\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.font = `${120 / this.boardSize}px Arial`;\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.textAlign = \"center\";\r\n                    _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText((_consts__WEBPACK_IMPORTED_MODULE_0__.baseValue * 2 ** movedTile.val).toString(), (x + 0.5) * this.squareSize, (y + 0.55) * this.squareSize);\r\n                }\r\n                if (stage == 9) {\r\n                    this.setupCanvas();\r\n                    this.drawTiles();\r\n                    this.drawLines();\r\n                    for (const newTile of this.toAnimate.added) {\r\n                        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#777\";\r\n                        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(newTile.x * this.squareSize, newTile.y * this.squareSize, this.squareSize, this.squareSize);\r\n                    }\r\n                }\r\n            }\r\n            stage++;\r\n        }, 10);\r\n    }\r\n    setupCanvas() {\r\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#777\";\r\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(0, 0, 800, 800);\r\n    }\r\n    addTile() {\r\n        let x = Math.floor(Math.random() * this.boardSize);\r\n        let y = Math.floor(Math.random() * this.boardSize);\r\n        while (this.tiles.filter(tile => tile.x == x && tile.y == y).length > 0) {\r\n            x = Math.floor(Math.random() * this.boardSize);\r\n            y = Math.floor(Math.random() * this.boardSize);\r\n        }\r\n        let tile = new _Tile__WEBPACK_IMPORTED_MODULE_1__.Tile(x, y);\r\n        this.tiles.push(tile);\r\n        this.toAnimate.added.push({ x, y, val: tile.val });\r\n        if (this.tiles.length == this.boardSize ** 2)\r\n            this.checkForDie();\r\n        this.update();\r\n    }\r\n    drawTiles() {\r\n        for (const tile of this.tiles) {\r\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#' + _consts__WEBPACK_IMPORTED_MODULE_0__.tileColors[tile.val];\r\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(tile.x * this.squareSize, tile.y * this.squareSize, this.squareSize, this.squareSize);\r\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"#fff\";\r\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.font = `${120 / this.boardSize}px Arial`;\r\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.textAlign = \"center\";\r\n            _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText((_consts__WEBPACK_IMPORTED_MODULE_0__.baseValue * 2 ** tile.val).toString(), (tile.x + 0.5) * this.squareSize, (tile.y + 0.55) * this.squareSize);\r\n        }\r\n    }\r\n    drawLines() {\r\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.lineWidth = 2;\r\n        for (let i = 1; i < this.boardSize; i++) {\r\n            this.drawLine(i * this.squareSize, 0, i * this.squareSize, 800);\r\n            this.drawLine(0, i * this.squareSize, 800, i * this.squareSize);\r\n        }\r\n    }\r\n    drawLine(x1, y1, x2, y2) {\r\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();\r\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.moveTo(x1, y1);\r\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.lineTo(x2, y2);\r\n        _consts__WEBPACK_IMPORTED_MODULE_0__.ctx.stroke();\r\n    }\r\n    getDirFromString(dir) {\r\n        let dirs = {\r\n            up: { dir: \"y\", otherDir: \"x\", sense: -1 },\r\n            down: { dir: \"y\", otherDir: \"x\", sense: 1 },\r\n            left: { dir: \"x\", otherDir: \"y\", sense: -1 },\r\n            right: { dir: \"x\", otherDir: \"y\", sense: 1 },\r\n        };\r\n        return dirs[dir];\r\n    }\r\n    checkForDie() {\r\n        for (const tile of this.tiles) {\r\n            let neighbors = [\r\n                { x: tile.x, y: tile.y - 1 },\r\n                { x: tile.x + 1, y: tile.y },\r\n                { x: tile.x, y: tile.y + 1 },\r\n                { x: tile.x - 1, y: tile.y }\r\n            ];\r\n            for (const neighbor of neighbors) {\r\n                let t = this.tiles.filter(til => til.x == neighbor.x && til.y == neighbor.y)[0];\r\n                if (t == undefined)\r\n                    continue;\r\n                if (t.val === tile.val)\r\n                    return;\r\n            }\r\n        }\r\n        this.die();\r\n    }\r\n    die() {\r\n        this.ded = true;\r\n        setTimeout(() => {\r\n            window.alert(\"You die lol\");\r\n            window.location.reload();\r\n        }, 300);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://subterra/./src/Game.ts?");

/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tile\": () => (/* binding */ Tile)\n/* harmony export */ });\nclass Tile {\r\n    x;\r\n    y;\r\n    val;\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.val = Math.floor(Math.random() * 10) ? 0 : 1;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://subterra/./src/Tile.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"baseValue\": () => (/* binding */ baseValue),\n/* harmony export */   \"ctx\": () => (/* binding */ ctx),\n/* harmony export */   \"tileColors\": () => (/* binding */ tileColors)\n/* harmony export */ });\nconst ctx = document.getElementById(\"game\").getContext(\"2d\");\r\nconst baseValue = 2.0869140625;\r\nconst tileColors = [\r\n    \"603814\",\r\n    \"ff1e26\",\r\n    \"f6aab7\",\r\n    \"55cdfd\",\r\n    \"e38d00\",\r\n    \"e7c601\",\r\n    \"5faad7\",\r\n    \"1f3554\",\r\n    \"a8d47a\",\r\n    \"3ba740\",\r\n    \"810081\"\r\n];\r\n\r\n\n\n//# sourceURL=webpack://subterra/./src/consts.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\r\nlet controls = {\r\n    up: \"ArrowUp\",\r\n    down: \"ArrowDown\",\r\n    left: \"ArrowLeft\",\r\n    right: \"ArrowRight\"\r\n};\r\nlet game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(controls, 4);\r\ndocument.body.addEventListener(\"keyup\", (e) => {\r\n    let key = parseInt(e.key);\r\n    if (!Number.isInteger(key) || key == 1)\r\n        return;\r\n    game.ded = true;\r\n    game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(controls, key ? key : 10);\r\n});\r\ndocument.body.addEventListener(\"keyup\", (e) => {\r\n    if (e.key !== \"r\")\r\n        return;\r\n    let dirs = [\"up\", \"down\", \"left\", \"right\"];\r\n    let count = 0;\r\n    let interval = setInterval(() => {\r\n        game.move(dirs[Math.floor(Math.random() * 4)]);\r\n        if (++count >= 100)\r\n            clearInterval(interval);\r\n    }, 10);\r\n});\r\n\n\n//# sourceURL=webpack://subterra/./src/main.ts?");

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