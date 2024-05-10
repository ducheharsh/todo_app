"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const argon2 = __importStar(require("argon2"));
const config_1 = require("../config");
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
//Zod Validation (for User object)
const userSchema = zod_1.default.object({
    firstName: zod_1.default.string().max(50, { message: 'is very loooooong' }).optional(),
    lastName: zod_1.default.string().max(50, { message: 'is very loooooong' }).optional(),
    username: zod_1.default.string().email({ message: 'must be a valid email' }),
    password: zod_1.default.string().min(8, { message: 'is Too short' }),
});
//signup endpoint
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = userSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: parsedData.error });
    }
    //Argon2 for password hashing instead of bycrypt
    const hashedPass = yield argon2.hash(req.body.password);
    try {
        const user = yield prisma.user.create({
            data: {
                email: req.body.username,
                password: hashedPass,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        });
        const userId = user.id;
        // signing the userId with Json Web Token and returning it
        const jwttoken = jsonwebtoken_1.default.sign({ userId }, config_1.JWT_SECRET);
        res.json({
            msg: "User Created Successfully",
            token: jwttoken
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Unable to create user",
            error: error
        });
    }
}));
//signin endpoint
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = userSchema.safeParse(req.body);
    console.log(parsed);
    if (!parsed.success) {
        res.status(400).json({
            error: parsed.error
        });
        return;
    }
    console.log(req.body.username);
    const user = yield prisma.user.findUnique({
        where: {
            email: req.body.username
        }
    });
    console.log(user);
    if (user) {
        try {
            if (yield argon2.verify(user.password, req.body.password)) {
                const jwttoken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET);
                res.json({
                    token: jwttoken
                });
            }
            else {
                res.status(400).json({
                    msg: "Invalid Password"
                });
            }
        }
        catch (err) {
            res.json({
                msg: "Invalid Password",
                err: err
            });
        }
    }
    else {
        res.status(400).json({
            msg: "User not found"
        });
    }
}));
//insert todo endpoint
router.post("/add-todo", userAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const todo = yield prisma.todos.create({
            data: {
                userId,
                title: req.body.title,
                description: req.body.description
            }
        });
        console.log(todo);
        res.json({
            msg: "Todo Added Successfully",
            todo: todo
        });
    }
    catch (err) {
        res.json({
            msg: "Unable to add Todo",
            error: err
        });
    }
}));
//get all todos endpoint with user info (join used)
router.get("/mytodos", userAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const gettodoswithinfo = yield prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                firstName: true,
                lastName: true,
                todos: true
            }
        });
        if (gettodoswithinfo) {
            res.json({
                firstName: gettodoswithinfo.firstName,
                lastName: gettodoswithinfo.lastName,
                todo: gettodoswithinfo.todos
            });
        }
    }
    catch (err) {
        res.status(400).json({
            msg: "Something went Wrong",
            error: err
        });
    }
}));
router.put("/mytodos/:id", userAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    try {
        const updatetodo = yield prisma.todos.update({
            where: {
                id: parseInt(todoId)
            },
            data: {
                done: req.body.done
            }
        });
        res.json({
            msg: "Todo Updated Successfully",
        });
    }
    catch (err) {
        res.status(400).json({
            msg: "Something went Wrong",
            error: err
        });
    }
}));
exports.default = router;
