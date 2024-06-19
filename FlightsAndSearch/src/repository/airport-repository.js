const {Airport} = require('../models/index')
const {Op} = require('sequelize')

class AirportRepository {

    async createAirport(data){
        try {
            const airport = await Airport.create({
                "name": data.name,
                "address": data.address,
                "cityId": data.cityId
            })
            return airport;
        } catch (error) {
            console.log("Something went wrong in the repository layer.")
            throw {error}
        }
    }

    async deleteAirport(id){
        try {
            await Airport.destroy({
                where: {
                    id
                }
            })
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error}
        }
    }

    async updateAirport(id,data){
        try {
            const airport = await Airport.findByPk(id);
            if(data.name) airport.name = data.name
            if(data.address) airport.address = data.address
            await airport.save();
            return airport
        } catch (error) {
            console.log("Something went wrong in the repository layer")
            throw {error}
        }
    }

    async getAirport({id}){
        try {
            const airport = await Airport.findByPk(id)
            return airport
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error}
        }
    }

    async getAllAirports(filter){//filter can be empty
        try {
            if(filter.name){
                console.log(filter.name)
                const airport = await Airport.findAll({
                    where: {
                            name: {[Op.startsWith] : `${filter.name}`}
                    }
                })
                return airport
            }
            const airport = await Airport.findAll();
            return airport;
        } catch (error) {
            console.log("Something went wrong in the repository layer")
            throw {error}
        }
        
    } 
}


module.exports = AirportRepository