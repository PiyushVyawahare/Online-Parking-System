import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import api from "../../api";
import Navbar from "../../components/navbar";
import DriverHome from "../dhome";
import OwnerHome from "../ohome";
import "./index.css";

export default function Home() {
  const [alert, setAlert] = useState(0);
  const [userData, setUserData] = useState(null);

  const messages = {
    403: ["error", "You are not allowed to access this page"],
  };

  function onLoad() {
    api
      .get("/authenticate", { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      {alert ? (
        <Alert severity={messages[alert][0]} variant='standard'>
          {messages[alert][1]}
        </Alert>
      ) : (
        <></>
      )}
      <>
        {userData ? (
          <>
            {userData.userType === "owner" ? <OwnerHome /> : <DriverHome />}
            {/* <Navbar isLoggedIn = {true}></Navbar>
        <h3>Hey {userData.fname} {userData.lname}, Welcome to OPS</h3>
        <h6>You are registered as {userData.userType}.</h6> */}
          </>
        ) : (
          <Navbar isLoggedIn={false}></Navbar>
        )}
        <div id='map'></div>
      </>
    </>
  );
}
