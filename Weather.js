const inputValue =document.getElementById("inputValue");
const tempurature = document.getElementById("tempurature");
const cityname=document.getElementById("cityname");
const info = document.querySelectorAll(".info");
const weathertype=document.getElementById("weathertype");
const weathertext=document.getElementById("weathertext");
const feelslike=document.getElementById("feelslike");
const mintemp=document.getElementById("mintemp");
const maxtemp=document.getElementById("maxtemp");
const visblty=document.getElementById("visibility");
const clouds = document.getElementById("clouds");
const latitude =document.getElementById("latitude");
const longitude=document.getElementById("longitude");
const cor=document.getElementById("cor");
const humidity = document.getElementById('humidity');
const wind = document.getElementById("wind");
const pressure =document.getElementById("pressure");
const sunrise =document.getElementById("sunrise");
const sunset =document.getElementById("sunset");
const ui = document.getElementsByClassName("ui");
const initialContentinfo = document.getElementsByClassName("initialContentinfo");
const errorInfo = document.getElementsByClassName("errorInfo");
const searchButton = document.getElementById("searchButton");

let apiGeocode= "6773498ca5672067184209lxb52bcf7"; 

async function fetchapi(city,api) {
    try{
    if(!city){
        initialContentinfo[0].style.display="none";
        ui[0].style.display="none";
        errorInfo[0].style.display="flex";
        throw new Error("Please enter a valid city Name!");
    }
    const response = await fetch(`https://geocode.maps.co/search?q=${city}&api_key=${api}`);
    if(ERR_INTERNET_DISCONNECTED){

    }
    const data = await response.json();
    fetchapiW(data[0].lat,data[0].lon);
}
catch(error){
    initialContentinfo[0].style.display="none";
    ui[0].style.display="none";
    errorInfo[0].style.display="flex";
}
}
async function fetchapiW(lat,lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=73c92e8174d4185d23404dbaba8c2d66`);
    const data = await response.json();
    let temp=(data.main.temp-273).toFixed(2);
    tempurature.textContent=temp+"°";
    cityname.textContent=data.name;
    humidity.textContent="Humidity " +data.main.humidity+"%";
    wind.textContent="Wind " +data.wind.speed+" m/s";
    pressure.textContent="Pressure " +data.main.pressure+" hPa";
    feelslike.textContent="Feels like " +data.main.feels_like+"°";
    let min =(data.main.temp_min-273).toFixed(2);
    mintemp.textContent="Min Tempurature " +min+"°";
    const iconCode = data.weather[0].icon;
    weathertype.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weathertext.textContent=" " +data.weather[0].description;
    let max =(data.main.temp_max-273).toFixed(2);
    maxtemp.textContent="Max Tempurature " +max+"°";
    visblty.textContent="Visibility " +data.visibility;
    clouds.textContent="clouds " +data.clouds.all+"%";
    latitude.textContent="Latitude " +data.coord.lat;
    longitude.textContent="Longitude " +data.coord.lon;
    cor.textContent="Chance of rain " +data.clouds.all+"%";
    const sunriseData =data.sys.sunrise;
    const sunsetData = data.sys.sunset;
    const sunriseTime = convertToTime(sunriseData);
    const sunsetTime = convertToTime(sunsetData);
    sunrise.textContent="Sunrise " +sunriseTime;
    sunset.textContent="Sunset "+sunsetTime;
    initialContentinfo[0].style.display="none";
    errorInfo[0].style.display="none";
    ui[0].style.display="grid";
}

function searchCity(){
    fetchapi(inputValue.value,apiGeocode);
    inputValue.value="";
}

document.addEventListener("keydown",event=>{
    if(inputValue.value){
        if(event.key==="Enter"){
            fetchapi(inputValue.value,apiGeocode);
            inputValue.value="";
        }
    }
});
function convertToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}