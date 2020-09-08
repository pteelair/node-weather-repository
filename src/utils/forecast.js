const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    ////const url = 'http://api.weatherstack.com/current?access_key=cca6384442da26a5321bab8894e72734&query=Alpharetta&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=cca6384442da26a5321bab8894e72734&query='+latitude+','+longitude+'&units=f'
    //request({url:url, json: true}, (error, response) => {
    request({url, json: true}, (error, {body}) => {
    if(error){
        callback('Unable to connect to weather service!', undefined)
    } else if(body.error){
        callback('Unable to find location!', undefined)
    }
    else{
        callback(undefined, body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature+"F. It feels like "+ body.current.feelslike+"F." + "Current Wind speed - " + body.current.weather_descriptions[1])
    // callback(undefined, {
    //     temperature: response.body.current.temperature,
    //     feelslike: response.body.current.feelslike
    // })
    }
})
}

module.exports = forecast