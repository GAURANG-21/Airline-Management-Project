const CrudService = require('./crud-service')
const {AirportRepository1} = require('../repository/index')

class AirportService1 extends CrudService{
    constructor(){
        const airportRepository1 = new AirportRepository1();
        super(airportRepository1)
    }
}

module.exports = AirportService1