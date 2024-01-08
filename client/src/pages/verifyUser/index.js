import { React, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export default function VerifyUser() {

  const [alert, setAlert] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = createTheme();

  const messages = {
    400: ['error', "Required * fields can't be empty"],
    401: ['error', "OTP is invalid"],
    200: ['success', "Verification Successful!!, Please login..."],
    201: ['info', "OTP sent successfully!!"],
    404: ['error', "User doesn't exist!!"],
    500: ['error', "Internal Server error!"]
  }

  const closeAlert = () => {
    setAlert(0);
  }

  function handleSubmit(event){

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const otpData = data.get("otp");
    console.log(otpData);
    console.log(location.state.userId)
    
    api.post("/verifyUser", {
      userId: location.state.userId,
      otp: otpData,
    })
    .then(function(res){
      setAlert(res.status)
      setTimeout(function(){
        console.log(res);
        navigate("/login");
      }, 3000)
    })
    .catch(function(err){
      console.log(err);
      setAlert(err.response.status);
    })
  }


  function onResendOtp(){
    api.post("/resendOtp", {
      userId: location.state.userId,
    })
    .then(function(res){
        setAlert(res.status);
        setTimeout(()=>{
          closeAlert();
        }, 3000); 
    })
    .catch(function(err){
      setAlert(err.response.status);
      setTimeout(()=>{
        closeAlert();
      }, 3000);
    })
  }
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>
              {
              (alert)
              ? 
              <><Alert severity={messages[alert][0]} variant='filled' onClose={closeAlert}> {messages[alert][1]} </Alert>
                <br></br>
              </>
              :
              <></>}
            </Box>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <VerifiedUserOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Enter OTP
            </Typography>
            <Typography component="h6" >
              OTP for verification sent on email: {location.state.email}, please check!!
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="otp"
                label="One Time Password"
                type="password"
                id="otp"
                autoComplete="current-password"
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Submit
              </Button>
              <Grid container>
                <Grid item>
                  <p>Didn't received OTP?</p>
                  <Button variant='outlined' size='medium' onClick={onResendOtp}>Resend OTP</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
