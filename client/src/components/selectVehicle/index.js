import { React, useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListItem } from '@mui/material';
import api from "../../api";

export default function SelectVehicle() {
  const [vehicleId, setVehicleId] = useState('');

  const handleChange = (event) => {
    setVehicleId(event.target.value);
  };

  // const [alert, setAlert] = useState(0);
  const [vehicleData, setVehicleData] = useState(null);

  // const messages = {
  //   403: ['error', 'You are not allowed to access this page'],
  // }

  function onLoad(){
    api.get("/getVehicles", {withCredentials: true})
    .then(res=>{
      setVehicleData(res.data);
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
      <ListItem>
        <FormControl sx={{ m: 1 }} fullWidth size='small' variant='outlined'>
          <InputLabel id="demo-simple-select-label">Select Vehicle</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={vehicleId}
            label="Select Vehicle"
            onChange={handleChange}
            >
            {/* <MenuItem value={1}>Car</MenuItem>
            <MenuItem value={2}>Bike</MenuItem>
            <MenuItem value={3}>Scooter</MenuItem>
             */}
            
            {vehicleData?.map((vehicle)=>{
              return (<MenuItem value={vehicle.vname}>{vehicle.vname}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </ListItem>
  );
}