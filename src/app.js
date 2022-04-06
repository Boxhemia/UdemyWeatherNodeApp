const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const coordinateFuncs = require('./utils/Coordinates')
const weatherFuncs = require('./utils/weather')
const { info } = require('console')

const app = express()


const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join (__dirname, '../templates/partials')

app.set('views', viewsPath )
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'neko arc'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'this is literally me',
        name: 'neko arc'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'HELFEN SIE MIRRRRRRR UND GEBEN MICH BENZIIIIIN!!',
        info: 'i want to create lean',
        name: 'neko arc'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send('hey retard, what are you trying to do here with no address')
    }
    //let infoArray = []
    coordinateFuncs.getCoordinates(req.query.address, (error, {lat,long,name}={})=>{
        if (error){
            return res.send(error)
        }
        //infoArray = infoArray + name,lat,long
        weatherFuncs.getForecast(lat,long, (error2, data) => {
            if (error2){
                return res.send({
                   error: error2
                })
            }
            //infoArray = infoArray + data
            //res.send(infoArray)
            res.send({
                location: name,
                forecast: data,
                address: req.query.address
            })
            //this is interesting, study later in more detail
            })     
     })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{ 
        title: '404 article not found',
        name: 'NO ONE IS AROUND TO HELP'
    })
    
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send('hey dumbass, you need to search for something')
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 page not found',
        name: 'we currently have these routes: /help, /about, and the index'
    })
    
})

app.listen(3000,()=>{
    console.log('up and runnin baby')
})