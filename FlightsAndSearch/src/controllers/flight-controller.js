const {FlightService} = require('../services/index')
const {SuccessfulCodes,ClientErrorCodes} = require('../utils/error-codes')
const flightService = new FlightService(); 

const create = async (req, res)=>{
    try {
        const flightRequestData = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price
        }
        const flight = await flightService.createFlight(flightRequestData);
        return res.status(SuccessfulCodes.OK).json({
            data: flight,
            success: true,
            message: "Successfully created a flight",
            err:{}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data:{},
            success: false,
            message: "Not able to create a flight",
            err: error
        })
    }
}

const getAll = async (req, res)=>{
    try {
        const flights = await flightService.getAllFlightData(req.query);
        return res.status(SuccessfulCodes.OK).json({
            data: flights,
            success: true,
            message: "All flights fetched successfully",
            err: {}
        })
    } catch (error) {
       return res.status(500).json({
            data:{},
            success: false,
            message: "Not able to fetch all flights",
            err: error
        })
    }
}

const getFlight = async (req, res) => {
    try {
        const flight = await flightService.getFlight(req.params.id);
        return res.status(200).json({
            data: flight,
            success: true,
            message: "Successfully fetched the flight",
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch the flight",
            err: error
        })
    }
}

const update = async (req, res)=>{
    try {
        const response = await flightService.updateFlight(req.params.id, req.body);
        res.status(200).json({
            data: response,
            success: true, 
            message: "Successfully updated the flight",
            err: {}
        })
    } catch (error) {
        res.status(500).json({
            data: {},
            success: false,
            message: "Unable to update the flight",
            err: error
        })
    }
}

module.exports = {
    create,
    getAll,
    getFlight,
    update
}