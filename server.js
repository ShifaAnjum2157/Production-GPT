import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//routes path
import authRoutes from "./routes/authRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js"
import path from 'path';
import { fileURLToPath } from 'url';
//dotenv
dotenv.config();

//mongo connection
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/open", openaiRoutes);
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//listen server
app.listen(PORT, () => {
    console.log(
        `Server Running in mode on port no ${PORT}`
    );
});