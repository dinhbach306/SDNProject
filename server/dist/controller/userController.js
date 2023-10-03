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
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcryptSalt = bcrypt_1.default.genSaltSync(10);
const userController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body || {};
        try {
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Invalid user data" });
            }
            const userExists = yield userModel_1.default.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }
            const user = yield userModel_1.default.create({
                name,
                email,
                password: bcrypt_1.default.hashSync(password, bcryptSalt),
            });
            if (user) {
                return res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                });
            }
            else {
                return res.status(400).json({ message: "Invalid user data" });
            }
        }
        catch (error) {
            return res.status(500).json(`message: ${error}`);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body || {};
        try {
            if (!email || !password) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
            const isMatch = user.password === password;
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid email or password" });
            }
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        }
        catch (error) {
            return res.status(500).json(`message: ${error}`);
        }
    }),
};
exports.default = userController;
