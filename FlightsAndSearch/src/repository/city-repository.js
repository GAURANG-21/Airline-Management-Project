const {Op} = require('sequelize')
const {City, Airport} = require('../models/index.js')

class CityRepository{
    
    async createMultipleCities(data){
        try{
          
            const listOfObjects = data.name.map((name) => ({
                "name": name
              }));
              console.log(listOfObjects);
            const city = City.bulkCreate(listOfObjects,{ignoreDuplicates: true})
            return city;
        }
        catch(error){
            console.log("Something went wront in the repository layer",error);
            throw {error}
        }
    }

    async createCity({name})  {
        try {
            const city = await City.create({name});
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async deleteCity(cityId) {
        try {
            await City.destroy({
                where: {
                    id: cityId
                }
            });
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async updateCity(cityId, data) {
        try {
            //The below works but will not return the updated object
            // If we are using Pd then return: true can be used, else not
            // await City.update(data, {
            //     where: {
            //         id: cityId
            //     }
            // })
            // For getting updated data in mysql, we use the below approach
            const city = await City.findByPk(cityId);
            city.name = data.name
            await city.save()
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
    
    async getCity(cityId) {
        try {
            const city = await City.findByPk(cityId);
            // console.log(city);
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer", error);
            throw { error };
        }
    }    

    async getAllCities(filter){ //filter can be empty also
        try {
            if(filter.name){
                const cities = await City.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                });
                return cities;
            }
            const cities = await City.findAll();
            return cities;
        } catch (error) {
         console.log("Something went wrong in the repository layer")
         throw {error}   
        }
    }

    async getAllAirports(cityId){
        try {
            const city = await City.findOne({
                where: {
                    id: cityId
                    },
                    include: Airport
            });
            const airports = await city.Airports
            // console.log(airports)
            const result = airports.map((airport) => ({
                "name":airport.dataValues
              }));
            // console.log(result)
            return result;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error}
        }
    }
}

module.exports = CityRepository