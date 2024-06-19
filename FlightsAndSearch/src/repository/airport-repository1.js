const CrudRepository = require('./crud-repository')
const {Airport} = require('../models/index')
 
class AirportRepository1 extends CrudRepository{
    constructor(){
        super(Airport);
    }
}

module.exports = AirportRepository1