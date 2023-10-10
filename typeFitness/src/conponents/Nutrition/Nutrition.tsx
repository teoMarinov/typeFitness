/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Spacer } from "@chakra-ui/react";
import image from "../../images/kitchen-image.jpeg";
import { useEffect, useState, useContext } from "react";
import NutritionHeader from "./NutritionHeader";
import NutritionMenu from "./NutritionMenu/NutritionMenu";
import NutritionDietPlanner from "./NutritionDietPlanner/NutritionDietPlanner";
import NutritionLogger from "./NutritionLogger/NutritionLogger";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";

export default function Nutrition() {
  const [selectedMenu, setSelectedMenu] = useState("menu");

  const context: any = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  const [loggedData, setLoggedData] = useState<any>([]);

  const todayFullDate = new Date().toString().split(" ");
  const month = todayFullDate[1];
  const day = todayFullDate[2];
  const year = todayFullDate[3];

  const today = `${month}/${day}/${year}`;

  const todayLog = loggedData.find((data: any) => {
    if (data[0] === today) return data[1];
  });

  useEffect(() => {
    readData(`nutrition/${currentUser}/finishedMeals`, (snapshot: any) => {
      const data: any = Object.entries(snapshot).sort((a: any, b: any) => {
        const dateA: Date = new Date(a[1].date);
        const dateB = new Date(b[1].date);
        return dateA.getTime() - dateB.getTime();
      });
      const result: any = {};
      data.map((meal: any) => {
        const wholeDate = meal[1].date.split(" ");
        const month = wholeDate[1];
        const day = wholeDate[2];
        const year = wholeDate[3];
        const date = `${month}/${day}/${year}`;
        result[date] ? result[date].push(meal[1]) : (result[date] = [meal[1]]);
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
      />

      <Box
        height="100%"
        pos={"relative"}
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(150, 160, 170, 0.9)",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(107, 114, 128, 0.9)",
          },
        }}
      >
        <NutritionHeader changeMenu={setSelectedMenu}></NutritionHeader>
        {selectedMenu === "menu" && <NutritionMenu todayLoggs={todayLog} />}
        {selectedMenu === "logger" && (
          <NutritionLogger data={loggedData}></NutritionLogger>
        )}
        {selectedMenu === "planner" && <NutritionDietPlanner />}
        <Spacer h={"45px"} />
      </Box>
    </Box>
  );
}
