import {
    Grid,
    AppBar,
    Autocomplete,
    TextField,
    InputAdornment,
    Button,
    Typography,
  } from "@mui/material";
  
   import React, { useContext, useState } from "react";
  import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../data/Context";


  
const Navbar = () => {
  const [openType, setOpenType] = useState("");


  const username = localStorage.getItem("login") || "";
  const { setSearchedHotel } = useContext(AppContext);


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("login", "");
    window.location.reload();
  };

  const handleMyBookings = () => {
    setShowMyBookingModal(true);
  };

  const handleNameChange = (event) => {
    setSearchedHotel(event.target.value);
  };

  return (
    <AppBar color="transparent" position="static">
    <Grid
      container
      style={{
        width: 1480,
        margin: "auto",
        paddingBottom: 10,
      }}
      spacing={2}
      columnSpacing={16}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item width={"auto"} height={50}  >
      <span class="material-symbols-outlined">
restaurant
</span>
      </Grid>
      <Grid item>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={locations}
          sx={{ width: 200 }}
          onChange={(event) => {
            const searchedLocation = event.target.innerText;
            searchedLocation?.length && navigate("/" + searchedLocation);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Locations" />
          )}
        />
      </Grid>
      <Grid item>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleNameChange}
          id="demo-helper-text-misaligned-no-helper"
          label="Search"
          placeholder="Enter the name of restaurent"
        />
      </Grid>

      {!username ? (
        <>
          <Grid item>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                setOpenType("login");
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                setOpenType("register");
                navigate("/register");
              }}
            >
              Register
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            <Button
              variant="outlined"
              size="medium"
              onClick={handleMyBookings}
            >
              My Booking
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
          </Grid>
        </>
      )}

    
    </Grid>

    <div style={{ border: "1px solid rgb(199 199 199 / 40%)" }}></div>

    <Grid container justifyContent={"center"} columnSpacing={2}>
      <Grid item>
        <Button variant="text">Home</Button>
      </Grid>
      <Grid item>
        <Button variant="text">Book a table</Button>
      </Grid>
      <Grid item>
        <Button variant="text">Blog</Button>
      </Grid>
    </Grid>

   

  </AppBar>
);
}

const locations = [
{ label: "Delhi", id: 54343 },
{ label: "Chennai", id: 8923 },
{ label: "Mumbai", id: 3456 },
];

export default Navbar