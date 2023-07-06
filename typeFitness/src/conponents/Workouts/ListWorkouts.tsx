import { Heading, Center, Text, VStack, Box } from "@chakra-ui/react"
import { Workout } from "./Workouts"
import { useState } from "react"
import EditModal from "../Modals/EditModal"
import DeleteModal from "../Modals/DeleteModal"

type WorkoutType = {
  workout: string & Workout
  user: string
  update: number,
  setUpdate: any
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


export default function ListWorkouts({ update, setUpdate, workout, user }: WorkoutType) {

  const workoutData: TypeWorkout = workout[1]
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
      bg="rgba(0, 0, 0, 0.3)"
      style={{
        backdropFilter: "blur(6px)",
      }}
      textAlign="center"
      _hover={{
        cursor: "pointer",
        bg: "rgba(0, 0, 0, 0.6)"

      }}
      transition="height 0.1s ease, width 0.1s ease"
      rounded={'xl'}
      position={'relative'}
    >

      <VStack position={'relative'} w={'full'} h={'100%'} textAlign={'center'} justifyContent={'center'}>
        <Box position={'absolute'} top={3} right={3} display={toggleDetails ? "block" : "none"} >
          <EditModal update={update} setUpdate={setUpdate} workout={workoutData.exercises} name={workoutData.name} id={workout[0]} currentUser={user} />
        </Box>
        <Box position={'absolute'} top={12} right={3} display={toggleDetails ? "block" : "none"}>
          <Center>
            <DeleteModal update={update} setUpdate={setUpdate} workoutId={workout[0]} workoutName={workoutData.name} currentUser={user} />
          </Center>
        </Box>
        {
          (workoutData.exercises.map((exercise: TypeExercise, index: number) => (
            <Box key={exercise.name + index} >
              <Text
                textColor={'white'}
                transition="font-size 0.1s"
                fontSize={toggleDetails ? 20 : 0}
              >
                {exercise.name} - {exercise.sets} x {exercise.reps}
              </Text>
            </Box>
          )))}
      </VStack>

      <Heading
        p={4}
        as="h2"
        maxW={'80%'}
        display="block"
        textColor={'white'}
        position={'absolute'}
        size={toggleDetails ? 'xl' : '2xl'}
        transition="transform 0.1s linear, font-size 0.1s linear"
        transform={toggleDetails ? 'translateY(-200px)' : 'translateY(0%)'}
      >
        {workoutData.name}
      </Heading>
    </Center >
  );
}