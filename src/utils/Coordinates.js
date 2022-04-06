const request = require ('request');

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)









const getCoordinates = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1IjoiZmVubmVrMW4iLCJhIjoiY2wxMmczemsxMGFwMzNpbzJzcnVlcXdreSJ9.uAf_uIu1DEc2kJCadl0-Lw'
    let data = {}
    request( {url: geoUrl, json: true}, (error, {body}={}) =>{
        if (error){
            callback('listen retard your internet sucks', undefined)
        } else if(body.features.length === 0 ){
            callback('whatever the fuck you just typed doesnt exist', undefined)
        }else{
            
            callback(undefined,{
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                name: body.features[0].place_name
                
            })    
            data = {
                long: body.features[0].center[1],
                lat: body.features[0].center[0],
                name: body.features[0].place_name
            }       
        }

    }  )
    return data
}




module.exports = { 
    getCoordinates: getCoordinates

}
