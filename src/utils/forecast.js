const request=require('request')

const gettemperature = (latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=ab83ce8950731cc01987c1f1e2e0bee4&query=' + latitude + ',' + longitude + '&units=f'
    request({url,json:true},(error,{body}) => {
        if (error) {
            callback('Service unavailable!',undefined)
        } else if (body.error){
            callback(body.error.info,undefined)
        } else {
            callback(undefined,body.current)
        }
    })
}

module.exports = gettemperature