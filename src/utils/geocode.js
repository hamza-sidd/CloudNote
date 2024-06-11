const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2lkemVlIiwiYSI6ImNrcGEwOWtjYzBveGEybm5sZzRteXkxNmsifQ.O9DbDaJR1NCANSiAd0dZzg&limit=1'
    
    request({url,json:true},(error,{body}) =>{
        if (error){
            callback('couldnot connect to internet',undefined)
        }else if(body.features.length===0){
            callback('provide a valid location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name

            })
            }
        
        })
}

module.exports=geocode