import { describe, expect, it } from "vitest";
import Hotels from "../../src/logic/Hotels.js";

describe("Creating Hotels object", () => {
    it("Throws no error when no parameters are passed", () => {
        expect(() => {
            new Hotels();
        }).not.toThrow();
    });
});

describe("Running getHotelsAroundGeocode function", () => {
    let hotels = new Hotels();

    it("Returns correct data from API when correct parameters are passed", async () => {
        // Get data
        let data = await hotels.getHotelsAroundGeocode(41.48, -82.68);

        // Check data
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty("id");
        expect(data[0]).toHaveProperty("name");
        expect(data[0]).toHaveProperty("location");
        expect(data[0]).toHaveProperty("distance");
    });

    it("Returns empty array when no hotels are found for location", async () => {
        expect(hotels.getHotelsAroundGeocode(42.21, -81.15, 1)).resolves.toEqual([]);
    });

    it("Throws error if incorrect parameter is passed", async () => {
        expect(hotels.getHotelsAroundGeocode()).rejects.toThrow("Incorrect parameters");
        expect(hotels.getHotelsAroundGeocode(1)).rejects.toThrow("Incorrect parameters");
        expect(hotels.getHotelsAroundGeocode("a", 1)).rejects.toThrow("Parameters must be numbers");
        expect(hotels.getHotelsAroundGeocode(1, "a")).rejects.toThrow("Parameters must be numbers");
        expect(hotels.getHotelsAroundGeocode(1, 1, "a")).rejects.toThrow("Parameters must be numbers");
    });

    it("Returns error if API fails", async () => {
        // Cause API to error out with bad geocode
        expect(hotels.getHotelsAroundGeocode(10000000000000, 10000000000000)).rejects.toThrow();
    });
});

describe("Running getHotelPrices function", () => {
    let hotels = new Hotels();

    /*it("Returns data from API when correct parameters are passed", async () => {
        // Get data
        let data = await hotels.getHotelPrices("CYHSHGVC,MVLASNEW");

        // Check data
        expect(data).toHaveProperty("CYHSHGVC");
        expect(data).toHaveProperty("MVLASNEW");
    });

    it("Returns undefined for hotels that didn't have any offers listed", async () => {
        // Get data
        let data = await hotels.getHotelPrices("YXSKYGWL,MVLASNEW");

        // Check data
        expect(data.YXSKYGWL).toBe(undefined);
        expect(data.MVLASNEW).not.toBe(undefined);
    }, 30000);*/

    it("Returns empty object if no hotels have offers listed", async () => {
        expect(await hotels.getHotelPrices("YXSKYGWL")).toStrictEqual({});
    }, 30000);

    it("Throws error if API fails", async () => {
        expect(hotels.getHotelPrices("ABC")).rejects.toThrow();
    });
});