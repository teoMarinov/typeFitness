/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Center, Flex, Grid, GridItem } from "@chakra-ui/react";
import Login from "./conponents/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase.config.js";
import getUserData from "./service/user-service.js";
import NavBar from "./conponents/NavBar/NavBar.js";
import Home from "./conponents/Home/Home.js";
import Workouts from "./conponents/Workouts/Workouts.js";
import Nutrition from "./conponents/Nutrition/Nutrition.js";
import { AuthContext } from "./context/AuthContext.js";
import Signup from "./conponents/Signup/Signup.js";
import Profile from "./conponents/Profile/Profile.js";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute.js";



function App() {
  const [user]: any = useAuthState(auth);

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
      <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
        <BrowserRouter>
          <Grid templateColumns='repeat(40, 1fr)'>
            <GridItem
              as='aside'
              colSpan={1}
              bgColor={'purple.500'}
              minHeight={'100vh'}
              boxShadow="2px 0 2px rgba(0, 0, 0, 0.5)"
            >
              <NavBar />
            </GridItem>
            <GridItem
              colSpan={39}
              minHeight={'100vh'}
            >
              <Center>
                <Routes>
                  {user && (
                    <>
                      <Route path="/" element={
                        <AuthenticatedRoute>
                          <Home />
                        </AuthenticatedRoute>
                      } />
                      <Route path="/workouts" element={
                        <AuthenticatedRoute>
                          <Workouts />
                        </AuthenticatedRoute>} />
                      <Route path="/nutrition" element={
                        <AuthenticatedRoute>
                          <Nutrition />
                        </AuthenticatedRoute>
                      } />
                      <Route path="/profile" element={
                        <AuthenticatedRoute>
                          <Profile />
                        </AuthenticatedRoute>
                      } />
                    </>
                  )}
                  {user === null && (
                    <>
                      <Route path="log-in" element={<Login />} />
                      <Route path="sign-up" element={<Signup />} />
                      <Route path="/" element={<Login />} />
                    </>
                  )}
                </Routes>
              </Center>
            </GridItem>
          </Grid>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
