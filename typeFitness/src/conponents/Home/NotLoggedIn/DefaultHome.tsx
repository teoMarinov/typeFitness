import { Text, Box, Heading, Link, SimpleGrid, Center } from "@chakra-ui/react";
import image from "../../../images/HD-Fitness-Backgrounds-For-Desktop.jpg";
import { NavLink } from "react-router-dom";
import WorkoutsHomeDemo from "./WorkoutsHomeDemo";
import LoggerHomeDemo from "./LoggerHomeDemo";
import NutritionTrackerHomeDemo from "./NutritionTrackerHomeDemo";
import DietPlannerHomeDemo from "./DietPlannerHomeDemo";

export default function DefaultHome() {
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
        <Heading
          color="white"
          size={"4xl"}
          w={"full"}
          textAlign={"center"}
          mt={"30px"}
        >
          Welcome to TypeFitness
        </Heading>
        <Text
          color="white"
          fontSize={"4xl"}
          w={"full"}
          textAlign={"center"}
          mt={"40px"}
        >
          To use the following features please
          <NavLink to={"sign-up"}>
            <Link textColor={"blue.400"}> sign up</Link>!
          </NavLink>
        </Text>
        <Center w="full" mt="35px">
          <SimpleGrid columns={2} spacing={10}>
            <NavLink to={"/workouts"}>
              <WorkoutsHomeDemo />
            </NavLink>
            <NavLink to={"/logger"}>
              <LoggerHomeDemo />
            </NavLink>
            <NavLink to={"/nutrition"}>
              <DietPlannerHomeDemo />
            </NavLink>
            <NavLink to={"/nutrition"}>
              <NutritionTrackerHomeDemo />
            </NavLink>
          </SimpleGrid>
        </Center>
      </Box>
    </>
  );
}
