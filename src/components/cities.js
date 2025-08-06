import { useEffect, useState } from "react";
import axios from "axios";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function Cities() {
  const [citiesData, setCitiesData] = useState([]);

  const apikey = "1eba570cbdfe6affe4d666c50e657b01";
  const cities = ["Cairo", "London", "Madrid", "Paris"];

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      try {
        const requests = cities.map((city) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
          )
        );

        const responses = await Promise.all(requests);
        const data = responses.map((res) => ({
          name: res.data.name,
          temp: Math.round(res.data.main.temp),
          icon: res.data.weather[0].icon,
          description: res.data.weather[0].description,
        }));

        setCitiesData(data);
      } catch (error) {
        console.error("Error fetching cities weather:", error);
      }
    };

    fetchWeatherForCities();
  }, [null]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "var(--body)",
    height: "100%",
    width: "100%",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "start",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <>
      {citiesData.map((city, index) => (
        <Grid container spacing={2} key={index} size={12}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Item sx={{ color: "white" }}>
              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent: "space-around",
                }}
              >
                <Grid size={{ md: 6 }}>
                  <Item sx={{ color: "white" }}>
                    <img
                      src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
                      alt={city.description}
                    />
                  </Item>
                </Grid>
                <Grid size={{ md: 6 }}>
                  <Item sx={{ color: "white" }}>
                    <h1>{city.name}</h1>
                    <h3>{city.description}</h3>
                  </Item>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Item
              sx={{
                color: "white",
                justifyContent: "center",
                padding: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h1>{city.temp}°C</h1>
            </Item>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
