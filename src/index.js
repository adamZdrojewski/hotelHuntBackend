import express from "express";
import getHotelsRouter from "./routers/getHotelsRouter.js";

// Constants
const app = express();

// Express setup
app.use(express.json());
app.use("/gethotels", getHotelsRouter);

// Listen for requests
app.listen(3001, () => {
    console.log("Server Started!");
});
