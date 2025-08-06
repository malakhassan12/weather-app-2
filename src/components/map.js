import React, { useState, useRef, useEffect } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#202b3b",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  color: "white",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));
export default function MyMap() {
  const mapContainer = useRef(null);
  const [location, setLocation] = useState({ lng: 31.2357, lat: 30.0444 }); // Cairo Default

  const map = useRef(null);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "1eba570cbdfe6affe4d666c50e657b01"; // ضع API Key بتاعك هنا

  // Create Map once
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [location.lng, location.lat],
      zoom: 5,
    });

    map.current.on("click", (e) => {
      let { lng, lat } = e.lngLat;
      setLocation({ lng: lng.toFixed(4), lat: lat.toFixed(4) });
    });
  }, []);

  // Fetch Weather when location changes
  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&units=metric&appid=${apiKey}&lang=en`
        );
        setWeatherData({
          name: response.data.name || "Unknown",
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed,
        });
      } catch (err) {
        console.error("Error fetching weather:", err);
        setWeatherData(null);
      }
    }

    fetchWeather();
  }, [location]);
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "2rem" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Item>
            <div
              ref={mapContainer}
              style={{ width: "100%", height: "400px" }}
            />
          </Item>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Item>
            {weatherData ? (
              <>
                <h2
                  style={{
                    color: "#2E86C1",
                    fontSize: "28px",
                    fontWeight: "bold",
                  }}
                >
                  Weather in: {weatherData.name}
                </h2>
                <p style={{ color: "white", fontSize: "20px" }}>
                  Temperature:{" "}
                  <span style={{ color: "#E74C3C" }}>{weatherData.temp}°C</span>
                </p>
                <p
                  style={{
                    color: "#555",
                    fontSize: "18px",
                    fontStyle: "italic",
                  }}
                >
                  Description: {weatherData.description}
                </p>
                <p style={{ color: "#1F618D", fontSize: "18px" }}>
                  Humidity: {weatherData.humidity}%
                </p>
                <p style={{ color: "#117A65", fontSize: "18px" }}>
                  Wind: {weatherData.wind} m/s
                </p>
              </>
            ) : (
              <h2>Click anywhere on the map to view the weather</h2>
            )}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

/*


  return (
    <div style={{ display: "flex" }}>
      <div ref={mapContainer} style={{ width: "600px", height: "400px" }} />
      <div style={{ marginLeft: "20px" }}>
        {weatherData ? (
          <>
            <h2>Weather in: {weatherData.name}</h2>
            <p>Temperature: {weatherData.temp}°C</p>
            <p>Description: {weatherData.description}</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind: {weatherData.wind} m/s</p>
          </>
        ) : (
          <h2>Click anywhere on the map to view the weather</h2>
        )}
      </div>
    </div>
  );


*/
