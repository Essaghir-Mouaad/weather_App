const express = require('express');
const https = require('https'); 

const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
});



app.post("/", (req, res)=>{
    // console.log("waiting....");
    var city = req.body.city;
    var unite = req.body.unit;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=2b8b1f3aea81bb998770d6ab29bf563a&units="+ unite +"&q=" + city;

    https.get(url, (response)=>{
        response.on('data', (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
            res.write(`<h1>The temperature in ${city} is ${temp} degrees with ${weatherDescription}</h1>`);
            res.write(`<img src=${iconUrl}>`);
            res.send();
        });
    });
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});