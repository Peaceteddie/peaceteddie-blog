import { MongoClient } from "mongodb";

var _db;

export function connectToServer() {
	const Db = process.env.ATLAS_URI;
	const client = new MongoClient(Db);

	client.connect().then(
		(db) => {
			if (db) {
				_db = db.db("Blog");
				console.log(
					"Successfully connected to MongoDB and " + _db.databaseName
				);
			}
		},
		(err) => console.log(err)
	);
}

export function getDb() {
	return _db;
}
