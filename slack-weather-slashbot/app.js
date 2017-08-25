var express         =       require('express'),
    request         =       require('request'),
    bodyParser      =       require('body-parser'),
    apiKey          =       process.env.apiKey,
    app             =       express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/weather', (req, res) => {
    var zip = req.body.text;
    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=" + apiKey;
    
    request(weatherAPI, (error, response, body) => {
        var bodyParsed = JSON.parse(body);
        var message = {};
        message.response_type = "in_channel";
        if(!error && bodyParsed.cod === 200){
            var location = bodyParsed.name;
            var weather = bodyParsed.weather[0].description;
            var temperature = bodyParsed.main.temp;
            message.text = "The weather in " + location + " is: " + weather + ". The current temperature is: " + temperature + ".";
        } else if(error) {
            message.text = error;
        } else if (bodyParsed.cod != 200){
            message.text = bodyParsed.message;
        }
        res.send(message);
    });
});
    
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("listening on " + process.env.PORT);
});