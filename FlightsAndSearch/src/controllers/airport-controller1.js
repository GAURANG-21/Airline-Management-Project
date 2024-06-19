const {AirportService1} = require('../services/index')
const airportService1 = new AirportService1();
const create = async(req,res)=>{
    try {
        const response = await airportService1.create(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created airport",
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Unable to create airport",
            err: error
        })
    }
}

module.exports = {
    create
}