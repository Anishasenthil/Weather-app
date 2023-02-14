const express = require("express");

const https = require("https");

const bodyParser =require("body-parser");

const app = express();
 app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const city=req.body.cityname;


  const query =city;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=9001aeffe501a8c6cb33e1c8ddb91b4e";

  https.get(url,function(response){

    response.on("data",function(data){

      const weatherdata=JSON.parse(data);//there are two methods JSON.parse or JSON.stringify.it will be parsed in json (javascript onject format easy to fetch the required data.)
      const temperature=weatherdata.main.temp;//from the huge data nly we specifically pic the temperature so nly weatherdata.[the specific thing]
      const description=weatherdata.weather[0].description;
      const icon=weatherdata.weather[0].icon;
      const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";//this is the url in openweather website itself to fetch the icons.
      //each place will have diff weather .so we fetch our place icon from the data in "const icon" and change a particula element in the link (imageurl)
      // so that the specified icon will be caught.


      res.write("<h1> the temperature in "+query+" is "+ temperature+" degree celsius.</h1>");
      res.write("<h2> it is "+ description+ " by the way.</h2>");
      res.write("<img src="+imageurl+">");//to display the image we give it in a html element.we paste the imgae link in the src.
      res.send();//only one res.send should be there.but it can have many res.write.BUT DEFINITELY IT SHOULD HAVE SEND METHOD TO INDICATE THTA THE DATA HAVE BEEN SENT

    })

  })
})


app.listen(8080,function(req,res){
console.log("port run");
})
