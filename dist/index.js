"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const user_1 = __importDefault(require("./userRoutes/user"));
const transferFunds_1 = __importDefault(require("./userRoutes/transferFunds"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api/v1', user_1.default);
app.use('/api/v1/transfer-funds', transferFunds_1.default);
(0, db_1.connectDb)();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
