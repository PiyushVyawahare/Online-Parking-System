import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert'
// import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { ListItemIcon, ListItemText, MenuList, ListItemButton } from '@mui/material';
import api from '../../api'

const theme = createTheme();



export default function AddVehicle() {

  const [vtype, setVtype] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setVtype(event.target.value);
  };

  const messages = {
    400: ['error', "Required * fields can't be empty"],
    409: ['error', "Vehicle already registered"],
    200: ['success', "Registered Successfully, Verify email..."],
    404: ['info', "Email already registered with us, please login!!"],
    500: ['error', "Internal Server error!"],
    401: ['warning', "You are not authorized to access this page!!"],
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    border: '2px solid #ffffff',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };


  const [alert, setAlert] = useState(0);

  // let navigate = useNavigate();


  function closeAlert(){
    setAlert(0);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    

    if(!data.get('vname') || !vtype || !data.get('vnumber') ){
      setAlert(400);
      setTimeout(function(){
        closeAlert();
      }, 3000);
      return;
    }

    const vehicle_data = {
      vname: data.get('vname'),
      vtype: vtype,
      vnumber: data.get('vnumber'),
    }


    api.post('/addVehicle', vehicle_data, {withCredentials:true})
    .then(function(value){
      handleClose();
      setAlert(value.status)
    })
    .catch(function(err){
      setAlert(err.response.status);
      setTimeout(function(){
        closeAlert();
      }, 3000);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <ListItemButton 
          onClick={handleOpen}
        >
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Vehicle" />
        </ListItemButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <DirectionsCarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Vehicle
          </Typography>
          {(alert)? <><br></br><Alert severity={messages[alert][0]} variant='filled' onClose={closeAlert}> {messages[alert][1]} </Alert>
          <br></br></>:<></>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="vname"
                  required
                  fullWidth
                  id="vname"
                  label="Vehicle Name"
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={vtype}
                  label="Vehicle Type"
                  onChange={handleChange}
                  defaultValue="car"
                  >
                  <MenuItem value="mbike">Two Wheeler</MenuItem>
                  <MenuItem value="car">Car</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="vnumber"
                  label="Vehicle Number"
                  name="vnumber"
                  autoComplete="email"
                  />
                <FormHelperText>Format: XX YY XX YYYY</FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              ADD
            </Button>
          </Box>
        </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  )
}
