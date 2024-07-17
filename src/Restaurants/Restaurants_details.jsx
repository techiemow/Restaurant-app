import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { restaurant } from '../data/data';
import { AppContext } from '../data/Context';

const Restaurants_details = ({
    location = "",
    filteredTags = [],
    selectedSort = "",
}) => {
    const { searchedRestaurant } = useContext(AppContext);
    const [SelectedRestaurantID, setSearchedRestaurantID] = useState("");

    const urlLocation = location ? location.toLowerCase() : "delhi";

    let restaurantData = restaurant[urlLocation] || {};
    console.log(restaurantData, urlLocation);

    if (filteredTags?.length) {
        restaurantData = restaurantData.filter((eachHotel) => {
            let matchFound = true;
            eachHotel.tags.forEach((tag) => {
                if (filteredTags.includes(tag)) {
                    matchFound = false;
                    return;
                }
            });
            return !matchFound;
        });
    }

    const callback = (a, b, type) => {
        let reverse = true;
        if (type === "Price Low to High" || type === "Price High to Low") {
            if (type === "Price Low to High") reverse = false;
            type = "price";
        }
        const firstHotel = Number(a[type.toLowerCase()]);
        const secondHotel = Number(b[type.toLowerCase()]);

        if (firstHotel > secondHotel) {
            return reverse ? -1 : 1;
        }
        return reverse ? 1 : -1;
    };

    if (selectedSort?.length) {
        restaurantData.sort((a, b) => callback(a, b, selectedSort));
    }

    // filter searched hotel
    if (searchedRestaurant?.length) {
        restaurantData = restaurantData.filter((eachHotel) => {
            if (eachHotel.name.toLowerCase().includes(searchedRestaurant.toLowerCase())) {
                return true;
            }
            return false;
        });
    }

    const handleCardClick = (restaurantId) => {
        setSearchedRestaurantID(restaurantId);
    };

    return (
        <Grid item >
            <Grid container flexDirection={"row"} rowGap={1} columnGap={1}>
                {restaurantData.map((hotel, index) => {
                    const { image, ratings, location, priceDetail, name, tags, id } = hotel;
                    return (
                        <Grid xs={12} sm={6} md={3} key={index}
                            onClick={() => handleCardClick(id)}
                            style={{ cursor: "pointer" }}
                            rowGap={2}
                            columnGap={2}
                          
                        >
                            <Card sx={{ maxWidth: 345 }}>
                                <div style={{ position: "relative" }}>
                                    <CardMedia sx={{ height: 275 }} image={image} title={name} />
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            backgroundColor: "#b3ca42",
                                            width: 30,
                                            height: 30,
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography color={"white"}>{ratings}</Typography>
                                    </div>
                                </div>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {name}
                                    </Typography>
                                    <hr/>
                                    <Typography variant="body1" color="text.warning">
                                        {location}
                                    </Typography>
                                    <br/>
                                    <Typography variant="body2" color="green">
                                        {priceDetail}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body1' color="black" >
                                    {tags.map((e) => `${e},`)}
                                    </Typography>
                                    <hr/>
                                    <Typography variant="body2" color="green">
                                        Book Now
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
};

export default Restaurants_details;
