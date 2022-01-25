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
