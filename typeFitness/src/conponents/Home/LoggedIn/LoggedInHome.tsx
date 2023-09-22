import { useReducer } from "react";
import { Text, Button, Input, Box, SimpleGrid, Center } from "@chakra-ui/react";
import image from "../../../images/exercise-weights-iron-dumbbell-with-extra-plates.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import readData from "../../../utils/readData";
import ExerciseDataDetails from "./ExerciseDataDetails";

type ExerciseData = CompleteExerciseRecord[];

export type CompleteExerciseRecord = [string, DailyExerciseRecord];

type DailyExerciseRecord = {
  date: string;
  exercises: Exercise[];
};

type Exercise = {
  failure: boolean;
  reps: string;
  weight: string;
};

export default function LoggedInHome() {
  const [data, setData] = useState<ExerciseData>([]);
  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  useEffect(() => {
    readData(`exerciseLogs/${currentUser}`, (snapshot: any) => {
      const result: ExerciseData = Object.entries(snapshot);
      setData(result);
    });
  }, [currentUser]);


  return (
    <>
      <Box width="100%" height="100vh" userSelect={"none"}>
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
        <SimpleGrid
          columns={4}
          justifyContent={"space-around"}
          spacing={"15px"}
          p={"15px"}
        >
          {Array.isArray(data) &&
            data.map((exerciseData: CompleteExerciseRecord) => (
              <ExerciseDataDetails />
            ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
