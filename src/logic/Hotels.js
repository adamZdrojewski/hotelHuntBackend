import Database from "better-sqlite3";

export default class Hotels {
	db;

	constructor() {
		// Sqlite setup
		this.db = new Database("./hotels.db", {});
		this.db.pragma("journal_mode = WAL");
	}

	getHotelsInCity(cityName) {
		// Check if cityName exists
		if(!cityName) {
			throw new Error("Incorrect parameters");
		}

		// Make query
		const stmt = this.db.prepare(`SELECT * FROM hotels WHERE cityName LIKE '%${cityName}%'`);
		const result = stmt.all();

		// Compile output
		let hotels = [];
		for(let i = 0; i < result.length; i++) {
			hotels.push({
				id: result[i].HotelCode,
				name: result[i].HotelName,
				rating: result[i].HotelRating,
				address: result[i].Address,
				description: result[i].Description,
				coordinates: result[i].Map,
				phoneNumber:result[i].PhoneNumber 
			});
		}

		// Return found hotels
		return hotels;
	}
}
