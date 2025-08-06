import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
/*=============== Components ===================== */

import Main from "./components/main.js";
import Weather from "./components/weather.js";
import MyMap from "./components/map.js";
import Cities from "./components/cities.js";
import Settings from "./components/settings.js";
import Context from "./contexts/first.js";
/*============================== Materil-UI ====================================== */

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

const drawerWidth = 90;

function App(props) {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("mySettings");
    return saved
      ? JSON.parse(saved)
      : {
          temp: "celsius",
          wind: "km/h",
          pressure: "hPa",
          precipitation: "mm",
          distance: "km",
        };
  });

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem("mySettings", JSON.stringify(settings));
    // const newlySavedSettings = JSON.parse(localStorage.getItem("mySettings"));
    // console.log("Newly saved settings:", newlySavedSettings);
  }, [settings]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{}}>
      {/*
      الـ Toolbar ببساطة هو كونتينر (حاوية) بتحط جواه الحاجات اللي فوق في الـ Navbar زي:

          اللوجو (Logo)

          الزرائر (Buttons)

          الأيكونات (Icons)

          الـ Texts زي اسم الموقع أو الصفحة

          هو اللي بينظم المسافات (Spacing) وبيخلي العناصر جنب بعض بشكل مظبوط.
       */}
      <Toolbar>
        <BeachAccessIcon fontSize="large" color="primary" />
      </Toolbar>
      <Divider />
      {/* <ul>*/}
      <List>
        {["Main", "Weather", "Map", "Settings"].map((text, index) => (
          <Link
            to={`/${text[0].toLowerCase() + text.substring(1)}`}
            key={index}
          >
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {/* icon */}
                <ListItemIcon sx={{ minWidth: "0", color: "white" }}>
                  {index === 0 ? (
                    <ThunderstormOutlinedIcon />
                  ) : index == 1 ? (
                    <TocOutlinedIcon />
                  ) : index == 2 ? (
                    <MapOutlinedIcon />
                  ) : (
                    <TuneOutlinedIcon />
                  )}
                </ListItemIcon>
                {/* <a> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Context.Provider value={{ settings, setSettings }}>
      <div style={{ padding: "1rem" }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              backgroundColor: "#202b3b",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Breeze
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "#202b3b",
                },
              }}
              slotProps={{
                root: {
                  keepMounted: true, // Better open performance on mobile.
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "#202b3b",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Toolbar />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4 }}
                    >
                      <Main />
                    </motion.div>
                  }
                />
                <Route
                  path="/main"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4 }}
                    >
                      <Main />
                    </motion.div>
                  }
                />
                <Route
                  path="/weather"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4 }}
                    >
                      <Weather />
                    </motion.div>
                  }
                />
                <Route
                  path="/map"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4 }}
                    >
                      <MyMap />
                    </motion.div>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.4 }}
                    >
                      <Settings />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Box>
        </Box>
      </div>
    </Context.Provider>
  );
}

export default App;
