import React, { useContext, useState } from "react";
import {
  AppBar,
  Autocomplete,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../data/Context";
import Booking_status from "../Restaurants/Booking_status";

const Navbar = () => {
  const [openType, setOpenType] = useState("");
  const [showMyBookingModal, setShowMyBookingModal] = useState(false);

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
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand mx-5" href="#">
            FootzAT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <span className="material-symbols-outlined">restaurant</span>

            <Autocomplete
              className="Item m-2 mx-5"
              disablePortal
              id="combo-box-demo"
              options={locations}
              sx={{ width: 200 }}
              onChange={(event, value) => {
                const searchedLocation = value?.label;
                searchedLocation && navigate("/" + searchedLocation);
              }}
              renderInput={(params) => <TextField {...params} label="Locations" />}
            />

            <TextField
              className="Item m-2 mx-5"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
              onChange={handleNameChange}
              label="Search"
              placeholder="Enter the name of Restaurant"
              fullWidth
            />

            {!username ? (
              <>
                <Button
                  className="Item m-2 mx-5"
                  variant="outlined"
                  size="medium"
                  onClick={() => {
                    setOpenType("Login");
                    navigate("/login");
                  }}
                >
                  Login
                </Button>

                <Button
                  className="Item m-2 mx-5"
                  variant="outlined"
                  size="medium"
                  onClick={() => {
                    setOpenType("Register");
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="Item m-2 mx-5"
                  variant="outlined"
                  size="medium"
                  onClick={handleMyBookings}
                >
                  My Booking
                </Button>

                <Button
                  className="Item m-2 mx-5"
                  variant="outlined"
                  size="medium"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>

       
      </nav>
    </AppBar>
  );
};

const locations = [
  { label: "Delhi", id: 54343 },
  { label: "Chennai", id: 8923 },
  { label: "Mumbai", id: 3456 },
];

export default Navbar;
