import express from "express";
import Hotels from "../logic/Hotels.js";

const router = express.Router();

const hotels = new Hotels();

router.get("/geocode", async (req, res) => {
    // Geo-code
    try {
        // Get hotel list
        let hotelsData = await hotels.getHotelsAroundGeocode(req.query.latitude, req.query.longitude, req.query.radius);

        // Get hotel pricing
        let hotelIds = "";
        for(let i = 0; i < hotelsData.length; i++) {
            hotelIds += `${hotelsData[i].id},`;
        }
        if(hotelIds.length > 0) {
            hotelIds = hotelIds.substring(0, hotelIds.length - 1);
        }
        let hotelPrices = await hotels.getHotelPrices(hotelIds);

        // Mix hotel prices into hotelsData array
        for(let i = 0; i < hotelsData.length; i++) {
            hotelsData[i].price = hotelPrices[hotelsData[i].id];
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).end(JSON.stringify(hotelsData));
    } catch(err) {
        res.status(400).end(err.message);
    }
});

export default router;