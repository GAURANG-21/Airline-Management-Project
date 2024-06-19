const { CityRepository } = require('../repository/index.js')

class CityService{
    constructor(){
        this.CityRepository = new CityRepository();
    }

    async createMultipleCities(name){
        try {
            // console.log(name)
            const city = await this.CityRepository.createMultipleCities(name)
            return city
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw {error}
        }
    }

    async createCity(data){
        try {
            const city = await this.CityRepository.createCity(data);
            return city;
        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error}
        }
    }

    async deleteCity(cityId){
        try {
            const response = await this.CityRepository.deleteCity(cityId)
            return response
        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error}
        }
    }

    async updateCity(cityId, data){
        try {
            const city = await this.CityRepository.updateCity(cityId, data);
        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error}
        }
    }

    async getCity(cityId){
        try {
            const city = await this.CityRepository.getCity(cityId)
            return city;
        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error}
        }
    }

    async getAllCities(filter){
        try {
            const cities = await this.CityRepository.getAllCities({name: filter.name});
            return cities;
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw {error}
        }
    }

    async getAllAirports(cityId){
        try {
            const airports = await this.CityRepository.getAllAirports(cityId)
            return airports;
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw {error}
        }
    }
}

module.exports = CityService;