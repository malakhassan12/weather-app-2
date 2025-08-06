import { useEffect, useState, useMemo, useContext } from "react";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Context from "../contexts/first";

const Item = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  borderRadius: "12px",
  backgroundColor: "#202b3b",
  ...theme.typography.body2,
  padding: "1rem",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const label = { inputProps: { "aria-label": "Switch demo" } };
const StyledButton = styled(Button)({
  backgroundColor: "#35455e",
  color: "white",
  borderRadius: "8px",
  padding: "10px 16px",
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "0.9rem",

  borderRadius: "50px",
});
const toggleStyle = {
  backgroundColor: "var(--body)",
  borderRadius: "20px",
  padding: "3px",
  "& .MuiToggleButton-root": {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    border: "none",
    borderRadius: "15px !important",
  },
  "& .Mui-selected": {
    backgroundColor: "#35455e !important",
    color: "white",
  },
  display: "flex",
  flexWrap: "wrap",
};

export default function Settings() {
  const { settings, setSettings } = useContext(Context);
  //   const [settings, setSettings] = useState(() => {
  //     const saved = localStorage.getItem("mySettings");
  //     return saved
  //       ? JSON.parse(saved)
  //       : {
  //           temp: "celsius",
  //           wind: "km/h",
  //           pressure: "hPa",
  //           precipitation: "mm",
  //           distance: "km",
  //         };
  //   });

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem("mySettings", JSON.stringify(settings));
    // const newlySavedSettings = JSON.parse(localStorage.getItem("mySettings"));
    // console.log("Newly saved settings:", newlySavedSettings);
  }, [settings]);
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "2rem" }}>
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 12, md: 6, lg: 8 }}
          sx={{
            display: "flex",
            padding: "1rem",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: "1rem",
          }}
        >
          <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "600" }}>
            Units
          </h1>
          <Item sx={{ p: 2, justifyContent: "normal" }}>
            <Box sx={{ width: "100%" }}>
              {/* Temperature */}
              <div>
                <h3>Temperature</h3>
                <ToggleButtonGroup
                  value={settings.temp}
                  exclusive
                  onChange={(e, newValue) => {
                    newValue &&
                      setSettings((prev) => ({ ...prev, temp: newValue }));

                    console.log("hiii");
                  }}
                  fullWidth
                  sx={toggleStyle}
                >
                  <ToggleButton value="celsius">Celsius (°C)</ToggleButton>
                  <ToggleButton value="fahrenheit">
                    Fahrenheit (°F)
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              {/* Wind */}
              <div>
                <h3>Wind Speed</h3>
                <ToggleButtonGroup
                  value={settings.wind}
                  exclusive
                  onChange={(e, newValue) =>
                    newValue &&
                    setSettings((prev) => ({ ...prev, wind: newValue }))
                  }
                  fullWidth
                  sx={toggleStyle}
                >
                  <ToggleButton value="km/h">km/h</ToggleButton>
                  <ToggleButton value="m/s">m/s</ToggleButton>
                  <ToggleButton value="knots">Knots</ToggleButton>
                </ToggleButtonGroup>
              </div>

              {/* Pressure */}
              <div>
                <h3>Pressure</h3>
                <ToggleButtonGroup
                  value={settings.pressure}
                  exclusive
                  onChange={(e, newValue) =>
                    newValue &&
                    setSettings((prev) => ({ ...prev, pressure: newValue }))
                  }
                  fullWidth
                  sx={toggleStyle}
                >
                  <ToggleButton value="hPa">hPa</ToggleButton>
                  <ToggleButton value="inchHg">inHg</ToggleButton>
                  <ToggleButton value="kPa">kPa</ToggleButton>
                  <ToggleButton value="mmHg">mmHg</ToggleButton>
                </ToggleButtonGroup>
              </div>

              {/* Precipitation */}
              <div>
                <h3>Precipitation</h3>
                <ToggleButtonGroup
                  value={settings.precipitation}
                  exclusive
                  onChange={(e, newValue) =>
                    newValue &&
                    setSettings((prev) => ({
                      ...prev,
                      precipitation: newValue,
                    }))
                  }
                  fullWidth
                  sx={toggleStyle}
                >
                  <ToggleButton value="mm">Millimeters</ToggleButton>
                  <ToggleButton value="in">Inches</ToggleButton>
                </ToggleButtonGroup>
              </div>

              {/* Distance */}
              <div>
                <h3>Distance</h3>
                <ToggleButtonGroup
                  value={settings.distance}
                  exclusive
                  onChange={(e, newValue) =>
                    newValue &&
                    setSettings((prev) => ({ ...prev, distance: newValue }))
                  }
                  fullWidth
                  sx={toggleStyle}
                >
                  <ToggleButton value="km">Kilometers</ToggleButton>
                  <ToggleButton value="mi">Miles</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Box>
          </Item>

          {/* Notifications */}
          <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "600" }}>
            Notifications
          </h1>
          <Item sx={{ p: 2, justifyContent: "space-between" }}>
            <div>
              <h3>Notifications</h3>
              <p>Be aware of the weather</p>
            </div>
            <Switch defaultChecked />
          </Item>
        </Grid>

        {/* Advanced Section */}
        <Grid
          size={{ xs: 12, md: 6, lg: 4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: "2rem",
          }}
        >
          <Item>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "2.2rem",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                Advanced
              </h1>
              <h3
                style={{
                  color: "#e6e6e6",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                Get new experience
              </h3>
              <ul
                style={{
                  color: "#94a3b8",
                  fontSize: "0.9rem",
                  paddingLeft: "1.2rem",
                  margin: "0.5rem 0",
                }}
              >
                <li style={{ marginBottom: "0.5rem" }}>Ad free</li>
                <li style={{ marginBottom: "0.5rem" }}>
                  Health activities overview
                </li>
                <li>Severe weather notifications</li>
              </ul>
              <StyledButton variant="contained" disableElevation>
                <span style={{ color: "#e8e5df", fontSize: "2rem" }}>
                  $5.99
                </span>{" "}
                /month
              </StyledButton>
            </Box>
          </Item>
          <Item>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "1rem",
                gap: "1rem",
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                Never forget your umbrella!
              </h1>
              <hr style={{ width: "100%", margin: "0.5rem 0" }} />
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
                Sign up for our daily weather newsletter personalized just for
                you.
              </p>
              <StyledButton variant="contained" disableElevation>
                Sign up
              </StyledButton>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
