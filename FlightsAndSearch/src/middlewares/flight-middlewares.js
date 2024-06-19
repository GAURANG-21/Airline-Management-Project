const {ClientErrorCodes} = require('../utils/error-codes')
const validateCreateFlight = (req,res,next)=>{
    if(!req.body.flightNumber||
        !req.body.airplaneId||
        !req.body.departureAirportId||
        !req.body.arrivalAirportId||
        !req.body.arrivalTime||
        !req.body.departureTime||
        !req.body.price){
            //If any of the body param is missing, we come inside if.
            return res.status(ClientErrorCodes.BAD_REQUEST).json({
                data:{},
                success: false,
                message: "Invalid request for creating flight",
                err: "Missing mandatory properties for creating flights"
            })
    }

    next();
}

module.exports = {
    validateCreateFlight
}