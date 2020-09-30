
const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");


const app=express()

app.use(bodyparser.urlencoded({ extended: false }))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body.cityName);

     const appid="03df8793f4c5545a1ae3481d7162a6a6";

    const city=req.body.cityName;

    const url="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&id=524901&appid="+appid+"&units=metric";

    https.get(url,function(response){

     response.on("data",function(data){
         const wether=JSON.parse(data);
         const tem=wether.list[0].main.temp
         const wd=wether.list[0].weather[0].description
         const icn=wether.list[0].weather[0].icon

            const imgurl="http://openweathermap.org/img/wn/"+icn+"@2x.png";

           // res.write('<img src='+imgurl+'>');
            
            res.write("<h1>wheather in "+city+" is currently "+wd+" with temperature "+tem+" degree celcius.</h1>");
            res.write("<img src="+imgurl+">");
         res.send();
     });
    });

});
app.listen(3000,function(){
    console.log("3000 active");
});
/* key=03df8793f4c5545a1ae3481d7162a6a6*/