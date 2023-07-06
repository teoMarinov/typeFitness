import { Heading, Center, Text, VStack, Box } from "@chakra-ui/react"
import { Workout } from "./Workouts"
import { useState } from "react"
import EditModal from "../Modals/EditModal"
import DeleteModal from "../Modals/DeleteModal"

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
  console.log(workoutData)
  const [toggleDetails, setToggleDetails] = useState(false)


  return (
    <Center
      onMouseOver={() => {
        setToggleDetails(true)
      }}
      onMouseLeave={() => {
        setToggleDetails(false)
      }}
      h={toggleDetails ? ('52vh') : ('50vh')}
      w={toggleDetails ? ('460px') : ('450px')}
      bg={'gray.50'}
      textAlign="center"
      _hover={{ cursor: "pointer" }}
      boxShadow="2px 0 15px rgba(0, 0, 0, 0.5)"
      transition="height 0.1s ease, width 0.1s ease"
      rounded={'xl'}
      position={'relative'}
    >

      <VStack position={'relative'} w={'full'} h={'100%'} textAlign={'center'} justifyContent={'center'}>
        <Box position={'absolute'} top={3} right={3} display={toggleDetails ? "block" : "none"} >
          <EditModal workout={workoutData.exercises} name={workoutData.name} id={workout[0]} currentUser={user} />
        </Box>
        <Box position={'absolute'} top={12} right={3} display={toggleDetails ? "block" : "none"}>
          <Center>
            <DeleteModal workoutId={workout[0]} workoutName={workoutData.name} currentUser={user} />
          </Center>
        </Box>
        {
          (workoutData.exercises.map((exercise: TypeExercise, index: number) => (
            <Box key={exercise.name + index} >
              <Text
                fontSize={toggleDetails ? 20 : 0}
                transition="font-size 0.1s"
              >
                {exercise.name} - {exercise.sets} x {exercise.reps}
              </Text>
            </Box>
          )))}
      </VStack>

      <Heading
        as="h2"
        p={4}
        display="block"
        position={'absolute'}
        maxW={'80%'}
        transform={toggleDetails ? 'translateY(-200px)' : 'translateY(0%)'}
        size={toggleDetails ? 'xl' : '2xl'}
        transition="transform 0.1s linear, font-size 0.1s linear"
      >
        {workoutData.name}
      </Heading>
    </Center >
  );
}