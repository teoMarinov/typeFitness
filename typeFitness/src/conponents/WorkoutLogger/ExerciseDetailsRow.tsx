/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, Center, VStack, HStack } from "@chakra-ui/react";

type setsType = {
  failure: boolean;
  reps: string;
  weight: string;
};

type exerciseType = {
  id: string,
  logs: setsType[]
}

type propType = {
  exercise: [string, exerciseType];
  currentIndex: number;
  currentlySelected: number | string;
  setCurrentlySelected: any;
};

export default function ExerciseDetailsRow({
  exercise,
  currentIndex,
  currentlySelected,
  setCurrentlySelected,
}: propType) {
  const averageReps = (
    exercise[1].logs.reduce((acc: number, set: setsType) => {
      acc += Number(set.reps);
      return acc;
    }, 0) / exercise[1].logs.length
  ).toFixed();


  const handleSelect = () => {
    currentlySelected === currentIndex
      ? setCurrentlySelected("")
      : setCurrentlySelected(currentIndex);
  };

  return (
    <>
      <Center>
        <VStack
          height={
            currentlySelected === currentIndex
              ? `${exercise[1].logs.length * 32 + 54}px`
              : "54px"
          }
          overflow="hidden"
          transition="height 0.2s ease"
        >
          <Text
            _hover={{ bg: "gray.600", cursor: "pointer" }}
            userSelect={"none"}
            p={"10px"}
            m={"5px"}
            rounded={"md"}
            onClick={handleSelect}
          >
            {exercise[0]} - {exercise[1].logs.length} x {averageReps}
          </Text>
          {exercise[1].logs.map((set: setsType) => (
            <HStack textAlign={"left"} w={"full"} ml={"310px"}>
              <Text>
                {set.reps} x {set.weight} kg
              </Text>
              <Text ml={"5px"}>{set.failure && "failed"}</Text>
            </HStack>
          ))}
        </VStack>
      </Center>
    </>
  );
}
