
import React, { useState } from 'react'
import { Grid, Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Slider from "@mui/material/Slider";
import axios from "axios";



const defaultState = {
    selectedTime: "",
    selectedSeats: 0,
    selectedDate: "",
  };

const Booking_Modal = ({SelectedRestaurantID , setSearchedRestaurantID }) => {


const [bookingDetails,setBookingDetails] = useState(defaultState);
const [selectedSlotsForDate,setSelectedSlotsForDate] = useState([]);


const username = localStorage.getItem("login") || "";


const handleSliderChange = (event) => {
    setBookingDetails({
      ...bookingDetails,
      selectedSeats: event.target.value,
    });
  };

  
  const handleDateChange = async (value) => {
    const day = new Date(value).getDate();
    const year = new Date(value).getFullYear();
    const month = new Date(value).getMonth() + 1;

    const bookingData = `${day}-${month}-${year}`;

    setBookingDetails({
      ...bookingDetails,
      selectedDate: bookingData,
    });

    if (bookingData) {
      const response = await axios.get(
        `${apiuri}/bookedSlots/${selectedRestaurentId}/${bookingData}`
      );
      setSelectedSlotsForDate(response.data);
    }
  };



  return (
    <div>
        <Modal open={SelectedRestaurantID} onclose={() => {
          setSearchedRestaurantID("");
          setBookingDetails(defaultState);
          setSelectedSlotsForDate([]);
        }}>
        <ModalDialog 
          style={{
            padding: 0,
          }}
          minWidth={600}
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              padding: 0,
            },
          })}
        >
            <Typography
            style={{
              background: `black`,
              color: `white`,
              fontSize: 16,
              fontFamily: `Metropolis Bold`,
              fontWeight: 300,
              height: 50,
            }}
            textAlign={"center"}
            id="nested-modal-title"
            level="h4"
          >
            Select an Offer or Deal
          </Typography>

          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            spacing={4}
            paddingBottom={8}
          >
            <Grid
              item
              style={{
                width: "70%",
              }}
            >
              <Typography
                textAlign={"center"}
                id="nested-modal-title"
                level="h5"
              >
                {bookingDetails.selectedSeats
                  ? `Selected Seats ${bookingDetails.selectedSeats}`
                  : `Select Seats`}
              </Typography>
              <Slider
                defaultValue={0}
                valueLabelDisplay="auto"
                // shiftStep={1}
                step={1}
                marks
                min={0}
                max={20}
                onChange={handleSliderChange}
              />
            </Grid>

            <Grid item>
              <Typography
                textAlign={"center"}
                id="nested-modal-title"
                level="h2"
              >
                Select Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    views={["year", "month", "day"]}
                    onChange={handleDateChange}
                    label="Select Date"
                    disablePast
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

         

            <Grid item>
              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row-reverse" },
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="solid"
                  color="primary"
               
                >
                  Make A Booking
                </Button>
                <Button
                  variant="outlined"
                  color="neutral"
              
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </ModalDialog>
      </Modal>






        

    </div>
  )
}

export default Booking_Modal