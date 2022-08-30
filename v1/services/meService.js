const Experience = require("../database/experience");
const EN = require("../database/en");
const ES = require("../database/es");

const getAllProgrammingLanguages = () => {
	const experience = Experience.getAllProgrammingLanguages()
	return experience
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
  
const getLanguage = (lang) => {
	if (lang != "es") return EN
	return ES
};
  
module.exports = {
	getAllProgrammingLanguages,
	createProgrammingLanguage,
	updateProgrammingLanguage,
	deleteProgrammingLanguage,
	getLanguage
};