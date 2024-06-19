const {AirportRepository} = require('../repository/index')

class AirportService{
    constructor(){
        this.AirportRepository = new AirportRepository();
    }

    async createAirport(data){
        try {
            const airport = await this.AirportRepository.createAirport({
                "name" : data.name,
                "address": data.address,
                "cityId": data.cityId
            });
            return airport;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async deleteAirport(data){
        try {
            const airport = await this.AirportRepository.deleteAirport(data)
            return airport
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw {error}
        }
    }

    async updateAirport(airportId,data){
        try {
            const airport = await this.AirportRepository.updateAirport(airportId,data)
            return airport
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw {error}
        }
    }

    async getAirport(data){
        try {
            const airport = await this.AirportRepository.getAirport(data)
            return airport;
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw {error}
        }
    }

    async getAllAirport(data){
        try {
            const airport = await this.AirportRepository.getAllAirports({name: data.name});
            return airport
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }
}

module.exports = AirportService