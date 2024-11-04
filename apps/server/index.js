"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./services/socket"));
const httpServer = http_1.default.createServer();
const socketService = new socket_1.default();
socketService.io.attach(httpServer);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
httpServer.listen(PORT, () => {
    console.log("started server on port", PORT);
});
