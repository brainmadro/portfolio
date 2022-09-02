const experience = require("../database/experience");

const getAllProgrammingLanguages = () => {
	const xp = experience.getAllProgrammingLanguages()
	return xp
};
  
const createProgrammingLanguage = () => {
	return;
};
  
const updateProgrammingLanguage = () => {
	return;
};
  
const deleteProgrammingLanguage = () => {
	return;
};
  
module.exports = {
	getAllProgrammingLanguages,
	createProgrammingLanguage,
	updateProgrammingLanguage,
	deleteProgrammingLanguage
};