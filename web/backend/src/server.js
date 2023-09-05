import "dotenv/config";
import process from "node:process";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongo from "./database/connect.js";
import { castErrorHandler, notFound } from "./middleware/error.js";
import routes from "./routes/task.route.js";

const port = process.env.PORT || 8080;
const app = express();

connectMongo();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(notFound);
app.use(castErrorHandler);

app.listen(port, () => console.log(`Started server on port ${port}`));