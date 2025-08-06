import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/*
#6A0DAD
#7851A9
#9966CC
#E6E6FA
#C8A2C8
#DA70D6
#FFB6C1
#98FF98
#FFD700
#4B0082
#614051
#A9A9A9

*/

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--body)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",

  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Main() {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Item sx={{ backgroundColor: "#202b3b" }}>
            <div>
             <img src={`${process.env.PUBLIC_URL}/images/blue-umbrella.png`} style={{ width: "100%", height: "100%" }} />

            </div>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: "auto" }}>
          <Item>
            <div>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ color: "white", mb: 2, fontFamily: "Roboto" }}
              >
                Breeze
              </Typography>
            </div>
            <div>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "var(--dark-gray)", mb: 3, fontFamily: "Roboto" }}
              >
                Weather App
              </Typography>
            </div>
            <div>
              <BootstrapButton
                variant="contained"
                disableRipple
                sx={{
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                Get started
              </BootstrapButton>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
