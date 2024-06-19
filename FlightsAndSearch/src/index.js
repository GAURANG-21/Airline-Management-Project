const express =  require("express")
const {PORT} = require('./config/serverConfig.js')
const bodyParser = require('body-parser')
// const db = require('./models/index.js')
// const {Airport,City} = require('./models/index.js')
// const {Op} = require('sequelize')
// const CityRepository = require('./repository/city-repository.js')
// const {Airplane} = require('./models/index')

const ApiRoutes = require('./routes/index')

const setupAndStartServer = async() =>{
    const app = express();

    
     
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', ApiRoutes);
    
    app.listen(PORT,async ()=>{
        console.log(`Server started at ${PORT}`);
        // console.log(process.env)
        // const repo = new CityRepository();
        
        // repo.createCity({name: "chennai"});
        // repo.deleteCity(20);
        // repo.updateCity(3, {
        //     name : "Chennai"
        // });

        // awaitconsole.log(repo.getCity(1));
        // const findCity = await repo.getCity(2);
        // console.log(findCity.dataValues.name)

        // const airports = await Airport.findAll({include:City,
        //     where:{
        //        cityId:2
        //     }
        // });
        // console.log(airports)
        // if(process.env.SYNC_DB) db.sequelize.sync({alter:true})
        // const city = await City.findOne({
        //     where:{
        //         id:8
        //     }
        // })
        // const airports = await city.getAirports()
        // console.log(city,"\n\n\n",airports)

        // await Airplane.create({
        //     modelNumber: "Bombardier CRJ"
        // })

        // const repo = new CityRepository();
        // await repo.getAllAirports(8);
        
    });}

setupAndStartServer();