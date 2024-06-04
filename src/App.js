import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [searchCity, setSearchCity] = useState("Chennai");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherDescription, setWeatherDescription] = useState();
  const [temperature, setTemperature] = useState("");
  const [weatherIcon, setWeatherIcon] = useState();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [enterKeyPressed, setEnterKeyPressed] = useState(false);

  async function getApiDetails() {
    setLoading(true);
    setCityNotFound(false);
    let apiurl = `https:api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=72f1324d30a4ee953d5452eb5947071e&units=Metric`;
    try {
      const res = await axios.get(apiurl);
      const apiData = res.data;
      console.log(apiData);
      setWeatherIcon(
        `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`
      );
      setTemperature(Math.floor(apiData.main.temp));
      setWeatherDescription(apiData.weather[0].description);
      setCity(apiData.name);
      setCountry(apiData.sys.country);
      setLatitude(apiData.coord.lat);
      setLongitude(apiData.coord.lon);
      setHumidity(apiData.main.humidity);
      setWindSpeed(apiData.wind.speed);
      setCityNotFound(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      setCityNotFound(true);
      console.error("Error fetching API data:", error);
    }
  }

  useEffect(() => {
    getApiDetails();
  }, [enterKeyPressed]);

  function onSearchCityName(e) {
    if (e.key === "Enter") {
      setEnterKeyPressed(!enterKeyPressed);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center  mx-auto vh-100">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div style={{ minHeight: "560px" }} className="card glassmorphism">
            <div className="card-body text-center">
              <h2 className="card-title">Weather Search</h2>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={searchCity}
                  className="form-control"
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Enter city name"
                  onKeyDown={onSearchCityName}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => setEnterKeyPressed(!enterKeyPressed)}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>

              {cityNotFound !== true && loading !== true && (
                <div>
                  <img
                    src={weatherIcon}
                    className="weather-icon"
                    alt="weather icon"
                  ></img>

                  <h4 className="text-white">{temperature}&#176;C</h4>
                  <h4 className="text-white">{weatherDescription}</h4>
                  <h5>{city}</h5>
                  <h5>{country}</h5>

                  <div className="row mt-2">
                    <div className="col-sm-6 mt-3">
                      <h5>Humidity</h5>
                      <h5>
                        {humidity}
                        <i className="bi bi-water ms-2 "></i>
                      </h5>
                    </div>
                    <div className="col-sm-6 mt-3">
                      <h5>Wind Speed</h5>
                      <h5>
                        {windSpeed}
                        <i className="bi bi-wind ms-2"></i>
                      </h5>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-sm-6 mt-3">
                      <h5>Latitude</h5>
                      <h5>
                        {latitude}
                        <i className="bi bi-globe ms-2"></i>
                      </h5>
                    </div>
                    <div className="col-sm-6 mt-3">
                      <h5>Longitude</h5>
                      <h5>
                        {longitude}
                        <i className="bi bi-globe2 ms-2"></i>
                      </h5>
                    </div>
                  </div>
                </div>
              )}
              {loading && (
                <div>
                  <div className="spinner-border"></div>
                </div>
              )}
              {!loading && cityNotFound && (
                <div>
                  <h4 className="city-not-found">City Not Found</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
