
const path = require('path');
const express = require('express');
const app = express();
const port=process.env.PORT || 3000;
const request = require('request');
const geocode = require('./utils.js');
const static_dir = path.join(__dirname, '../public');
const view_path = path.join(__dirname, '../templates/views');
const hbs = require('hbs');
const { response } = require('express');
//use to set our application to render views directory
app.set('view engine', 'hbs');
app.set('views', view_path);
app.use(express.static(static_dir));
const partial_path = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partial_path);
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather', name: 'Rahul Pal'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Rahul Pal',
        title: 'help'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about', name: 'Rahul Pal'
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address)
    res.send('plz provide address');
    else
    geocode(req.query.address, (error,temperature, description) => {

        if(error)
        {res.send({status:0})}
        else
        res.send({
            status:1,
            temperature: temperature + ' degree celcius',
            address: req.query.address,
            description: description
        }
        );

    });

});
app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'help article not found',
        title: 'error'
    });
})
app.get('*', (req, res) => {
    res.render('error', {
        message: 'page 404 not found',
        title: 'error'
    });
})

app.listen(port, () => {
    console.log('server started');
});





