import { Center, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { mealDetails } from "../NutritionMenu";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

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
      return acc;
    }, 0)
    .toFixed(1);

  return (
    <>
      <Center
        bg="rgba(100, 100, 100, 0.9)"
        m={"10px"}
        py={"10px"}
        rounded={"lg"}
        textColor={"white"}
        fontSize={"lg"}

      >
        <Text mr={"15px"}>{data[0]}:</Text>
        <Grid
          templateColumns="repeat(6, 1fr)"
          justifyContent={"space-around"}
          w={"900px"}
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
      </Center>
    </>
  );
}
