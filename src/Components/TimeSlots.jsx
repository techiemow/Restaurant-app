import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Chip, Grid } from "@mui/material";
import { chipdata } from '../data/data';

const TimeSlots = ({
    onTimeClick,
    selectedTime,
    selectedSlotsForDate,
  }) => {

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Morning" value="1" />
          <Tab label="After Noon" value="2" />
          <Tab label="Dinner" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <Grid
          container
          flexDirection={"row"}
          justifyContent={"center"}
          overflow={"auto"}
          spacing={3}
          maxWidth={300}
          minHeight={150}
        >
          {chipdata.morning.map((eachSlot) => {
            return (
              <Grid key={eachSlot.key} item>
                <Chip
                  color={
                    selectedTime === eachSlot.label ? "success" : "default"
                  }
                  disabled={selectedSlotsForDate?.includes(eachSlot.label)}
                  label={eachSlot.label}
                  onClick={() => {
                    onTimeClick(eachSlot.label);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>
      <TabPanel value="2">
        <Grid
          container
          spacing={3}
          flexDirection={"row"}
          justifyContent={"center"}
          overflow={"auto"}
          maxWidth={300}
          minHeight={150}
        >
          {chipdata.afternoon.map((eachSlot) => {
            return (
              <Grid key={eachSlot.key} item>
                <Chip
                  disabled={selectedSlotsForDate?.includes(eachSlot.label)}
                  color={
                    selectedTime === eachSlot.label ? "success" : "default"
                  }
                  label={eachSlot.label}
                  onClick={() => {
                    onTimeClick(eachSlot.label);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>
      <TabPanel value="3">
        <Grid
          container
          flexDirection={"row"}
          justifyContent={"center"}
          overflow={"auto"}
          spacing={3}
          maxWidth={300}
          minHeight={150}
        >
          {chipdata.dinner.map((eachSlot) => {
            return (
              <Grid key={eachSlot.key} item>
                <Chip
                  disabled={selectedSlotsForDate?.includes(eachSlot.label)}
                  color={
                    selectedTime === eachSlot.label ? "success" : "default"
                  }
                  label={eachSlot.label}
                  onClick={() => {
                    onTimeClick(eachSlot.label);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>
    </TabContext>
  </Box>
  )
}

export default TimeSlots