
const credentials = require('./credentials.js')
const request = require('request')

// errores offline, input equivocado y APIKEY incorrecta

const obtenerLatitud = function(ciudad, callback) {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?access_token=' + credentials.MAPBOX_TOKEN

  request({ url, json: true }, function(error, response) {

    if (response) {
    if (response.statusCode == 401) {
      // Si el apikey esta mal
      callback('APIKEY incorrecta', undefined)
    } else {
      if (response.body.features[0]) {
      // si todo esta bien
      callback(undefined, response.body)
    } else {
      // si no se encontró información sobre esa ciudad o lugar - input equivocado
      callback('Input equivocado', undefined)
    }
    }
  } else {
    // Si no se recibió una response
    callback('Offline', undefined)
  }


  })
}


const obtenerClima = function(latitud, longitud, callback) {
  const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitud + ',' + longitud + '?lang=es&units=si'
  request({ url, json: true }, function(error, response) {

      if (response) {
        // Cualquier otro tipo de error, incluyendo input incorrecto y apikey incorrecta
        if (response.body.error) {
          callback(response.body.error, undefined)

        } else {
          // si todo salió bien
          callback(undefined, response)
        }
    } else {
      // Si no se recibió una response
      callback('Offline', undefined)
    }

  })
}



module.exports = {
  obtenerLatitud : obtenerLatitud,
  obtenerClima : obtenerClima
}
