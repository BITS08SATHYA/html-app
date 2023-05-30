const APIKEY = 'dcbe0e6759f0f229aa7aae9a1336771a';

const weatherData = document.getElementById('weather-data');
const cityInputEl = document.getElementById('city-input')

const formEl = document.querySelector("form")

formEl.addEventListener("submit" , (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    // console.log(cityValue);
    getWeatherData(cityValue)
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${APIKEY}&units=metric`)
        
        if(!response.ok){
            throw new Error("Network response was nothing");
        }
        const data = await response.json();
        console.log(data)
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity : ${data.main.humidity}%`,
            `Wind Speed : ${data.wind.speed} m/s`, 
        ]

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        weatherData.querySelector(".temperature").textContent = `${temperature}°C`
        weatherData.querySelector(".description").textContent = description;
        
        weatherData.querySelector(".details").innerHTML = details
            .map((detail) => `<div>${detail}</div>`)
            .join("");
        

    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = ""
        weatherData.querySelector(".temperature").textContent = ""
        weatherData.querySelector(".description").textContent = "An Error Occurred, Please check with city name";
        
        weatherData.querySelector(".details").innerHTML = ""
    }
}
