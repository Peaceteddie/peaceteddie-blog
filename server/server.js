import { connectToServer } from "./db/conn";
import express, { json } from "express";
import cors from "cors";
import recordRoutes from "./routes/record";
import * as dotenv from "dotenv";

const app = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use(recordRoutes);

app.listen(port, () => {
  connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
