import { cors } from "cors";
import { express } from "express";
import { postRoutes } from "./routes/post";
import { connectToServer } from "./db/conn";

const app = express();
app.use(express.json());
app.use(postRoutes);
app.use(cors());

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.listen(port, () => {
	connectToServer();
	console.log(`Server is running on port: ${port}`);
});
