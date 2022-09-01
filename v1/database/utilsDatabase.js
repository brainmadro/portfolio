const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });

const connection = async () => {
	try {
		await client.connect();
	
		const database = client.db('mine');
		/* const collection = database.collection('movies');
	
		// Query for a movie that has the title 'Back to the Future'
		const query = { genres: "Comedy", poster: { $exists: true } };
		const cursor = await collection.aggregate([
		  { $match: query },
		  { $sample: { size: 1 } },
		  { $project: 
			{
			  title: 1,
			  fullplot: 1,
			  poster: 1
			}
		  }
		]);
	
		const movie = await cursor.next(); */
	
		return database;
	} catch(err) {
		console.log(err);
	}
	finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

module.exports = { 
	db: {
		connection
	}
}