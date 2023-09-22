import { useReducer } from "react";
import { Text, Button, Input, Box } from "@chakra-ui/react";
import image from "../../../images/exercise-weights-iron-dumbbell-with-extra-plates.jpg";

export default function LoggedInHome() {
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
      </Box>
    </>
  );
}
