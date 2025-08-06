import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Cities from "./cities";
import Context from "../contexts/first";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#202b3b",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "400",
  fontSize: "1rem",
}));

export default function Weather() {
  const [processedData, setProcessedData] = useState(
    JSON.parse(localStorage.getItem("processedData"))
  );

  const { settings, setSettings } = useContext(Context);

  console.log(settings);

  let precipitation, temp, wind, pressure, distance;
  if (processedData) {
    precipitation =
      settings.precipitation === "mm"
        ? processedData.chanceOfRain + "mm"
        : (processedData.chanceOfRain / 25.4).toFixed(2) + "in";

    temp =
      settings.temp === "celsius"
        ? processedData.currentTemp + "°C"
        : ((processedData.currentTemp * 9) / 5 + 32).toFixed(1) + "°F";

    wind =
      settings.wind === "m/s"
        ? processedData.windSpeed + "m/s"
        : settings.wind === "km/h"
        ? (processedData.windSpeed * 3.6).toFixed(1) + "km/h"
        : (processedData.windSpeed * 1.94384).toFixed(1) + "knots";

    pressure =
      settings.pressure === "hPa"
        ? processedData.pressure + "hPa"
        : settings.pressure === "inchHg"
        ? (processedData.pressure * 0.02953).toFixed(2) + "inchHg"
        : settings.pressure === "kPa"
        ? (processedData.pressure / 10).toFixed(2) + "kPa"
        : (processedData.pressure * 0.75006).toFixed(2) + "mmHg";

    distance =
      settings.distance === "km"
        ? (processedData.distance / 1000).toFixed(1) + "km"
        : ((processedData.distance / 1000) * 0.621371).toFixed(1) + "mi";
  }

  const [input, setInput] = useState(""); // For input field
  const [searchValue, setSearchValue] = useState(""); // For API search

  const apikey = "1eba570cbdfe6affe4d666c50e657b01";
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("processedData"));
    if (savedData && savedData.city) {
      setInput(savedData.city);
      setSearchValue(savedData.city);
    }
  }, []);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted
    console.log("hi");
    const fetchData = async () => {
      if (!searchValue || searchValue.length < 2) return;
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apikey}`
        );

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${apikey}`
        );

        // Process Today Forecast (Next 3 Time Slots)
        const today = new Date().getDate();
        const todayForecast = forecastResponse.data.list
          .filter((item) => new Date(item.dt * 1000).getDate() === today)
          .slice(0, 3)
          .map((item) => ({
            time: new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            temp: Math.round(item.main.temp),
          }));

        // Process 3-Day Forecast (Min/Max per Day)
        const days = {};
        forecastResponse.data.list.forEach((item) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

          if (!days[dayName]) {
            days[dayName] = {
              min: item.main.temp_min,
              max: item.main.temp_max,
            };
          } else {
            days[dayName].min = Math.min(days[dayName].min, item.main.temp_min);
            days[dayName].max = Math.max(days[dayName].max, item.main.temp_max);
          }
        });

        const threeDayForecast = Object.keys(days)
          .slice(0, 3)
          .map((day) => ({
            day,
            min: Math.round(days[day].min),
            max: Math.round(days[day].max),
          }));
        // Final Processed Data
        const processed = {
          city: weatherResponse.data.name,
          currentTemp: Math.round(weatherResponse.data.main.temp),
          // المطر بالـ mm زي ما جاي من الـ API
          chanceOfRain: weatherResponse.data.rain
            ? weatherResponse.data.rain["1h"] || 0
            : 0,

          // الضغط بالـ hPa زي ما هو
          pressure: weatherResponse.data.main.pressure,

          // سرعة الرياح بالمتر/ثانية زي ما هو
          windSpeed: weatherResponse.data.wind.speed,

          // المسافة/الرؤية الأفقية بالمتر زي ما هو
          distance: weatherResponse.data.visibility,
          todayForecast,
          threeDayForecast,
          icon: weatherResponse.data.weather[0].icon,
        };

        if (isMounted) {
          setProcessedData(processed);
          console.log("processed data set");
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    if (searchValue.length > 2) {
      fetchData();
    }
    return () => {
      isMounted = false; // Cleanup: prevent setting state after unmount
    };
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem("processedData", JSON.stringify(processedData));
    // const savedSettings = JSON.parse(localStorage.getItem("mySettings"));

    // console.log(processedData);
  }, [processedData]);

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "2rem" }}>
      <Grid container spacing={2} sx={{}}>
        <Grid item size={12}>
          <Item
            sx={{
              textAlign: "start",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              backgroundColor: "#2e3b4e",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#4fc3f7",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#29b6f6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4fc3f7")}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSearchValue(input);
              }}
            >
              Search
            </button>
            <input
              type="text"
              id="cityInput"
              placeholder="Search…"
              autoComplete="on"
              value={input}
              onChange={(e) => {
                console.log("Input:", e.target.value);
                setInput(e.target.value);
              }}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "var(--body)",
                color: "white",
                width: "100%",
                fontSize: "1rem",
              }}
            />
          </Item>
        </Grid>

        <Grid
          size={{ xs: 12, lg: 6 }}
          sx={{
            height: "100%",
          }}
        >
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Cities />
          </Item>
        </Grid>

        <Grid
          size={{ xs: 12, lg: 6 }}
          sx={{
            height: "100%",
          }}
        >
          {processedData ? (
            <>
              <Item>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid size={{ md: 6, lg: 8 }}>
                    <h1
                      style={{
                        color: "#4fc3f7",
                        fontSize: "2rem",
                        fontWeight: "600",
                      }}
                    >
                      {processedData.city}
                    </h1>
                    <p style={{ color: "#90caf9", fontSize: "1.1rem" }}>
                      Chance of Rain: {precipitation}
                    </p>
                    <p style={{ color: "#ffffff", fontSize: "1.1rem" }}>
                      {temp}
                    </p>
                  </Grid>
                  <Grid size={{ md: 6, lg: 4 }}>
                    <img
                      src={`http://openweathermap.org/img/wn/${processedData.icon}@2x.png`}
                      alt="weather icon"
                    />
                  </Grid>
                  <Grid
                    size={12}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <Item
                      sx={{
                        textAlign: "start",
                        backgroundColor: "var(--body)",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#4fc3f7",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        Pressure: {pressure}
                      </p>
                    </Item>

                    <Item
                      sx={{
                        textAlign: "start",
                        backgroundColor: "var(--body)",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#4fc3f7",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        Wind Speed: {wind}
                      </p>
                    </Item>

                    <Item
                      sx={{
                        textAlign: "start",
                        backgroundColor: "var(--body)",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#4fc3f7",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        Distance: {distance}
                      </p>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
              <hr />
              <Item>
                <Grid container spacing={2}>
                  <Grid item size={12}>
                    <Item>
                      <h3>Today Forecast:</h3>
                    </Item>
                  </Grid>

                  {processedData.todayForecast.length > 0 ? (
                    processedData.todayForecast.map((item, index) => (
                      <Grid
                        size={{
                          xs: 12,
                          md: 12 / processedData.todayForecast.length,
                        }}
                        key={index}
                      >
                        <Item>
                          <p>{item.time}</p>
                          <h4>{item.temp}°C</h4>
                        </Item>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <p>No Data for Today</p>
                    </Grid>
                  )}
                </Grid>
              </Item>
              <hr />
              <Item>
                <Grid container spacing={2}>
                  <Grid item size={12}>
                    <Item>
                      <h3>3-Day Forecast:</h3>
                    </Item>
                  </Grid>

                  {processedData.threeDayForecast.map((item, index) => (
                    <Grid item size={12} key={index}>
                      <Item>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <Item>
                              <p>{item.day}</p>
                            </Item>
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <Item>
                              <p>
                                {item.min}°C / {item.max}°C
                              </p>
                            </Item>
                          </Grid>
                        </Grid>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Item>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
