import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useEffect } from 'react';
import api from '../../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomMarker = ({ text, onClick }) => (
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
  }} onClick={onClick}>
    {text}
  </div>
);


const EARTH_RADIUS_IN_METERS = 6371 * 1000;

function haversineDistance(lat1, lon1, lat2, lon2) {
  const deltaLat = (lat2 - lat1) * (Math.PI / 180);
  const deltaLon = (lon2 - lon1) * (Math.PI / 180);
  const lat1InRadians = lat1 * (Math.PI / 180);
  const lat2InRadians = lat2 * (Math.PI / 180);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1InRadians) * Math.cos(lat2InRadians) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_IN_METERS * c;
}


const Map = () => {
  const [parkings, setParkings] = useState(null);
  const [lati, setlati] = useState(0);
  const [longi, setlongi] = useState(0);
  const [helpOthers, setHelpOthers] = useState(0);

  const navigate = useNavigate();

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
    getPosition();
  }, [])

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const onChanged = ({ center }) => {
    console.log(center.lat) // prints the latitude of the current center of the map
    console.log(center.lng) // prints the longitude of the current center of the map
  }

  function onClickedMarker(location){
    setSelectedLocation(location);
    const distance = calculateDistance();
    if(distance < 500){
      setHelpOthers(1);
    }
    else{
      setHelpOthers(0);
    }
    openPopup();
  }

  function calculateDistance(){
    return haversineDistance(lati, longi, selectedLocation?.plat, selectedLocation?.plng);
  }

  const openPopup = () =>{
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setHelpOthers(0);
  };
  const onSelected = () => {
    closePopup()
    navigate("/parking", {state: { parkingId: selectedLocation._id}})
  }


  function getPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude)
          console.log(position.coords.longitude)
          setlati(position.coords.latitude)
          setlongi(position.coords.longitude)
          
          console.log(lati)
          console.log(longi)
        },
        (error) => {
          console.log(error)
        },
      );
    } 
    else
      alert("Not Supported");
  }
  



  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {(lati && longi)?
      <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDRA8KWu6hfAC7vyYG8h4FQ48UzNymOjUc' }}
        defaultCenter={{ lat: lati, lng:  longi }}
        defaultZoom={13}
        onChange={onChanged}
      >
        {/* {console.log(map.getCenter().lat())} */}
        {parkings?.map(location => (
          <CustomMarker lat={location.plat} lng={location.plng} text={location.pname} onClick={() => onClickedMarker(location)} />
        ))}
      </GoogleMapReact>
      {isPopupOpen && selectedLocation &&  (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white' }}>
          <p>Selected location: {selectedLocation.pname}</p>
          <p>{selectedLocation._id}</p>
          <p>{selectedLocation.plat}</p>
          <p>{selectedLocation.plng}</p>
          <p>{(helpOthers)?<>helpOthers</>:<>nohelp</>}</p>
          <button onClick={closePopup}>Close</button>
          <button onClick={onSelected}>Select</button>
        </div>
      )}
      </>:<>Loading</>}
    </div>
  );
};

export default Map;