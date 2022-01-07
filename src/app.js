const path=require('path')
const express = require('express')
const hbs=require('hbs')
const getgeocode=require('./utils/geocode.js')
const gettemperature=require('./utils/forecast.js')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
const publicpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
const app = express()

app.use(express.static(publicpath))
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.get('',(req,res) => {
    res.render('index',{
        title: 'Main Page',
        name: 'Andrew'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Andrew'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'This is an help page',
        title: 'Help Page',
        name: 'Andrew'
        
    })
})


app.get('/weather',(req,res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'No address was provided'
        })
    }

    getgeocode(req.query.address,(error,{latitude, longitude,location}={}) => {
        if (error) {
            return res.send({
            error: error
        })
        } else {
            gettemperature(latitude,longitude,(error,{weather_descriptions,temperature,feelslike}) => {
                if (error) {
                    return res.send({
                        error:error
                    })
                } else {
                     res.send({
                        weather: weather_descriptions[0],
                        temperature:temperature,
                        feelslike:feelslike
                    })
                    // console.log(weather_descriptions[0] +' .It is currently ' + temperature + '.Feels like ' + feelslike)
                }
            })
            //console.log('Data',latitude,longitude,location)
        }

        
    })


   // res.send({
   //     forecast: 'Clear',
   //     location: 'Oak Creek',
   //     address : req.query.address
   // })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: '404',
        name:'Andrew',
        message:'Help article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        name: 'Andrew',
        message:'Page not found'
    })
})

app.listen(3000,() => {
    console.log('Server Started!')
})