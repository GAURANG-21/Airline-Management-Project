const { StatusCodes } = require('http-status-codes');
const {FlightRepository,AirplaneRepository} = require('../repository/index')
const {compareTime} = require('../utils/helper');
const ServiceError = require('../utils/service-error');

class FlightService{

    constructor(){
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data){
        try {
            if(!compareTime(data.arrivalTime,data.departureTime))
            throw {error:"Arrival time cannot be less than departure time"}
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({...data, totalSeats:airplane.capacity})
            return flight;
        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            if(error.name == 'RepositoryError'){
                throw error
            }
            throw new ServiceError(
                "Unable to create a flight",
                "Something went wrong while getting flight",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getAllFlightData(data){
        try {
            const flights = await this.flightRepository.getAllFlight(data);
            return flights;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error}
        }
    }

    async getFlight(flightId){
        try {
            const flight = await this.flightRepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            if(error.name == 'RepositoryError'){
                throw error
            }
            throw new ServiceError(
                "Unable to create a flight",
                "Something went wrong while getting flight",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async updateFlight(flightId, data){
      try {
          const response = await this.flightRepository.updateFlights(flightId, data);
          return response;
      } catch (error) {
        console.log("Something went wrong in the service layer", error);
        if(error.name == 'RepositoryError'){
            throw error
        }
        throw new ServiceError(
            "Unable to create a flight",
            "Something went wrong while getting flight",
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
    }
}

module.exports = FlightService;

/**
 * {
 * flightNumber,
 * airplaneId,
 * departureAirportId,
 * arrivalAirportId,
 * arrivalTime,
 * departureTime,
 * price,
 * totalSeats -> airplane
 * 
 * }
 * 
 * 
 */