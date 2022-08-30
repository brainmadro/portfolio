const geoip = require('geoip-lite');

async function sendGETRequest(url) {
	const res = await fetch(url)
	.then(response => response.json())
	.finally(response => {
		return response
	})
	return res
}

const getGeoLocation = (ip) => {
	const geo = geoip.lookup(ip);
	return geo
}

module.exports = {
	getGeoLocation
}