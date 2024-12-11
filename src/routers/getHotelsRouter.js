import express from "express";
import Hotels from "../logic/Hotels.js";

const router = express.Router();

const hotels = new Hotels();

router.get("/cityname", async (req, res) => {
	// City name
	try {
		// Get hotel list
		let hotelsData = hotels.getHotelsInCity(req.query.cityname);
		
		// Send data
		res.setHeader("Content-Type", "application/json");
		res.status(200).end(JSON.stringify(hotelsData));
	} catch(err) {
		res.status(400).end(err.message);
	}
});

export default router;
