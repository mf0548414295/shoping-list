import dotenv from "dotenv";
import express, { Express } from "express";
import { categoryRoutes } from "./routes/category.route";
import mongoose from 'mongoose';
import cors from 'cors';

const app: Express = express();
const corsOptions = { origin: 'http://localhost:5173', credentials: true };
app.use(cors(corsOptions));
app.use(express.json());

app.use('/category', categoryRoutes);

dotenv.config();
const {  PORT, DATABASE, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
let DB = '';

if (DATABASE && DATABASE_PASSWORD && DATABASE_NAME) {
	DB = DATABASE.replace('<DB_PASSWORD>', DATABASE_PASSWORD).replace('<DB_NAME>', DATABASE_NAME);
} else if (DATABASE && DATABASE_NAME) {
	DB = DATABASE + DATABASE_NAME;
}

mongoose.set('strictQuery', true);

mongoose
	.connect(DB)
	.then(() => console.log(`DB connection to ${DATABASE_NAME} was successful!`, '\x1b[0m'))
	.catch((e) => console.log(e));

const connection = mongoose.connection;
connection.on('open', () => {
	console.log(' database connected');
});

const port = PORT;

export const server = app.listen(port, () => {
	console.log('\x1b[32m', `Server running on port ${port}...`);
});

// catch async errors
process.on('unhandledRejection', (err: Error) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err, err.name, err.message);
	console.log(err.stack);
	// easy close the server
	server.close(() => {
		process.exit(1);
	});
});



