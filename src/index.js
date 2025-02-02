import express from "express";
import getHotelsRouter from "./routers/getHotelsRouter.js";
import cors from "cors";

// Constants
const app = express();

// Express setup
app.use(cors());
app.use(express.json());
app.use("/gethotels", getHotelsRouter);

// Listen for requests
app.listen(3001, () => {
	console.log("Server Started!");
});
