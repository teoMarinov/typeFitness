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
  name: string;
  exercises: TypeExercise[];
}
export default function ListWorkouts({ workout, user }: WorkoutType) {


  const workoutData: TypeWorkout = workout[1]
  const [toggleDetails, setToggleDetails] = useState(false)


  return (
    <Center
      onMouseOver={() => setToggleDetails(true)}
      onMouseLeave={() => setToggleDetails(false)}
      h={toggleDetails ? ('52vh') : ('50vh')}
      w={toggleDetails ? ('460px') : ('450px')}
      bg={'gray.300'}
      textAlign="center"
      _hover={{ cursor: "pointer" }}
      boxShadow="2px 0 15px rgba(0, 0, 0, 0.5)"
      transition="height 0.1s ease, width 0.1s ease"
      rounded={'xl'}
    >
      {toggleDetails ? (
        <VStack position={'relative'} w={'full'} h={'100%'} textAlign={'center'} justifyContent={'center'}>
          <Box position={'absolute'} top={1} right={1} >
            <EditModal workout={workoutData.exercises} name={workoutData.name} id={workout[0]} currentUser={user} />
          </Box>
          <Box position={'absolute'} top={10} right={1}>
            <Center>
              <DeleteModal workoutId={workout[0]} workoutName={workoutData.name} currentUser={user} />
            </Center>
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