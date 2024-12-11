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
				phoneNumber:result[i].PhoneNumber,
				rate: this.getHotelRate(result[i].HotelRating)
			});
		}

		// Return found hotels
		return hotels;
	}

	getHotelRate(rating) {
		switch(rating) {
			case "All":
				return "$" + this.getRandomNumber(400, 650).toFixed(2);
			case "FourStar":
				return "$" + this.getRandomNumber(300, 450).toFixed(2);
			case "ThreeStar":
				return "$" + this.getRandomNumber(200, 350).toFixed(2);
			case "TwoStar":
				return "$" + this.getRandomNumber(130, 230).toFixed(2);
			case "OneStar":
				return "$" + this.getRandomNumber(70, 150).toFixed(2);
		}
	}

	getRandomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}
}
