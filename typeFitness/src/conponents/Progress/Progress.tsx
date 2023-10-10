/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Input, Box, Flex, Center } from "@chakra-ui/react";
import image from "../../images/exercise-weights-iron-dumbbell-with-extra-plates.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";
import ExerciseDataDetails from "./ExerciseDataDetails";

type ExerciseData = CompleteExerciseRecord[];

export type CompleteExerciseRecord = [string, DailyExerciseRecord];

export type DailyExerciseRecord = {
  date: string;
  exercises: Exercise[];
};

type Exercise = {
  failure: boolean;
  reps: string;
  weight: string;
};

export default function Progress() {
  const [data, setData] = useState<ExerciseData>([]);
  const [filteredData, setFilteredData] = useState<ExerciseData>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const context:any = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  useEffect(() => {
    readData(`exerciseLogs/${currentUser}`, (snapshot: any) => {
      const result: ExerciseData = Object.entries(snapshot);
      setData(result);
      setFilteredData(result);
    });
  }, [currentUser]);

  useEffect(() => {
    const updatedData = data.filter((exercise: CompleteExerciseRecord) => {
      const normalizedInput = searchInput.toLowerCase();
      return exercise[0].toLowerCase().includes(normalizedInput);
    });
    setFilteredData(updatedData);
  }, [data, searchInput]);

  return (
    <>
      <Box
        width="100%"
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(25, 25, 25)",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgb(40, 40, 40)",
          },
        }}
        height="100vh"
        userSelect={"none"}
      >
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
        <Heading
          color="white"
          size={"4xl"}
          w={"full"}
          textAlign={"center"}
          mt={"30px"}
        >
          {currentUser}, welcome back!
        </Heading>
        <Center>
          <Input
            mt={"50px"}
            mb={"30px"}
            w={"80%"}
            placeholder="Seach exerice by name"
            onChange={(e) => setSearchInput(e.target.value)}
            textColor={"white"}
          />
        </Center>
        <Flex p={"15px"} wrap={"wrap"}>
          {Array.isArray(filteredData) &&
            filteredData.map((exerciseData: CompleteExerciseRecord) => (
              <ExerciseDataDetails data={exerciseData} />
            ))}
        </Flex>
      </Box>
    </>
  );
}
