import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try{
    console.log({type});
    console.log({sw})
    // console.log(ne);

    const { data: { data } } = await axios.get('https://travel-advisor.p.rapidapi.com/' + type + '/list-in-boundary', {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
      }
    });

    return data;
  }
  catch (error){
    console.log(error)
  }
}

export const getWeatherData = async (lat, lng) => {
  console.log("getWeather in index.js");
  try{
    const { data } = await axios.get("https://community-open-weather-map.p.rapidapi.com/find", {
      params: {
      lon: lng,
      lat: lat,
    },
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
    }
  });

  console.log({data});

  return data;
  }catch (error){
    console.log(error);
  }
}
