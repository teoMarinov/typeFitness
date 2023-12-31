/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, Grid, GridItem } from "@chakra-ui/react";
import Login from "./conponents/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase.config.js";
import setUserData from "./service/user-service.js";
import NavBar from "./conponents/NavBar/NavBar.js";
import Progress from "./conponents/Progress/Progress.js";
import Workouts from "./conponents/Workouts/Workouts.js";
import Nutrition from "./conponents/Nutrition/Nutrition.js";
import { AuthContext } from "./context/AuthContext.js";
import Signup from "./conponents/Signup/Signup.js";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute.js";
import WorkoutLogger from "./conponents/WorkoutLogger/WorkoutLogger.js";
import DefaultHome from "./conponents/Home/DefaultHome.js";




function App() {
  const [user]: any = useAuthState(auth);

  const [appState, setAppState] = useState<any>({
    user,
    userData: null,
  });

  if (appState.user !== user) {
    setAppState({ ...appState, user: user });
  }

  useEffect(() => {
    if (user === null) return;

    setUserData(user.uid)
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
          <Grid templateColumns="repeat(50, 1fr)">
            {user && (
              <GridItem
                as="aside"
                colSpan={1}
                bg="rgba(20, 20, 20, 0.81)"
                minHeight={"100vh"}
                boxShadow="3px 0 10px rgba(0, 0, 0, 0.5)"
                zIndex={10}
              >
                <NavBar
                  username={appState.userData && appState.userData.handle}
                />
              </GridItem>
            )}
            <GridItem colSpan={49} minHeight={"100vh"}>
              <Center>
                <Routes>
                  {user && (
                    <>
                      <Route
                        path="/"
                        element={
                          <AuthenticatedRoute>
                            <Workouts />
                          </AuthenticatedRoute>
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <AuthenticatedRoute>
                            <Workouts />
                          </AuthenticatedRoute>
                        }
                      />
                      <Route
                        path="/workouts"
                        element={
                          <AuthenticatedRoute>
                            <Workouts />
                          </AuthenticatedRoute>
                        }
                      />
                      <Route
                        path="/logger"
                        element={
                          <AuthenticatedRoute>
                            <WorkoutLogger />
                          </AuthenticatedRoute>
                        }
                      />
                      <Route
                        path="/progress"
                        element={
                          <AuthenticatedRoute>
                            <Progress />
                          </AuthenticatedRoute>
                        }
                      />
                      <Route
                        path="/nutrition"
                        element={
                          <AuthenticatedRoute>
                            <Nutrition />
                          </AuthenticatedRoute>
                        }
                      />
                    </>
                  )}
                  {user === null && (
                    <>
                      <Route path="log-in" element={<Login />} />
                      <Route path="sign-up" element={<Signup />} />
                      <Route path="*" element={<Login />} />
                      <Route path="/" element={<DefaultHome />} />
                    </>
                  )}
                </Routes>
              </Center>
            </GridItem>
          </Grid>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
