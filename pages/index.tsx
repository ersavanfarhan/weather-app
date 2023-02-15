import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [datas, setData] = useState<{
    name: string;
    coord: any;
    weather: any;
    main: any;
    wind: any;
    sys: any;
  }>({
    name: "",
    coord: {
      lon: "",
      lat: "",
    },
    weather: [
      {
        description: "",
      },
    ],
    main: {
      temp: "",
      temp_min: "",
      temp_max: "",
      humidity: "",
    },
    wind: {
      speed: "",
    },
    sys: {
      country: "",
    },
  });

  const checkWeather = () => {
    let inputCity = document.getElementById("inputCity") as HTMLInputElement;
    let result = document.getElementById("result");
    let errorHandling = document.getElementById("error");

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          inputCity.value +
          "&appid=4bf4f13cc5828e3f2f2332a0dce5a5b9&units=metric"
      )
      .then((response) => {
        setData(response.data);
        result!.style.display = "block";
        errorHandling!.style.display = "none";
      })
      .catch((err) => {
        console.log("Data tidak ditemukan", err);
        errorHandling!.style.display = "block";
        result!.style.display = "none";
      });

    inputCity.value = "";
  };

  return (
    <div id="container" className="w-full">

      <div id="background" className="w-full h-screen absolute -z-10">
        <img className="w-full h-screen xs:hidden sm:hidden" src="../background-weather.jpg" />
        <img className="w-full h-screen xs:block sm:block hidden" src="../background-weather - small.jpg" />
      </div>

      <div id="main" className="xs:p-5 sm:p-5 md:px-20 px-28 py-10 h-min-screen text-white z-0">
        <div id="header" className="grid">
          <label className="xs:text-3xl sm:text-3xl text-5xl font-black">OPEN WEATHER APP</label>
          <label className="xs:text-xs sm:text-xs text-md">
            Use this app to get an information of the actual weather condition
            in the city arround the world
          </label>
        </div>

        <div id="seacrh-menu" className="flex gap-1 mt-3 justify-center">
          <input
            id="inputCity"
            type="text"
            placeholder="Type location here"
            className="w-full p-3 border-2 border-green-700 rounded text-black"
          />
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-700 border-2 border-green-600 rounded text-xl font-black text-white"
            onClick={checkWeather}
          >
            GO
          </button>
        </div>

        <div id="result" className="grid mt-10 hidden">
          <div id="location" className="grid mb-3">
            <label className="text-3xl font-black">
              {datas.name}, {datas.sys.country}
            </label>
            <label>
              Latitute: {datas.coord.lat} - Longitude: {datas.coord.lon}
            </label>
          </div>

          <div id="temperature" className="grid mb-3">
            <label className="text-lg font-black">Temperature</label>
            <label className="text-2xl">{datas.main.temp}°C</label>
            <label>
              min : {datas.main.temp_min}°C - max : {datas.main.temp_max}°C
            </label>
          </div>

          <div id="humidity" className="grid mb-3">
            <label className="text-lg font-black">Humidity</label>
            <label className="text-2xl">{datas.main.humidity}%</label>
          </div>

          <div id="wind" className="grid mb-3">
            <label className="text-lg font-black">Wind Speed</label>
            <label className="text-2xl">{datas.wind.speed} m/s</label>
          </div>

          <div id="weather" className="grid mb-3">
            <label className="text-lg font-black">Weather</label>
            <label>{datas.weather[0].description}</label>
          </div>
        </div>

        <div id="error" className="mt-5 text-center xs:text-xl sm:text-xl text-3xl font-black hidden">
          <label>Sorry, data is not found</label>
        </div>
      </div>
    </div>
  );
}
