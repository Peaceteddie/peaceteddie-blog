import express from "express";
import { getDb } from "./conn.js";

function UnAuth(caller) {
	console.error("Unauthorized access to " + caller);
}

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
	if (req.user) {
		await getDb()
			.collection("Posts")
			.insertOne({
				author: req.body.author,
				content: req.body.content,
				created: Date.now(),
				language: req.body.language,
				title: req.body.title,
			})
			.then((value) => {
				value.user = req.user;
				res.json(value);
			})
			.catch((error) => {
				console.log(error.message);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(401);
		UnAuth("posts/add");
	}
});

export default postRoutes;
