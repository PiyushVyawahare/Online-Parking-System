import React, { useState } from 'react'
import style from './style.module.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button'
import IconMenu from '../../utils/menuList';

export default function Menu() {
  const [isMenuClicked, setisMenuClicked] = useState(false);

  function onMenuClicked(){
    setisMenuClicked(!isMenuClicked);
  }
  return (
    <>
    <div className={style.profileIcon}>
        <Button size='small' color='inherit' onClick={onMenuClicked}>
        {
          (isMenuClicked)? <CloseIcon fontSize='large'/> : <AccountBoxIcon fontSize='large' />
        }
          
        </Button>
      </div>
      {
        (isMenuClicked)? <IconMenu/> : <></>
      }
    </>
  )
}
