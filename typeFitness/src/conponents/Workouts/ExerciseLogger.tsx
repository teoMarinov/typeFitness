/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { TypeExercise } from "./ListWorkouts";
import { Text, Input, HStack, VStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { NotAllowedIcon } from "@chakra-ui/icons";

type propTypes = {
  exercise: TypeExercise;
  loggedData: any;
  setLoggedData: any;
  currentlyOpen: number | string;
  setCurrentlyOpen: any;
  exerciseIndex: number;
};

export type logType = {
  weight: string;
  reps: string;
  failure: boolean;
};

export default function ExerciseLogger({
  exercise,
  loggedData,
  setLoggedData,
  currentlyOpen,
  setCurrentlyOpen,
  exerciseIndex,
}: propTypes) {
  const exerciseId = Object.keys(loggedData).length;
  const [exerciseLoggs, setExerciseLoggs] = useState([{ failure: false }]);
  const lineH = exercise.name.length > 37 ? 64 : 40;
  const lineIncrease = 38;

  const updateLoggedData = (newLog: logType[]) => {
    if (!loggedData[exercise.name]) {
      const changedLog = {
        ...loggedData,
        [exercise.name]: { id: exerciseId, logs: newLog },
      };
      setLoggedData(changedLog);
    }
    const thisId = loggedData[exercise.name] && loggedData[exercise.name].id;
    const changedLog = {
      ...loggedData,
      [exercise.name]: { id: thisId, logs: newLog },
    };
    setLoggedData(changedLog);
  };

  const handleInput = (key: string, value: string, index: string) => {
    const lastIndex = exerciseLoggs.length - 1;
    const updatedLoggs = [...exerciseLoggs];

    updatedLoggs[index] = {
      ...updatedLoggs[index],
      [key]: value,
    };

    setExerciseLoggs(updatedLoggs);

    updateLoggedData(updatedLoggs);

    if (
      lastIndex >= 0 &&
      updatedLoggs[lastIndex].reps &&
      updatedLoggs[lastIndex].weight
    ) {
      updatedLoggs.push({ failure: false });
    }
  };

  const toggleCurrentlyOpen = () =>
    currentlyOpen === exerciseIndex
      ? setCurrentlyOpen("")
      : setCurrentlyOpen(exerciseIndex);

  const handleToggleFailure = (index: any) => {
    const updatedStatus = [...exerciseLoggs];
    updatedStatus[index] = {
      ...updatedStatus[index],
      failure: !updatedStatus[index].failure,
    };
    setExerciseLoggs(updatedStatus);

    const thisId = loggedData[exercise.name].id;
    setLoggedData({
      ...loggedData,
      [exercise.name]: { id: thisId, logs: updatedStatus },
    });
  };

  return (
    <>
      <VStack
        overflow="hidden"
        transition="height 0.2s ease"
        height={
          currentlyOpen === exerciseIndex
            ? `${exerciseLoggs.length * lineIncrease + lineH}px`
            : `${lineH}px`
        }
        _hover={{
          cursor: "pointer",
        }}
      >
        <Text
          _hover={{ bg: "gray.600" }}
          onClick={toggleCurrentlyOpen}
          rounded={"md"}
          textAlign={"center"}
          p={2}
          userSelect="none"
        >
          {exercise.name} - {exercise.sets} x {exercise.reps}
        </Text>
        {exerciseLoggs.map((data: any, index: any) => (
          <HStack key={index}>
            <Input
              p={0}
              w={"65px"}
              h={"30px"}
              fontSize="18"
              placeholder="reps"
              value={data.reps}
              textAlign={"center"}
              onChange={(e) => {
                handleInput("reps", e.target.value, index);
              }}
            />
            <Input
              p={0}
              w={"65px"}
              h={"30px"}
              fontSize="18"
              placeholder="weight"
              value={data.weight}
              textAlign={"center"}
              onChange={(e) => {
                handleInput("weight", e.target.value, index);
              }}
            />
            <IconButton
              size={"xs"}
              aria-label="Edit"
              textColor={"white"}
              border={"1px"}
              _hover={{
                bg: data.failure ? "rgb(250, 0, 0)" : "rgb(30, 30, 30)",
              }}
              icon={<NotAllowedIcon />}
              bg={data.failure ? "rgb(250, 0, 0)" : "none"}
              onClick={() => handleToggleFailure(index)}
            />
          </HStack>
        ))}
      </VStack>
    </>
  );
}
