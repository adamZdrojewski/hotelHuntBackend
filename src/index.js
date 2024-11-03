import "dotenv/config";
import express from "express";
import getHotelsRouter from "./routers/getHotelsRouter.js";

// Check for environment variables
if(!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
    // Script does not have all required environment variables
    if(!process.env.AMADEUS_API_KEY) {
        console.error("Missing required variable AMADEUS_API_KEY");
    }
    if(!process.env.AMADEUS_API_SECRET) {
        console.error("Missing required variable AMADEUS_API_SECRET");
    }
    process.exit(1);
}

// Constants
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;
const app = express();

// Express setup
app.use(express.json());
app.use("/gethotels", getHotelsRouter);

// Listen for requests
app.listen(3001, () => {
    console.log("Server Started!");
});