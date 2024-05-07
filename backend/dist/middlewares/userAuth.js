"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function userAuth(req, res, next) {
    const pretoken = req.headers.authorization;
    console.log(pretoken);
    if (!pretoken) {
        return res.status(401).json({ message: "No token found" });
    }
    const token = pretoken.split(" ")[1];
    const decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (!decodedToken.userId) {
        res.status(401).json({ message: "Token not valid" });
    }
    else {
        req.userId = decodedToken.userId;
        next();
    }
}
exports.default = userAuth;
