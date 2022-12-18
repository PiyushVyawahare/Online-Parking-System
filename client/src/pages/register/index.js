import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Radio, RadioGroup } from '@mui/material';
import api from '../../api'


const theme = createTheme();

export default function Register() {

  const [alert, setAlert] = useState(0);

  const navigate = useNavigate();

  const messages = {
    400: ['error', "Required * fields can't be empty"],
    409: ['error', "Passwords are not matching"],
    200: ['success', "Registered Successfully, Verify email..."],
    404: ['info', "Email already registered with us, please login!!"],
    500: ['error', "Internal Server error!"]
  }

  const onAlertClosed = () => {
    setAlert(0);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!data.get('fname') || !data.get('lname') || !data.get('email')
    || !data.get('userType') || !data.get('password') || !data.get('cpassword')){
      setAlert(400);
      setTimeout(function(){
        onAlertClosed();
      }, 3000);
      return;
    }

    if(data.get('password') !== data.get('cpassword')){
      setAlert(409);
      setTimeout(function(){
        onAlertClosed();
      }, 3000);
      return;
    }

    const registerDataObj = {
      fname: data.get('fname'),
      lname: data.get('lname'),
      email: data.get('email'),
      userType: data.get('userType'),
      password: data.get('password'),
    }

    console.log(registerDataObj);

    api.post('/register', registerDataObj, {withCredentials: true})
    .then(function(res){
      setAlert(res.status);
      setTimeout(function(){
        navigate("/verifyUser", {state: { userId: res.data.userId, email: res.data.email}})
      }, 3000);
    })
    .catch(function(err){
      setAlert(err.response.status);
    });
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <br></br>
          <Box>
            {(alert)? <><Alert severity={messages[alert][0]} variant='filled' onClose={onAlertClosed}> {messages[alert][1]} </Alert>
          <br></br></>:<></>}
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  />
              </Grid>
              <Grid item xs={12}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="userType"
                >
                <FormControlLabel value="owner" control={<Radio />} label="Parking Owner" />
                <FormControlLabel value="driver" control={<Radio />} label="Driver" />
              </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}
