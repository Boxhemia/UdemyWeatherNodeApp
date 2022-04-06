const request = require ('request')





const getForecast = (lat,long, callbackfn) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=24f62b23741f776e124d840f5c2b123c&query=' + encodeURIComponent(lat,long) 
    request( {url: weatherUrl, json: true}, (error, {body}) =>{
        if(error){
            callbackfn('welp, check your internet connection', undefined)
        }else if (body.error){
            callbackfn('something went wrong, figures',undefined)
        }else{
            callbackfn(undefined,' the weather is ' + body.current.temperature)
        }
    })
}

module.exports = {
    getForecast: getForecast
}