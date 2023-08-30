/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import image from "../../images/Eliminating-Foul-Odors-in-restaurant-kitchen-scaled.jpeg";
import { useEffect, useState, useContext } from "react";
import NutritionHeader from "./NutritionHeader";
import NutritionMenu from "./NutritionMenu/NutritionMenu";
import NutritionDietPlanner from "./NutritionDietPlanner";
import NutritionLogger from "./NutritionLogger/NutritionLogger";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";

export default function Nutrition() {
  const [selectedMenu, setSelectedMenu] = useState("menu");

  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  const [loggedData, setLoggedData] = useState({});


  useEffect(() => {
    readData(`nutrition/${currentUser}/finishedMeals`, (snapshot: any) => {
      const data: any = Object.entries(snapshot).sort((a, b) => {
        const dateA: Date = new Date(a[1].date);
        const dateB = new Date(b[1].date);
        return dateA.getTime() - dateB.getTime();
      });
      const result = {};
      data.map((meal: any) => {
        const split = meal[1].date.split(' ')
        const date = `${split[1]}/${split[2]}/${split[3]}`
        result[date]
        ? result[date].push(meal[1])
        : (result[date] = [meal[1]]);
        
      });
      setLoggedData(Object.entries(result));
    });
  }, [currentUser]);

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
        {selectedMenu === "logger" && <NutritionLogger data={loggedData}></NutritionLogger>}
        {selectedMenu === "planner" && (
          <NutritionDietPlanner></NutritionDietPlanner>
        )}
      </Box>
    </Box>
  );
}
