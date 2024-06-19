const {Flights} = require('../models/index')
const {Op} = require('sequelize');
const AppError = require('../utils/app-error');
const { StatusCodes } = require('http-status-codes');

class FlightRepository{

    #createFilter(data){
        let filter = {};
        if(data.arrivalAirportId){
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if(data.departureAirportId){
            filter.departureAirportId = data.departureAirportId;
        }
        if(data.minPrice && data.maxPrice){
            Object.assign(filter, {
                        [Op.and]:[
                        {price:{[Op.gte]:data.minPrice}},
                        {price:{[Op.lte]:data.maxPrice}}]
                    }
                    )
            }
        else if(data.minPrice){
            Object.assign(filter,{price:{[Op.gte]: data.minPrice}})
        }
        else if(data.maxPrice){
            Object.assign(filter,{price: {[Op.lte]: data.maxPrice}})
        }
        return filter;
    }

    async createFlight(data){
        try {
            const flight = await Flights.create(data);
            return flight
        } catch (error) {
            console.log("Something went wrong in the repository layer")
            throw new AppError(
                'RepositoryError',
                'Unable to create a flight',
                'There some error while creating the flight',
                StatusCodes.BAD_REQUEST
            )
        }
    }
    async getFlight(flightId){
        try {
            const flight = await Flights.findByPk(flightId);
            if(!flight){
                throw new AppError(
                    'RepositoryError',
                    'Unable to find such flight',
                    'The flight does not exist in the database',
                    StatusCodes.BAD_REQUEST
                )
            }
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer")
            throw new AppError(
                'RepositoryError',
                'Unable to find such flight',
                'There some error while fetching the flight',
                StatusCodes.BAD_REQUEST
            )
        }
    }

    async getAllFlight(filter){
        try {
            const filterObject = this.#createFilter(filter);
            const flight = await Flights.findAll({
                where: filterObject
            });
            if(!flight){
                throw new AppError(
                    'RepositoryError',
                    'Unable to get flights',
                    'There are no flights in the database',
                    StatusCodes.BAD_REQUEST
                )
            }
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer")
            throw new AppError(
                'RepositoryError',
                'Unable to get all flights',
                'There some error while updating the flight',
                StatusCodes.BAD_REQUEST
            )
        }
    }

    async updateFlights(flightId, data){
        try {
            await Flights.update(data, {
                where: {
                    id: flightId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer")
            throw new AppError(
                'RepositoryError',
                'Unable to update the flight',
                'There some error while updating the flight',
                StatusCodes.BAD_REQUEST
            )
        }
    }
}

module.exports = FlightRepository


/*
{
    where: {
        arrivalAirportId: 2,
        departureAirportId: 3,
        price: {
            [Op.gte]: 4000
        }
    }
}
*/