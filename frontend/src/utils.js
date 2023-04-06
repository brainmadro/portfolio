const ME_ROOT = '/me/v1'

async function sendGETRequest(url) {
	const res = await fetch(url)
	.then(response => response.json())
	.finally(response => {
		return response
	})
	return res
}

const getProgrammingLanguages = async () => {
	const res = await sendGETRequest(`${ME_ROOT}/languages`)
	return res
}

const getLang = async (lang) => {
	const res = require(`./lang/${lang}.json`);
	return res
}

const getGeoLocation = async () => {
	const res = await sendGETRequest(`${ME_ROOT}/location`)
	return res
}

const utils = {
	programming: {
		getProgrammingLanguages
	},
	location: {
		getLang,
		getGeoLocation
	}
}

export default utils;