import React, { useState } from 'react'
import style from './style.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button'
import NavIconMenu from '../navMenuList';

export default function Navmenu() {
  const [isMenuClicked, setisMenuClicked] = useState(false);

  function onMenuClicked(){
    setisMenuClicked(!isMenuClicked);
  }
  return (
    <>
    <div className={style.profileIcon}>
        <Button size='small' color='inherit' onClick={onMenuClicked}>
        {
          (isMenuClicked)? <CloseIcon fontSize='large'/> : <MenuIcon fontSize='large' />
        }
          
        </Button>
      </div>
      {
        (isMenuClicked)? <NavIconMenu/> : <></>
      }
    </>
  )
}
