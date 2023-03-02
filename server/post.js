import express from "express";
import { getDb } from "./conn.js";

const postRoutes = express.Router();

postRoutes.route("/posts").get(async (req, res) => {
	await getDb()
		.collection("Posts")
		.find({})
		.toArray()
		.then((value) => res.json(value))
		.catch((error) => {
			console.log(error.message);
			res.sendStatus(500);
		});
});

postRoutes.route("/posts/add").post(async (req, res) => {
	await getDb()
		.collection("Posts")
		.insertOne({
			author: req.body.author,
			content: req.body.content,
			created: Date.now(),
		})
		.then((value) => res.json(value))
		.catch((error) => {
			console.log(error.message);
			res.sendStatus(500);
		});
});

export default postRoutes;
