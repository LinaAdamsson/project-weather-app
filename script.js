const container = document.getElementById('weather-today');
const bodyContainer = document.querySelector(".body-container");
const message = document.getElementById("message")
const forecast = document.getElementById("forecast")




fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cc7a2bf72a818c2078266faf4fe15d7b")
 .then ((response) => {
    return response.json()
})
 .then((json) => {
   console.log(json); 

   const temperature = (json.main.temp.toFixed(0))

   container.innerHTML = `
   <p>Temp: ${temperature}°</p>
   <p>Sunrise: ${new Date(json.sys.sunrise * 1000)
    .toLocaleTimeString([], {timeStyle: 'short'})}</p>
   <p>Sunset: ${new Date(json.sys.sunset * 1000)
    .toLocaleTimeString([], {timeStyle: 'short'})}</p>
    `

const weather = (json.weather[0].main) //If we declare weather here we can
//use it under at the todaysWeather-function. 
console.log("weather", weather) //Just to see if it's works(it's not)


const todaysWeather = () => {
if (weather === 'Rain') {
    icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
    message.innerHTML = `<h1>Don't forget your umbrella! ${json.name} is rainy today! </h1>`
    bodyContainer.classList.add('rain');
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
todaysWeather()


// .catch((err) =>{ //ERROR function. We pass in a function as a parameter in the function, just like the then function.
//     console.log(err)
//   })






//5 dagars prognos som ändras
//After London in the link "&units=metric&" made it to celcius. 
fetch ("https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=cc7a2bf72a818c2078266faf4fe15d7b")
.then ((response) => {
  return response.json ()
})
.then ((json) => {
  console.log(json);

  const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00:00'));
  console.log(filteredForecast)

  filteredForecast.forEach (json => {
    const date = new Date (json.dt * 1000);
    let dayName = date.toLocaleDateString("en-US", {weekday:"short"});

  forecast.innerHTML += `
  <p>${dayName}</p>
  <p>${json.main.temp.toFixed(0)}°</p>
  </div>
  `;
  console.log("Date", filteredForecast[1])
  })

  
});
}); 