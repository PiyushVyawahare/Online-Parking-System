import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '../menu';
import Navmenu from '../../utils/Navmenu';
import Container from '@mui/material/Container';
import Logo from '../../utils/logo';
import { useNavigate} from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const pages = ['Home', 'About', 'Contact'];

const ResponsiveAppBar = (props) => {
  const navigate = useNavigate()
  
  function onLogInClicked(){
    navigate('/login');
  }
  function onRegisterClicked(){
    navigate('/register');
  }



  const handleOpenNavMenu = (event) => {
  };

  const handleCloseNavMenu = () => {
  };

  return (
    <ThemeProvider theme={theme}>

    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height:"3rem", width:"3rem"  }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            >
            ONLINE PARKING SYSTEM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
              <Navmenu/>
            </IconButton> */}
            <Navmenu />
          </Box>
          <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, height:"2rem", width:"2rem" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            >
            OPS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          {
            (props.isLoggedIn)
            ?
            (<><Menu/></>)
            :
            (<><Button color="inherit" onClick={onLogInClicked}>Login</Button>
            <Button color="inherit" onClick={onRegisterClicked}>Register</Button></>)
          }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
            </ThemeProvider>
  );
};
export default ResponsiveAppBar;