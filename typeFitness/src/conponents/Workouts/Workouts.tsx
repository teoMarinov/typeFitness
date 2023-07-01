import MakeNewWorkout from "./MakeNewWorkout"
import ListWorkouts from "./ListWorkouts"
import { Box, SimpleGrid, } from '@chakra-ui/react';
import { useState, useEffect, useContext } from "react";
import readData from "../../utils/readData";
import { AuthContext } from "../../context/AuthContext";

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
        const result:(string & Workout)[] = Object.entries(snapshot)
        setAllWorkouts(result)
      })
      .catch(error => console.log(error))
  }, [currentUser])


  return (
    <Box width={'100%'}>
      <MakeNewWorkout />
      <SimpleGrid columns={{ base: 1, md: 3 }} p={5} spacing={5} >
        {
          allWorkouts.map((workout:string & Workout) => (
            <Box key={workout[0]}>
              <ListWorkouts workout={workout} user={currentUser}/>
            </Box>
          ))
        }
      </SimpleGrid>
    </Box>
  );
}


