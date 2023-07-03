import { Heading, Center, Text, VStack, Box } from "@chakra-ui/react"
import { Workout } from "./Workouts"
import { useState } from "react"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"


type WorkoutType = {
  workout: string & Workout
  user: string
}

export type TypeExercise = {
  name: string;
  reps: string;
  sets: string;
}

type TypeWorkout = {
    exercises: TypeExercise[];
    name: string
}
export default function ListWorkouts({ workout, user }: WorkoutType) {


  const workoutData : TypeWorkout = workout[1]
  console.log(workoutData)
  const [toggleDetails, setToggleDetails] = useState(true)


  return (
    <Center
      onMouseOver={() => setToggleDetails(true)}
      // onMouseLeave={() => toggleEditMenu || setToggleDetails(false)}
      bg="white"
      h="50vh"
      border="1px solid"
      textAlign="center"
      _hover={{ cursor: "pointer" }}
    >
      {toggleDetails ? (<VStack position={'relative'} w={'full'} h={'100%'} textAlign={'center'} justifyContent={'center'}>
        <Box position={'absolute'} top={1} right={1}>
          <EditModal workout={workoutData.exercises} name={workoutData.name} id={workout[0]} currentUser={user}/>
        </Box>
        <Box position={'absolute'} top={10} right={1}>
          <DeleteModal workoutId={workout[0]} workoutName={workoutData.name} currentUser={user} />
        </Box>
        {
          (workoutData.exercises.map((exercise: TypeExercise, index: number) => (
            <Box key={exercise.name + index}>
              <Text >{exercise.name} - {exercise.sets} x {exercise.reps}</Text>
            </Box>
          )))}
      </VStack>) : (
        <>

          <Heading as="h2" display="block">{workoutData.name}</Heading>
        </>
      )
      }
    </Center >
  );
}