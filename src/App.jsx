import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {

  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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
    console.log("use effect 1");
    // let isMounted = true;
    setIsLoading(true);
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      // if (isMounted) setPlaces(data);
      setPlaces(data);
      setIsLoading(false);
      // if(isMounted) setIsLoading(false);
    });
    // return () => { isMounted = false };
  }, [coordinates, bounds]);

  return (
  <div>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width: "100%"}} >
        <Grid item xs={12} md={4}>
          <List childClicked={childClicked}  places={places} isLoading={isLoading}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
  </div>)
}

export default App;
