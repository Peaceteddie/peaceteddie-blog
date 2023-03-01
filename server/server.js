import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import postRoutes from "./post.js";
import { connectToServer } from "./conn.js";

const app = express();
app.use(express.json());
app.use(postRoutes);
app.use(cors());

dotenv.config();
const port = process.env.PORT || 5000;

app.listen(port, () => {
	connectToServer();
	console.log(`Server is running on port: ${port}`);
});
