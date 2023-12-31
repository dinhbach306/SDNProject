"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const userRouter = express_1.default.Router();
userRouter
    .post("/register", userController_1.default.register)
    .get("/login", userController_1.default.login);
exports.default = userRouter;
