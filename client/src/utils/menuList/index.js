import React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import style from './style.module.css'
import api from '../../api'
import { useNavigate } from 'react-router-dom';

export default function IconMenu() {

  var navigate = useNavigate();

  function onProfile(){
    navigate("/profile");
  }

  function onLogout(){
    api.get("/logout", {withCredentials: true})
    .then(function(res){
      if(res.status === 200){
        console.log(res);
        window.location.href= "/";
      }
      else
        console.log(res);
    })
    .catch(function(err){
      console.log(err);
    });
  }

  return (
    <Paper className={style.container} sx={{ width: 220, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem onClick={onProfile}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AddBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Project</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>LogOut</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
