import "dotenv/config";
import Amadeus from "amadeus";

export default class Hotels {
    amadeus;

    constructor() {
        this.amadeus = new Amadeus({
            clientId: process.env.AMADEUS_API_KEY,
            clientSecret: process.env.AMADEUS_API_SECRET
        });
    }

    /**
     * Gets hotels around certain coordinates from Amadeus API
     * @param latitude {number}
     * @param longitude {number}
     * @param radius {number}
     * @returns {Promise} Array of hotel objects
     */
    async getHotelsAroundGeocode(latitude, longitude, radius = 5) {
        // Check if parameters exist
        if(!latitude || !longitude || !radius) {
            throw new Error("Incorrect parameters");
        }

        // Check if parameters are numbers
        let results = [latitude*100, longitude*100, radius*100];
        for(let i = 0; i < results.length; i++) {
            if(isNaN(results[i])) {
                throw new Error("Parameters must be numbers");
            }
        }

        // Make request
        let res;
        try {
            res = await this.amadeus.referenceData.locations.hotels.byGeocode.get({
                latitude,
                longitude,
                radius,
                radiusUnit: "MILE"
            });
        } catch(err) {
            // Check if nothing was found
            if(err.description[0].detail === "Nothing found for the requested criteria") {
                return [];
            } else {
                throw new Error(err.description[0].detail);
            }
        }

        // Compile output
        let output = [];
        for(let i = 0; i < res.data.length; i++) {
            output.push({
                id: res.data[i].hotelId,
                name: res.data[i].name,
                location: res.data[i].geoCode,
                distance: res.data[i].distance
            });
        }

        // Return output
        return output;
    }
}