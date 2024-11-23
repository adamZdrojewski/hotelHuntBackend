import { describe, expect, it } from "vitest";
import Hotels from "../../src/logic/Hotels.js";

describe("Creating Hotels object", () => {
    it("Throws no error when no parameters are passed", () => {
        expect(() => {
            new Hotels();
        }).not.toThrow();
    });
});

describe("Running getHotelsInCity function", () => {
	let hotels = new Hotels();

	it("Returns correct data from db when correct parameters are passed", () => {
		// Get data
		let data = hotels.getHotelsInCity("sandusky");

		// Check data
		expect(data.length).toBeGreaterThan(0);
		expect(data[0]).toHaveProperty("id");
		expect(data[0]).toHaveProperty("name");
		expect(data[0]).toHaveProperty("rating");
		expect(data[0]).toHaveProperty("address");
		expect(data[0]).toHaveProperty("description");
		expect(data[0]).toHaveProperty("coordinates");
		expect(data[0]).toHaveProperty("phoneNumber");
	});

	it("Returns empty array when no hotels are found for city", () => {
		expect(hotels.getHotelsInCity("fake_city")).toStrictEqual([]);
	});

	it("Throws error if incorrect parameter is passed", () => {
		expect(() => {
			hotels.getHotelsInCity()
		}).toThrow("Incorrect parameters");
	});
});
