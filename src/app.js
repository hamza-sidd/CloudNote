const path=require('path')
const express= require('express')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.use(express.static(publicDir))
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) =>{
    res.render('index',{
        title:'WEB',
        name:'hamza'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        name:'hamza',
        intro:'i made this app'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help:'this is some helpful info',
        title:'web'
    })
})
// app.get('',(req,res)=>{
//     res.send('<h1>weather<h1>')

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'hamza',
//         age:19
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about<h1>')
// })

 app.get('/weather',(req,res)=>{
     if(!req.query.address){
         return res.send({
             error:'you must provide a search address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} ={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })


})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'page not found'

    })
   
})

app.listen(3000,()=>{
    console.log('server is up')
})