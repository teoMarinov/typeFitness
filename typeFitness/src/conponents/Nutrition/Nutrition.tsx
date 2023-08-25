/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import image from "../../images/Eliminating-Foul-Odors-in-restaurant-kitchen-scaled.jpeg";
import { useState } from "react";
import NutritionHeader from "./NutritionHeader";
import NutritionMenu from "./NutritionMenu";
import NutritionDietPlanner from "./NutritionDietPlanner";
import NutritionLogger from "./NutritionLogger";

export default function Nutrition() {
  const [selectedMenu, setSelectedMenu] = useState("menu");

  return (
    <Box width="100%" height="100vh">
      <Box
        top="0"
        left="0"
        width="100%"
        mb={2}
        height="100%"
        position={"fixed"}
        backgroundSize="cover"
        backgroundImage={image}
        backgroundPosition="center"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: "transparent",
          },
        }}
      />

      <Box
        height="100%"
        pos={"relative"}
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: "transparent",
          },
        }}
      >
        <NutritionHeader changeMenu={setSelectedMenu}></NutritionHeader>
        {selectedMenu === "menu" && <NutritionMenu></NutritionMenu>}
        {selectedMenu === "logger" && <NutritionLogger></NutritionLogger>}
        {selectedMenu === "planner" && (
          <NutritionDietPlanner></NutritionDietPlanner>
        )}
      </Box>
    </Box>
  );
}
