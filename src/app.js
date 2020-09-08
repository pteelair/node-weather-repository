const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars and views engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Praveen Teelair'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Praveen Teelair'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Praveen Teelair'
    })
})

app.get('/weather', (req, res) =>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    var location = req.query.address;
    geocode(location, (error, {latitude, longitude, location}={})=>{
        if(error)
            return res.send({
                error: error
            })
    
        forecast(latitude,longitude, (forecastError, forecastData) => {
            if(error)
            return res.send({
                error: forecastError
            })

            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
            
          })
    })

    // res.send({
    //     forecast: 'forecast for today',
    //     location: 'Alpharetta',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) =>{
    res.render('404Generic',{
        title: '404 Page',
        name: 'Praveen Teelair',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req, res) =>{
    res.render('404Generic', {
        title: '404 Page',
        name: 'Praveen Teelair',
        errorMessage: 'Page not found',
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+port)
})
