/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";
import ListWorkouts from "./ListWorkouts";
import image from "../../images/Te-Rapa-28.jpg";
import MakeNewWorkoutModal from "../Modals/MakeNewWorkoutModal";

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
  const [allWorkouts, setAllWorkouts] = useState([]);

  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  useEffect(() => {
    readData(`workouts/${currentUser}`, (snapshot: any) => {
      const result: (string & Workout)[] = Object.entries(snapshot);
      setAllWorkouts(result);
    });
  }, [currentUser]);

  return (
    <Box width="100%" height="100vh">
      <Box
        width="100%"
        height="100%"
        position={"fixed"}
        top="0"
        left="0"
        backgroundImage={image}
        backgroundSize="cover"
        backgroundPosition="center"
        zIndex="-1"
      />
      <Box
        height="100%"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(150, 160, 170, 0.9)",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(107, 114, 128, 0.9)", 
          },
        }}
      >
        <Center height="25vh">
          <Heading
            p={4}
            size={"3xl"}
            rounded={"xl"}
            textColor={"white"}
            fontWeight={"bold"}
            bg="rgba(10, 10, 10, 0.3)"
            style={{
              backdropFilter: "blur(2px)",
              letterSpacing: "0.15em",
            }}
          >
            Your workouts
          </Heading>
        </Center>
        <SimpleGrid columns={{ base: 1, md: 3 }} p={5} spacing={5}>
          {allWorkouts.map((workout: string & Workout) => (
            <Center key={workout[0]} h="60vh">
              <ListWorkouts workout={workout} user={currentUser} />
            </Center>
          ))}
          <Center h="60vh">
            <MakeNewWorkoutModal currentUser={currentUser} />
          </Center>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
