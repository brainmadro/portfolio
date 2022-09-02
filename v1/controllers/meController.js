const meService = require('../services/meService');
const utils = require('./utils')

const getAllProgrammingLanguages = async (req, res) => {
	const response = await meService.getAllProgrammingLanguages()
	res.send({ status: "OK", data: response });
};
  
const getProgrammingLanguage = (req, res) => {
	res.send(req.params.key);
};
  
const createProgrammingLanguage = (req, res) => {
	res.send("Create a new workout");
};
  
const updateProgrammingLanguage = (req, res) => {
	res.send("Update an existing workout");
};
  
const deleteProgrammingLanguage = (req, res) => {
	res.send("Delete an existing workout");
};

const getGeoLocation = (req, res) => {
	var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
	if (ip.startsWith('localhost') || ip.startsWith('127') || ip.startsWith('::')) ip = '181.137.204.208'
	console.log(ip);
	const location = utils.getGeoLocation(ip)
	res.send({ status: "OK", data: location });
};
  
module.exports = {
	getAllProgrammingLanguages,
	getProgrammingLanguage,
	createProgrammingLanguage,
	updateProgrammingLanguage,
	deleteProgrammingLanguage,
	getGeoLocation
};