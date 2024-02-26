const request = require('postman-request');


const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=6bb2d81bef39f667917497cc507a01ec&query="+latitude+","+longitude 
    request({url:url,json:true},(error,response)=>{
       if(error){
        callback("Unable to connect to weather service",undefined)
       }else if(response.body.error){
        callback("Unable to find location",undefined)
       }
       else{
        callback(undefined, response.body.current.weather_descriptions[0]+" "+"It is currently "+response.body.current.temperature +" "+" C it feels like"+" "+ response.body.current.feelslike +"C")}
    })
    
}

















module.exports=forecast