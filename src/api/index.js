import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";



export const getPlacesData = async (sw, ne) => {
  try{
    console.log(sw.lat);
    // console.log(ne);

    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'dd1ff48779mshea882839dd5fcabp115c3cjsn24e3ae899171'
      }
    });
    console.log("data")
    console.log(data);

    return data;
  }
  catch (error){
    console.log(error)
  }
}
