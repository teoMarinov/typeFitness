import { weekDays } from "../../../common/constants";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import readData from "../../../utils/readData";
import { AuthContext } from "../../../context/AuthContext";
import { mealDetails } from "../NutritionMenu/NutritionMenu";

type propType = {
  chooseMeal: any;
};

export default function TodayDietMenu({ chooseMeal }: propType) {
  const [todayMenu, setTodayMenu] = useState([]);
  const [open, setOpen] = useState(false);

  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  const currentDayOfWeek = new Date().toString().split(" ")[0];

  useEffect(() => {
    readData(
      `diet/${currentUser}/${weekDays[currentDayOfWeek]}`,
      (snapshot: Record<string, mealDetails>) => {
        snapshot && setTodayMenu(snapshot);
      }
    );
  }, [currentUser]);

  return (
    <>
      <Box
        top={"205px"}
        zIndex={"999"}
        bg={"rgba(0,0,0,0.97)"}
        width={"50px"}
        h={"80px"}
        roundedLeft={"xl"}
        pos={"absolute"}
        right={open ? "600px" : "0px"}
        _hover={{
          cursor: "pointer",
        }}
        userSelect={"none"}
        onClick={() => setOpen(!open)}
        transition="right 0.2s ease"
      >
        <Text color={"white"} fontSize={"5xl"} ml={"10px"}>
          {open ? ">" : "<"}
        </Text>
      </Box>
      <Box
        top={"205px"}
        zIndex={"999"}
        bg={"rgba(0,0,0,0.97)"}
        h={"600px"}
        width={open ? "600px" : "0px"}
        pos={"absolute"}
        right={"0px"}
        transition="width 0.2s ease"
        overflow={"hidden"}
      >
        <Text
          color={"white"}
          pt={"10px"}
          fontSize={"3xl"}
          textAlign={"center"}
          w={"550px"}
        >
          TODAY'S MENU
        </Text>
        <SimpleGrid columns={2} spacing={5} p={5} mt={"10px"}>
          {todayMenu.map((food: [string, mealDetails]) => (
            <>
              <Box
                bg={"gray.900"}
                _hover={{
                  cursor: "pointer",
                }}
                userSelect={"none"}
                p={"25px"}
                rounded={"lg"}
                onClick={() => chooseMeal(food[1].ingredients, food[1].name)}
              >
                <Text color={"white"} textAlign={"center"} fontSize={"xl"}>
                  {food[1].name}
                </Text>
              </Box>
            </>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
