const {CityService} = require('../services/index.js')
const cityService = new CityService();

/**
 * POST
 * data -> res.body
 */
const create = async(req, res) =>{
    try {
        console.log("body of request" ,req.body)
        const city = await cityService.createCity(req.body);
        return res.status(201).json({
            data: city, 
            success: true,
            message: "Successfully created a city", 
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to create a city",
            err: error
        });
    }
}


const createMultipleCities = async (req,res) => {
   try {
        const city = await cityService.createMultipleCities(req.body)
        return res.status(200).json({
            data: city,
            success: true,
            message: "Successfully created cities",
            err: {}
        })
   } catch (error) {
        res.status(500).json({
            data: {}, 
            success: false,
            message: "Multiple cities are not created",
            err: error
        })
   }
}
/**
 * DELETE
 * URL- /city/:id
 */
const destroy = async (req, res) =>{
    try{
        const response = await cityService.deleteCity(req.params.id);
        return res.status(200).json({
            data: response, 
            success: true,
            message: "Successfully created a city", 
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to delete a city",
            err: error
        });
    }
}

/**
 * PATCH
 * /city/:id // the id which we want to replace
 * req.body // with which we want to update
 */
const update = async (req, res) =>{
    try {
        const response = await cityService.updateCity(req.params.id,req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully updated the city",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to update the city",
            err: error
        });
    }
}

/**
 * GET
 * /city/:id
 */
const get = async (req, res) =>{
    try {
        const response = await cityService.getCity(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched the city",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to get a city",
            err: error
        });
    }
}

const getAll = async (req, res)=>{
    try {
        const city = await cityService.getAllCities(req.query);
        return res.status(200).json({
            data: city,
            success: true,
            message: "Successfully fetched all the cities",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch all cities",
            err: error
        })
    }
}

 const getAllAirports = async (req,res)=>{
    try {
        const airport = await cityService.getAllAirports(req.params.id)
        return res.status(200).json({
            data: airport,
            success: true,
            message: "Able to fetch all airports of the corresponding city",
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch all airports of the corresponding city",
            err: error
        })
    }
}

module.exports = {
    create, 
    destroy, 
    get, 
    update,
    getAll,
    createMultipleCities,
    getAllAirports
}