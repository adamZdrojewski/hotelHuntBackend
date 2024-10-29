import express from "express";
import testRouter from "./routers/testRouter.js";

const app = express();

app.use(express.json());

app.use("/testRouter", testRouter);

app.listen(3000, () => {
    console.log("Server Started!");
});