import React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CallIcon from '@mui/icons-material/Call';
import style from './style.module.css'

// import api from '../../api'
// import { useNavigate } from 'react-router-dom';
import Logo from '../logo';

export default function IconMenu() {

  // var navigate = useNavigate();

  function onHome(){
    window.location.href('/')
  }

  // function onLogout(){
  //   api.get("/logout", {withCredentials: true})
  //   .then(function(res){
  //     if(res.status === 200){
  //       console.log(res);
  //       window.location.href= "/";
  //     }
  //     else
  //       console.log(res);
  //   })
  //   .catch(function(err){
  //     console.log(err);
  //   });
  // }

  return (
    <Paper className={style.container} sx={{ width: 220, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <Logo />
          </ListItemIcon>
          <ListItemText>OPS</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onHome}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>About</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <CallIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Contact</ListItemText>
        </MenuItem>
        
      </MenuList>
    </Paper>
  );
}
