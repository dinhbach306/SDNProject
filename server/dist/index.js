"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const contextPath = process.env.CONTEXT_PATH;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://127.0.0.1:5173",
}));
app.use(contextPath, userRoute_1.default);
exports.default = app;
