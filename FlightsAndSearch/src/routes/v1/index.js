const express = require('express')
const {CityController,AirportController,FlightController,AirportController1}= require('../../controllers/index')
const {FlightMiddlewares} = require('../../middlewares/index')
const router = express.Router()

router.post('/city', CityController.create)
router.post('/cityall', CityController.createMultipleCities)
router.delete('/city/:id',CityController.destroy)
router.get('/city/:id',CityController.get)
router.get('/cityairports/:id',CityController.getAllAirports)
router.get('/city',CityController.getAll)
router.patch('/city/:id',CityController.update)

router.post('/airport', AirportController.create)
router.delete('/airport/:id',AirportController.destroy)
router.get('/airport/:id',AirportController.get)
router.get('/airport',AirportController.getAll)
router.patch('/airport/:id',AirportController.update)

router.post('/airports',AirportController1.create)


router.post('/flights',FlightMiddlewares.validateCreateFlight,FlightController.create)
router.get('/flights',FlightController.getAll)
router.get('/flights/:id', FlightController.getFlight)
router.patch('/flights/:id', FlightController.update)

module.exports = router;