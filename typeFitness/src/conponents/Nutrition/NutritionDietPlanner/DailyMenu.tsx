import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import AddMenuItemsModal from "../../Modals/AddMenuItemsModal";
import { mealDetails } from "../NutritionMenu/NutritionMenu";
import MenuItem from "./MenuItem";
import setDailyDiet from "../../../utils/setDailyDiet";
import readData from "../../../utils/readData";
import { AuthContext } from "../../../context/AuthContext";

type propType = {
  name: string;
};

export default function DailyMenu({ name }: propType) {
  const [todayMenu, setTodayMenu] = useState<[string, mealDetails][]>([]);
  const [open, setOpen] = useState(false);

  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  useEffect(() => {
    readData(
      `diet/${currentUser}/${name}`,
      (snapshot: Record<string, mealDetails>) => {

        snapshot && setTodayMenu(snapshot);
      }
    );
  }, [currentUser]);

  const totalCals = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].calories);
      return acc;
    }, 0)
    .toFixed(1);

  const totalCarbs = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].carbohydrates);
      return acc;
    }, 0)
    .toFixed(1);

  const totalSugar = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].sugar);
      return acc;
    }, 0)
    .toFixed(1);

  const totalFat = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].fat);
      return acc;
    }, 0)
    .toFixed(1);

  const totalSaturatedFat = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].saturatedFat);
      return acc;
    }, 0)
    .toFixed(1);

  const totalProtein = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].protein);
      return acc;
    }, 0)
    .toFixed(1);

  
  const addToMenu = (meal: [string, mealDetails]) => {
    const updatedMenu: [string, mealDetails][] = [...todayMenu];
    updatedMenu.push(meal);
    setDailyDiet(`diet/${currentUser}/${name}`, updatedMenu);
    setTodayMenu(updatedMenu);
  };

  const removeFromMenu = (index: number) => {
    const removedElem = [...todayMenu].filter((_, i: number) => i !== index);
    setDailyDiet(`diet/${currentUser}/${name}`, removedElem);
    setTodayMenu(removedElem);
  };

  const boxHeight = open ? `${170 + todayMenu.length * 95}px` : "85px";

  return (
    <Box
      textColor={"white"}
      rounded={"lg"}
      bg={"gray.800"}
      overflow={"hidden"}
      w={"1350px"}
      h={boxHeight}
      m={"10px"}
      mx={"40px"}
      transition="height 0.2s ease"
    >
      <HStack
        p={"20px"}
        px={"50px"}
        fontSize={"xl"}
        onClick={() => setOpen(!open)}
        _hover={{
          cursor: "pointer",
        }}
        userSelect="none"
      >
        <Text w={"155px"} fontSize={"3xl"} textAlign={"center"} mr={"50px"}>
          {name}
        </Text>
        <Text mr={"30px"}>Calories: {totalCals} kcal</Text>
        <Text mr={"30px"}>Carbs: {totalCarbs} g</Text>
        <Text mr={"30px"}>Sugar: {totalSugar} g</Text>
        <Text mr={"30px"}>Fat: {totalFat} g</Text>
        <Text mr={"30px"}>Saturated fat: {totalSaturatedFat} g</Text>
        <Text mr={"30px"}>Protein: {totalProtein} g</Text>
      </HStack>
      {todayMenu.map((menuItem, index) => (
        <MenuItem data={menuItem} index={index} remove={removeFromMenu} />
      ))}

        <AddMenuItemsModal addToDiet={addToMenu} />
    </Box>
  );
}
