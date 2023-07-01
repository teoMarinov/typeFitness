import { Heading, Center, Text, VStack } from "@chakra-ui/react"
import { Workout } from "./Workouts"

type WorkoutType = {
    workout: Workout
}
export default function ListWorkouts({ workout }: WorkoutType) {
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.querySelector("h2").style.display = "none";
      e.currentTarget.querySelector("div").style.display = "block";
    };
  
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.querySelector("h2").style.display = "block";
      e.currentTarget.querySelector("div").style.display = "none";
    };
  
    return (
      <Center
        bg="white"
        h="50vh"
        border="1px solid"
        textAlign="center"
        _hover={{ cursor: "pointer" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Heading as="h2" display="block">
          {workout.name}
        </Heading>
        <VStack display="none">
          {workout.data.map((info: string) => (
            <Text key={info}>{info}</Text>
          ))}
        </VStack>
      </Center>
    );
  }