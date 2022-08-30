const router = require('express').Router()
const meController = require('../controllers/meController');

router.get('/languages', meController.getAllProgrammingLanguages)
router.get('/languages/:key', meController.getProgrammingLanguage)
router.get('/lang/:lang', meController.getLanguage)
router.get('/location', meController.getGeoLocation)

module.exports = router