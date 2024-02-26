const path =require('path')
const express =require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast =require('./utils/forecast')
const app= express()
console.log(__dirname)
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/template/views')
const partialPath=path.join(__dirname,'../template/template/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectory))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:"Teerth"

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Teerth Mittal"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Teerth Mittal"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error }) // Fix: Use the 'error' variable here
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) // Fix: Use the 'error' variable here
            }

            res.send({
                forecast: forecastData,
                location: data.city,
                address: req.query.address
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:"Teerth Mittal",
    title:"Page not found"
    }
    )
})
app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})