import {Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import VerifyUser from './pages/verifyUser';
import Map from './pages/map';
import Map1 from './pages/map/map';
import Parking from './pages/parking';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';

const dark = createTheme({
  palette: {
    mode: 'dark',
  },
});
const light = createTheme({
  palette: {
    mode: 'light',
  },
});
function App() {
  const [darkMode, setDarkMode] = useState(0);
  const toggleColorMode = () =>{
    setDarkMode(!darkMode)
  }
  return (
    <>
      <ThemeProvider theme={darkMode? dark:light}>
        <CssBaseline />
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {darkMode? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/verifyUser" element={<VerifyUser />}></Route>
          <Route exact path='/map' element={<Map/>}></Route>
          <Route exact path="/map1" element={<Map1 />}></Route>
          <Route exact path="/parking" element={<Parking />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
