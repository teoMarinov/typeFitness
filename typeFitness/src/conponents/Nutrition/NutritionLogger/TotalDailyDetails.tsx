import { Center, Text, Grid, VStack, HStack } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { mealDetails } from "../NutritionMenu";
import TotalMealDetails from "./TotalMealDetails";

type propType = {
  data: [string, mealDetails[]];
};

export default function TotalDailyDetails({ data }: propType) {
  const totalCals = data[1]
    .reduce((acc: number, meal: mealDetails) => {
      acc += Number(meal.calories);
      return acc;
    }, 0)
    .toFixed(1);

  const totalFat = data[1]
    .reduce((acc: number, meal: mealDetails) => {
      acc += Number(meal.fat);
      return acc;
    }, 0)
    .toFixed(1);

  const totalSaturatedFat = data[1]
    .reduce((acc: number, meal: mealDetails) => {
      acc += Number(meal.saturatedFat);
      return acc;
    }, 0)
    .toFixed(1);

  const totalCarbohydrates = data[1]
    .reduce((acc: number, meal: mealDetails) => {
      acc += Number(meal.carbohydrates);
      return acc;
    }, 0)
    .toFixed(1);

  const totalSugar = data[1]
    .reduce((acc: number, meal: mealDetails) => {
      acc += Number(meal.sugar);
      return acc;
    }, 0)
    .toFixed(1);

  const totalProtein = data[1]
    .reduce((acc: number, meal: mealDetails) => {
      acc += Number(meal.protein);
      console.log(acc, meal.protein);
      return acc;
    }, 0)
    .toFixed(1);

  const [open, setOpen] = useState(false);

  const listHeight = open ? `${data[1].length * 96}px` : "0px";

  return (
    <>
      <Center>
        <HStack
          bg="rgba(100, 100, 100, 0.9)"
          m={"10px"}
          py={"10px"}
          rounded={"lg"}
          textColor={"white"}
          fontSize={"lg"}
          onClick={() => setOpen(!open)}
          paddingX={"30px"}
        >
          <Text mr={"15px"}>{data[0]}:</Text>
          <Grid
            w={"900px"}
            templateColumns="repeat(6, 1fr)"
            justifyContent={"space-around"}
            textAlign={"center"}
          >
            <Text>Calories</Text>
            <Text>Fat</Text>
            <Text>Saturated fat</Text>
            <Text>Carbohydrates</Text>
            <Text>Sugar</Text>
            <Text>Protein</Text>
            <Text>{totalCals}</Text>
            <Text>{totalFat}</Text>
            <Text>{totalSaturatedFat}</Text>
            <Text>{totalCarbohydrates}</Text>
            <Text>{totalSugar}</Text>
            <Text>{totalProtein}</Text>
          </Grid>
          {open ? (
            <ChevronUpIcon mb={"2px"} boxSize={6} />
          ) : (
            <ChevronDownIcon mb={"2px"} boxSize={6} />
          )}
        </HStack>
      </Center>
      <VStack
        h={listHeight}
        overflow={"hidden"}
        mt={"10px"}
        transition="height 0.2s ease"
      >
        {data[1].map((meal: any) => (
          <TotalMealDetails data={meal} />
        ))}
      </VStack>
    </>
  );
}
