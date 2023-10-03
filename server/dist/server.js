"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./index"));
dotenv_1.default.config({ path: ".env" });
const DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace("<PASSWORD>", process.env.DATABASE_PASSWORD || "");
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield mongoose_1.default.connect(DB || "");
    console.log("🚀[server]: MongoDB is connected");
    return connection;
});
connectToMongoDB();
const port = process.env.PORT || 3100;
const server = index_1.default.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
