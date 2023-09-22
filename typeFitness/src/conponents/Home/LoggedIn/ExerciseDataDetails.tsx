import { Center, Text } from "@chakra-ui/react";
import { CompleteExerciseRecord } from "./LoggedInHome";

type propType = {
  data: CompleteExerciseRecord;
};

export default function ExerciseDataDetails({ data }: propType) {
  console.log(data);
  return (
    <Center>
      <Center bg={"gray.500"} boxSize={"200px"}>
        {/* <Text color={"white"}>{data[0]}</Text> */}
      </Center>
    </Center>
  );
}
