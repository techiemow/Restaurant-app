import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { AppProvider } from './data/Context';
import { Grid } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookingPage from './Components/BookingPage';
import SignUp from './account/Signup';
import Login from './account/Login';

const App = () => {


   
  const Fullpage = () =>{
    const [searchedRestaurant ,setsearchedRestaurant] = useState("");
    return(
      <AppProvider value={{searchedRestaurant,setsearchedRestaurant}} >
        <Grid container>
          <Navbar />
          <BookingPage />
        </Grid>
      </AppProvider>
    )
  }



  return (
 <BrowserRouter>
 <Routes>
  <Route path='/:location' element={<Fullpage />}></Route>
  <Route path='/register' element={<SignUp />}></Route>
  <Route path='/login' element={<Login />}></Route>
  <Route path='*' element={<Fullpage />}></Route>
 </Routes>
 </BrowserRouter>
  )
}

export default App