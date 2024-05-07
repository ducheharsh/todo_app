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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertTodo = exports.insertUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//inseting users in users Table
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                email: username,
                password,
                firstName,
                lastName
            }
        });
        console.log(res);
    });
}
exports.insertUser = insertUser;
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            where: { email: username },
            data: {
                firstName,
                lastName
            }
        });
        console.log(res);
    });
}
function insertTodo(userId_1, _a) {
    return __awaiter(this, arguments, void 0, function* (userId, { title, description }) {
        try {
            const result = yield prisma.todos.create({
                data: {
                    userId,
                    title,
                    description,
                }
            });
            console.log(result);
            return result;
        }
        catch (err) {
            console.log(err + " " + "Unable to add Todo");
        }
    });
}
exports.insertTodo = insertTodo;
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_Id = parseInt(userId);
        try {
            const result = yield prisma.todos.findMany({
                where: {
                    userId: user_Id,
                }
            });
            console.log(result);
            return result;
        }
        catch (err) {
            console.log(err + " " + "Unable to add Todo");
        }
    });
}
function getTodosAndUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    firstName: true,
                    lastName: true,
                    todos: true
                }
            });
            console.log(results);
            return results;
        }
        catch (err) {
            console.log(err + " " + "Not able to get Todos");
        }
    });
}
