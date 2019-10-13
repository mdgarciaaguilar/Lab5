const weather = require('./weather.js')

weather.obtenerLatitud('New York', function(error, data) {
  if (error) {
    console.log(error)
  } else {
    let longitud = data.features[0].center[0]
    let latitud = data.features[0].center[1]
    weather.obtenerClima(latitud, longitud, function(error, response) {
      if (error) {
        console.log(error)
      } else {
          const data = response.body
          const info = {
            summary: data.currently.summary,
            temperature: data.currently.temperature,
            precipProbability: data.currently.precipProbability,
            precipType: data.currently.precipType,
            humidity: data.currently.humidity,
            alerts: data.alerts
          }

          let resultado = info.summary + ' durante el dia. Actualmente esta a ' + info.temperature +
          ' C. Hay una ' + info.precipProbability + ' % de posibilidad de precipitacion de tipo ' + info.precipType +
          '\n Hay una humedad de ' + info.humidity
          console.log(resultado)



          if (info.alerts) {
            console.log('Alertas de clima en la zona')
          } else {
            console.log('No hay alertas de clima en esta zona')
          }
        }
    })

}
})
