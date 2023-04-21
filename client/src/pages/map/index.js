import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../api';

const CustomMarker = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);



const Map = () => {
  const [parkings, setParkings] = useState(null)

  function onLoad(){
    api.get("/getParkings", {withCredentials: true})
    .then(res=>{
      setParkings(res.data);
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  
  useEffect(() => {
    onLoad();
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDRA8KWu6hfAC7vyYG8h4FQ48UzNymOjUc' }}
        defaultCenter={{ lat: 18.622761, lng:  73.741953 }}
        defaultZoom={13}
      >
        {parkings?.map((parking)=>{
          return (<CustomMarker lat={parking.plat} lng={parking.plng} text={parking.pname} />);
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;