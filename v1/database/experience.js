const { db } = require("./utilsDatabase");		
	
const getAllProgrammingLanguages = async () => {
	const res = await db.query('languages', 'experience', async (collection) => {
		const findResult = []
		const cursor = collection.find({});
		for await (const doc of cursor) {
		  findResult.push(doc)
		}
		return findResult;
	})
	return res
};

module.exports = { getAllProgrammingLanguages };