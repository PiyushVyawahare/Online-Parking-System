import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { ListItemIcon, ListItemText, MenuList, ListItemButton } from '@mui/material';
import api from '../../api'

const theme = createTheme();



export default function AddParking() {

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // }
  // const handleClose = () => setOpen(false);

  const messages = {
    400: ['error', "Required * fields can't be empty"],
    409: ['error', "Vehicle already registered"],
    200: ['success', "Parking Added Successfully!!"],
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
  const [lati, setlati] = useState(0);
  const [longi, setlongi] = useState(0);
  const [getCurrent, setGetCurrent] = useState(0);
  // let navigate = useNavigate();


  function closeAlert(){
    setAlert(0);
  }

  var latit;

  function getPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude)
          console.log(position.coords.longitude)
          setlati(position.coords.latitude)
          setlongi(position.coords.longitude)
          setGetCurrent(1)
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

  function onLocationClicked(){
    getPosition();
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    

    if(!data.get('plat') || !data.get('plng') || !data.get('pname') ){
      setAlert(400);
      setTimeout(function(){
        closeAlert();
      }, 3000);
      return;
    }

    const parking_data = {
      plat: data.get('plat'),
      plng: data.get('plng'),
      pname: data.get('pname'),
    }


    api.post('/addParking', parking_data, {withCredentials:true})
    .then(function(res){
      setAlert(res.status)
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
        <ListItemButton>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Vehicle" />
        </ListItemButton>
        <Box sx={style}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <DirectionsCarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Parking
          </Typography>
          {(alert)? <><br></br><Alert severity={messages[alert][0]} variant='filled' onClose={closeAlert}> {messages[alert][1]} </Alert>
          <br></br></>:<></>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Button
              type='button'
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onLocationClicked}
              >
              Get Current Location
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  name="plat"
                  required
                  fullWidth
                  id="plat"
                  label="Parking Latitude"
                  value={lati || ""}
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="plng"
                  label="Parking Longitude"
                  name="plng"
                  value={longi||""}
                  />
                {/* <FormHelperText>Format: XX YY XX YYYY</FormHelperText> */}
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="pname"
                  required
                  fullWidth
                  id="pname"
                  label="Parking Name"
                  />
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
      </Container>
    </ThemeProvider>
  )
}
