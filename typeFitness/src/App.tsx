import { Box, Center, Container, Flex } from "@chakra-ui/react";
import Login from "./conponents/Login/Login"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase.config.js";
import getUserData from "./service/user-service.js";
import Logout from "./conponents/Logout/Logout";
import NavBar from "./conponents/NavBar/NavBar.js";


function App() {
  const [user]: any = useAuthState(auth);
  console.log(user)

  const [appState, setAppState] = useState({
    user,
    userData: null,
  });

  if (appState.user !== user) {
    setAppState({ ...appState, user: user });
  }

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("The app is not working currently!");
        }
        setAppState({
          ...appState,
          userData: user.uid
            ? snapshot.val()[Object.keys(snapshot.val())[0]]
            : null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Flex>
          <Box flex='1'>
            <NavBar />
          </Box>
          <Box height={'100vh'} bgColor={'yellow.100'} flex='9' >
            {user && (<Logout />)}
            {user === null && (<Login />)}
          </Box>
        </Flex>
      </BrowserRouter>
    </>
  )
}

export default App
