const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=018f35b41392e9eea7c8b6ffc328f9eb&&query='+ latitude +','+ longitude + '&units=m'
    request({url,json:true},(error,{body}) =>{
        if(error){
            callback('could not connect to network',undefined)

        }else if(body.error){
            callback('unable to find location',undefined)

        }else {
            callback( body.current.weather_descriptions[0]+' ,temperature is: '+ body.current.temperature + ", but it feels like: "+ body.current.feelslike)

        }
    })
}
module.exports=forecast