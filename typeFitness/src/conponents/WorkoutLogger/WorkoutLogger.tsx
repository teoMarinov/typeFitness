/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, Box, Heading, Center } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";
import image from "../../images/old-school-gym.jpg";
import CalenderComp from "./CalenderComp";

export default function WorkoutLogger() {
  return (
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
      <Center height="15vh">
        <Heading
          p={4}
          size={"3xl"}
          rounded={"xl"}
          textColor={"white"}
          fontWeight={"bold"}
          style={{
            backdropFilter: "blur(2px)",
            letterSpacing: "0.15em",
          }}
        >
          Wokrout logs
        </Heading>
      </Center>
      <CalenderComp />
    </Box>
  );
}
