const request = require('request');

const geocode = function (address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFodWw4OTc4NTU1NiIsImEiOiJja2hnbDBiNG0wNG5uMnJwNjNvcXBwMXIyIn0.oBPWM7pADUtMiZfGuZ_F9w&limit=1';

    request({ url: url, json: true }, (error, response) => {

        if (error) { callback("internet problem", undefined, undefined); }
        else
            if (response.body.message=="Not Found" || response.body.features.length == 0) { callback("invalid address", undefined, undefined); }
            else {
                const new_url = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + response.body.features[0].center[1] + '&lon=' + response.body.features[0].center[0] + '&appid=1f0da385e576853cb2ea64344027f4fb&units=metric'
                request({ url: new_url, json: true }, (error, response) => {
                    callback(undefined,response.body.current.temp, response.body.current.weather[0].description)
                })
            }

    })
}
module.exports = geocode;