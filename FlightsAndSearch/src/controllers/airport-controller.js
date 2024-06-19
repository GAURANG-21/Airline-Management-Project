const {AirportService} = require('../services/index.js')
const airportService = new AirportService();

/**
 * POST
 * data -> res.body
 */
const create = async(req, res) =>{
    try {
        const city = await airportService.createAirport(req.body);
        return res.status(201).json({
            data: city, 
            success: true,
            message: "Successfully created an airport", 
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to create a airport",
            err: error
        });
    }
}

/**
 * DELETE
 * URL- /airport/:id
 */
const destroy = async (req, res) =>{
    try{
        const response = await airportService.deleteAirport(req.params.id);
        return res.status(200).json({
            data: response, 
            success: true,
            message: "Successfully deleted airport", 
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to delete a airport",
            err: error
        });
    }
}

/**
 * PATCH
 * /airport/:id // the id which we want to replace
 * req.body // with which we want to update
 */
const update = async (req, res) =>{
    try {
        const response = await airportService.updateAirport(req.params.id,req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully updated the airport",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to update the airport",
            err: error
        });
    }
}

/**
 * GET
 * /airport/:id
 */
const get = async (req, res) =>{
    try {
        const response = await airportService.getAirport(req.params);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched the airport",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to get a airport",
            err: error
        });
    }
}

const getAll = async (req, res)=>{
    try {
        const city = await airportService.getAllAirport(req.query);
        return res.status(200).json({
            data: city,
            success: true,
            message: "Successfully fetched all the airports",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch all airports",
            err: error
        })
    }
}

module.exports = {
    create, 
    destroy, 
    get, 
    update,
    getAll
}