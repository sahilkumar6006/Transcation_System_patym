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
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("../controller/user-controller.js");
const UserRouter = express_1.default.Router();
UserRouter.post('/sign-up', (req, res, next) => {
    (0, user_controller_js_1.signUp)(req, res).catch(next);
});
UserRouter.post('/sign-in', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, user_controller_js_1.signin)(req, res).catch(next);
}));
exports.default = UserRouter;
