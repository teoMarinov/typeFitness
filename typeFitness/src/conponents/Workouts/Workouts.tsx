import MakeNewWorkout from "./MakeNewWorkout"
import ListWorkouts from "./ListWorkouts"
import { Box, Center, SimpleGrid, } from '@chakra-ui/react';
import { useState, useEffect, useContext } from "react";
import readData from "../../utils/readData";
import { AuthContext } from "../../context/AuthContext";
import image from "../../images/pexels-victor-freitas-841130.jpg"
import imageTwo from "../../images/HD-Fitness-Backgrounds-For-Desktop.jpg"
import imageThree from "../../images/desktop-wallpaper-black-and-white-hall-rod-gym-fitness-for-section-спорт-gym-black.jpg"
interface Exercise {
  name: string;
  reps: string;
  sets: string;
}
export interface Workout {
  name: string;
  exercises: Exercise[];
}



export default function BasicStatistics() {

  const [allWorkouts, setAllWorkouts] = useState([])

  const context = useContext(AuthContext)
  const currentUser = context.userData?.handle

  useEffect(() => {
    readData(`workouts/${currentUser}`)
      .then((snapshot) => {
        const result: (string & Workout)[] = Object.entries(snapshot)
        setAllWorkouts(result)
      })
      .catch(error => console.log(error))
  }, [currentUser])


  return (
    <Box width="100%" height="100vh" overflow="hidden">
      <Box
        width="100%"
        height="100%"
        position="fixed"
        top="0"
        left="0"
        backgroundImage={imageTwo}
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex="-1"
      />
      <Box height="100%" overflowY="scroll">
        <MakeNewWorkout />
        <SimpleGrid columns={{ base: 1, md: 3 }} p={5} spacing={5}>
          {allWorkouts.map((workout: string & Workout) => (
            <Center key={workout[0]} h="60vh" >
              <ListWorkouts workout={workout} user={currentUser} />
            </Center>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}


