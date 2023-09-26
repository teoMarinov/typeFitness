import { Center, Text } from "@chakra-ui/react";
import { CompleteExerciseRecord } from "./LoggedInHome";
import { useState } from "react";
import ExerciseDataModal from "../../Modals/ExerciseDataModal";

type propType = {
  data: CompleteExerciseRecord;
};

export default function ExerciseDataDetails({ data }: propType) {
  return (
    <Center>
      <Center
        style={{
          backdropFilter: "blur(3px)",
          background: "rgba(10,10,10, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
        }}
        width={"400px"}
        height={"200px"}
        m={"15px"}
        _hover={{
          transform: "translateY(-15px)",
        }}
        transition="transform 0.2s ease"
      >
        <Text fontSize={"30px"} color={"white"} textAlign={"center"}>
          {data[0]}
        </Text>
        <ExerciseDataModal initalData={data} />
      </Center>
    </Center>
  );
}
