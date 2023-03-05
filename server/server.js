import fs from "fs";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import admin from "firebase-admin";
import { connectToServer } from "./conn.js";
import postRoutes from "./post.js";

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({ credential: admin.credential.cert(credentials) });

const app = express();
app.use(express.json());
app.use(postRoutes);
app.use(cors());

dotenv.config();
const port = process.env.PORT || 5000;

app.use(async (req, res, next) => {
	const { authtoken } = req.headers;

	if (authtoken) {
		req.user = await admin
			.auth()
			.verifyIdToken(authtoken)
			.catch((error) => {
				return res.sendStatus(400);
			});
	}

	req.user ??= {};

	next();
});

app.listen(port, () => {
	connectToServer();
	console.log(`Server is running on port: ${port}`);
});
