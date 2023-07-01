import { Heading, Center, Text, VStack } from "@chakra-ui/react"
import { Workout } from "./Workouts"
import { useState } from "react"

type WorkoutType = {
  workout: Workout
}

type TypeExercise = {
  name: string;
  reps: string;
  sets: string
}
export default function ListWorkouts({ workout }: WorkoutType) {

  const [toggleDetails, setToggleDetails] = useState(true)

  return (
    <Center
      onMouseOver={() => setToggleDetails(false)}
      onMouseLeave={() => setToggleDetails(true)}
      bg="white"
      h="50vh"
      border="1px solid"
      textAlign="center"
      _hover={{ cursor: "pointer" }}
    >
      {toggleDetails ? (<Heading as="h2" display="block">
        {workout.name}
      </Heading>) :
        (<VStack>
          {workout.exercises.map((exercise: TypeExercise, index) => (
            <Text key={exercise.name + index + exercise.reps}>{exercise.name} - {exercise.sets} x {exercise.reps}</Text>
          ))}
        </VStack>)}
    </Center>
  );
}