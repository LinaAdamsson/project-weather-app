const container = document.getElementById('weather-today');
const bodyContainer = document.querySelector(".body-container");
const message = document.getElementById("message")
const forecast = document.getElementById("forecast")



//Here we fetch the API that's today's weather in London. 
fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cc7a2bf72a818c2078266faf4fe15d7b")
 .then ((response) => {
    return response.json()
})
 .then((json) => {
   console.log(json); 

   //Here we store the data/json about todays temperature and give it the name 
   //temperature so we can use it under in the innerHTML. 
   //json.main.temp is like different folders in the json (in the console) so to get 
   //temp we first have to declare json, then "go in to" main and then temp. 
   //toFixed[0] took away the decimals from the temp.
   const temperature = (json.main.temp.toFixed(0))

   //In HTML we have a section with id container. Above we declare it with getElementById so we can use it here. 
   container.innerHTML = `
   <p>Temp: ${temperature}°</p>
   <p>Sunrise: ${new Date(json.sys.sunrise * 1000) //Here we are "in the json" again. first json, then sys where you find sunrise if you look in the console.
   //With timestyle: 'short' we take away seconds. 
   //new Date = Today
    .toLocaleTimeString([], {timeStyle: 'short'})}</p> 
   <p>Sunset: ${new Date(json.sys.sunset * 1000)
    .toLocaleTimeString([], {timeStyle: 'short'})}</p>
    `

const weather = (json.weather[0].main) //If we declare weather here we can
//use it under at the todaysWeather-function. 
console.log("weather", weather) 

//A function with different styling and messages depending of the weather. 
const todaysWeather = () => {
if (weather === 'Rain') {
    icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
    message.innerHTML = `<h1>Don't forget your umbrella! ${json.name} is rainy today! </h1>`
    bodyContainer.classList.add('rain'); //The styling is in the CSS but we declare it
    //with a classList 
} 
else if (weather === "Clear") {
    icon.src = "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
    message.innerHTML = `<h1>Get your sunnies on, the sun is shining in ${json.name}! `
    bodyContainer.classList.add('clear');
}
else {
    icon.src = "./Designs/Design-2/icons/noun_Cloud_1188486.svg"
    message.innerHTML = `<h1>Something and something ${json.name} is grey today.</h1>`
    bodyContainer.classList.add('clouds')
}
}
todaysWeather() //Invoking the function


// .catch((err) =>{ //ERROR function. We pass in a function as a parameter in the function, just like the then function.
//     console.log(err)
//   })


//Here we fetch the API that tell us the forecast for 5 days
//After London in the link "&units=metric&" made it to celcius. 
fetch ("https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=cc7a2bf72a818c2078266faf4fe15d7b")
.then ((response) => {
  return response.json ()
})
.then ((json) => {
  console.log(json);

  //When we have the json in the console.log, we want to filter the list
  //so the forecast is for 5 days at 12.00. 
  //In the dt_txt we want the time that includes 12.00 (You can see this in console)
  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00:00'));
  console.log(filteredForecast)

  //Then we have to make a forEach loop of the filteredForecast.
  //
  filteredForecast.forEach (json => {
    const date = new Date (json.dt * 1000);
    let dayName = date.toLocaleDateString("en-US", {weekday:"short"});

  forecast.innerHTML += `
  <p>${dayName}</p>
  <p>${json.main.temp.toFixed(0)}°</p>
  </div>
  `;
  console.log("Date", filteredForecast[1]) //[1] make the loop start from the second day in the loop wich will "tomorrow", always.
  })
});
}); 