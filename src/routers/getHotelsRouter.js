import express from "express";
import Hotels from "../logic/Hotels.js";

const router = express.Router();

const hotels = new Hotels();

router.get("/geocode", async (req, res) => {
    // Geo-code
    try {
        let hotelsData = await hotels.getHotelsAroundGeocode(req.query.latitude, req.query.longitude, req.query.radius);
        res.setHeader("Content-Type", "application/json");
        res.status(200).end(JSON.stringify(hotelsData));
    } catch(err) {
        res.status(400).end(err.message);
    }
});

export default router;