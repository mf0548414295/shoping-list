"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const category_route_1 = require("./routes/category.route");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = { origin: 'http://localhost:5173', credentials: true };
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/category', category_route_1.categoryRoutes);
dotenv_1.default.config();
const { PORT, DATABASE, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
let DB = '';
if (DATABASE && DATABASE_PASSWORD && DATABASE_NAME) {
    DB = DATABASE.replace('<DB_PASSWORD>', DATABASE_PASSWORD).replace('<DB_NAME>', DATABASE_NAME);
}
else if (DATABASE && DATABASE_NAME) {
    DB = DATABASE + DATABASE_NAME;
}
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect(DB)
    .then(() => console.log(`DB connection to ${DATABASE_NAME} was successful!`, '\x1b[0m'))
    .catch((e) => console.log(e));
const connection = mongoose_1.default.connection;
connection.on('open', () => {
    console.log(' database connected');
});
const port = PORT;
exports.server = app.listen(port, () => {
    console.log('\x1b[32m', `Server running on port ${port}...`);
});
// catch async errors
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err, err.name, err.message);
    console.log(err.stack);
    // easy close the server
    exports.server.close(() => {
        process.exit(1);
    });
});
