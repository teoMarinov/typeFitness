import { weekDays } from "../../../common/constants";
import {
  Box,
  Center,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import readData from "../../../utils/readData";
import { AuthContext } from "../../../context/AuthContext";
import { mealDetails } from "../NutritionMenu/NutritionMenu";

type propType = {
  todayLoggs: any;
};

export default function DailyMacros({ todayLoggs }: propType) {
  const [todayMenu, setTodayMenu] = useState([]);

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

  const totalDietCals = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].calories);
      return acc;
    }, 0)
    .toFixed(1);

  const totalDietCarbs = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].carbohydrates);
      return acc;
    }, 0)
    .toFixed(1);

  const totalDietSugar = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].sugar);
      return acc;
    }, 0)
    .toFixed(1);

  const totalDietFat = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].fat);
      return acc;
    }, 0)
    .toFixed(1);

  const totalDietSaturatedFat = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].saturatedFat);
      return acc;
    }, 0)
    .toFixed(1);

  const totalDietProtein = todayMenu
    .reduce((acc, meal: [string, mealDetails]) => {
      acc += Number(meal[1].protein);
      return acc;
    }, 0)
    .toFixed(1);

  const totalTodayCals = todayLoggs
    ? todayLoggs[1]
        .reduce((acc: number, meal: any) => {
          acc += Number(meal.calories);
          return acc;
        }, 0)
        .toFixed(1)
    : 0.0;

  const totalTodayCarbs = todayLoggs
    ? todayLoggs[1]
        .reduce((acc: number, meal: any) => {
          acc += Number(meal.carbohydrates);
          return acc;
        }, 0)
        .toFixed(1)
    : 0.0;

  const totalTodaySugar = todayLoggs
    ? todayLoggs[1]
        .reduce((acc: number, meal: any) => {
          acc += Number(meal.sugar);
          return acc;
        }, 0)
        .toFixed(1)
    : 0.0;

  const totalTodayFat = todayLoggs
    ? todayLoggs[1]
        .reduce((acc: number, meal: any) => {
          acc += Number(meal.fat);
          return acc;
        }, 0)
        .toFixed(1)
    : 0.0;

  const totalTodaySaturatedFat = todayLoggs
    ? todayLoggs[1]
        .reduce((acc: number, meal: any) => {
          acc += Number(meal.saturatedFat);
          return acc;
        }, 0)
        .toFixed(1)
    : 0.0;

  const totalTodayProtein = todayLoggs
    ? todayLoggs[1]
        .reduce((acc: number, meal: any) => {
          acc += Number(meal.protein);
          return acc;
        }, 0)
        .toFixed(1)
    : 0.0;

  return (
    <>
      <Center fontSize={"xl"} textColor="white">
        <Box bg={"rgba(20, 20, 20, 0.85)"} p={"20px"} mt={"50px"} rounded={'lg'}>
          <VStack >
            <Text mr={"30px"} mb={"10px"} fontSize={'2xl'} fontWeight={'bold'}>
              Today's macros / Diet macros :{" "}
            </Text>
            <HStack>
              <Text mr={"30px"}>
                calories: {totalTodayCals} / {totalDietCals}
              </Text>
              <Text mr={"30px"}>
                fat: {totalTodayFat} / {totalDietFat}
              </Text>
              <Text mr={"30px"}>
                saturated fat: {totalTodaySaturatedFat} /{" "}
                {totalDietSaturatedFat}
              </Text>
              <Text mr={"30px"}>
                carbohydrates: {totalTodayCarbs} / {totalDietCarbs}
              </Text>
              <Text mr={"30px"}>
                sugar: {totalTodaySugar} / {totalDietSugar}
              </Text>
              <Text mr={"30px"}>
                protein: {totalTodayProtein} / {totalDietProtein}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </>
  );
}
