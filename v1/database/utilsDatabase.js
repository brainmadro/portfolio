const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });

const query = async (dbName, colName, execute) => {
	try {
		await client.connect();
		const database = client.db(dbName);
		const collection = database.collection(colName);
		 return await execute(collection)
	} catch(err) {
		console.log(err);
	}
	finally {
		// Ensures that the client will close when you finish/error
		await client.close();
		console.log("Conection Closed");
	}
}

module.exports = {
	db: { query }
}