import { useState, useEffect } from "react";
import { useHistory } from "./hooks/useHistory.js";
import { useTime } from "./hooks/useTime.js";
import WeatherForm from "./components/WeatherForm.jsx";
import WeatherDisplay from "./components/WeatherDisplay.jsx";
import History from "./components/History.jsx";
import Map from "./components/Map.jsx";
import Clock from "./components/Clock.jsx";
import Loading from "./components/LoadingScreen.jsx";
import Notification from "./components/Notification.jsx";
import SnowAnimation from "./components/animation/SnowAnimation.jsx";
import WindAnimation from "./components/animation/WindAnimation.jsx";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(16.455279);
  const [lon, setLon] = useState(107.546213);
  const [temp, setTemp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [animationType, setAnimationType] = useState(null);

  const { history, saveHistory, deleteHistory } = useHistory();
  const { localTime, updateTime } = useTime();

  // Simulate loading screen
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const getWeather = async (selectCity) => {
    const apiKey = "2e88e4d878504ff6fb17d0de34ec9a3c";
    if (!selectCity) return;

    setIsFetching(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectCity}&appid=${apiKey}&units=metric&lang=vi`
      );
      if (!response.ok) throw new Error("Không tìm thấy thành phố!");
      const data = await response.json();

      setWeatherData(data);
      setTemp(data.main.temp);
      setLat(data.coord.lat);
      setLon(data.coord.lon);

      // Update time
      const timezone = data.timezone;
      const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
      const newLocalTime = new Date(utc + timezone * 1000);
      updateTime(newLocalTime);

      // Save history
      saveHistory(selectCity);

      // Update animation based on temp
      if (data.main.temp > 30) {
        setAnimationType(null);
      } else if (data.main.temp > 0) {
        setAnimationType("wind");
      } else {
        setAnimationType("snow");
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setAnimationType(null);
    } finally {
      setIsFetching(false);
    }
  };

  const handleHistoryClick = (selectedCity) => {
    setCity(selectedCity);
    getWeather(selectedCity);
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div
          className="container"
          style={{
            background:
              temp > 30
                ? "linear-gradient(to bottom, #ff6b6b, #f0f8ff)"
                : temp > 0
                ? "linear-gradient(to bottom, #87ceeb, #f0f8ff)"
                : "linear-gradient(to bottom, #411fbd, #f0f8ff)",
          }}
        >
          <Notification />
          <div className="form-box">
            <h2>Tra cứu thời tiết</h2>
            <WeatherForm
              city={city}
              setCity={setCity}
              getWeather={getWeather}
              isFetching={isFetching}
            />
            <History
              history={history}
              onClick={handleHistoryClick}
              onDelete={deleteHistory}
            />
            <WeatherDisplay data={weatherData} error={error} />
          </div>
          <div className="map-container">
            <Clock localTime={localTime} />
            <Map lat={lat} lon={lon} />
          </div>
          <canvas id="snowCanvas" className="snow"></canvas>
          <canvas id="windCanvas"></canvas>
          {animationType === "snow" && <SnowAnimation />}
          {animationType === "wind" && <WindAnimation />}
        </div>
      )}
    </>
  );
}

export default App;
