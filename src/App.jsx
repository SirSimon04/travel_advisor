import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    console.log("getting pos");
    console.log("use effect 2");
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) => {
      console.log("got pos");
      console.log(latitude);
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if(bounds.sw && bounds.ne){
      console.log("use effect 1");
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setIsLoading(false);
        setFilteredPlaces([]);
      });
    }
  }, [bounds, type]);

  return (
  <div>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{width: "100%"}} >
        <Grid item xs={12} md={4}>
          <List
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
           />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
  </div>)
}

export default App;
