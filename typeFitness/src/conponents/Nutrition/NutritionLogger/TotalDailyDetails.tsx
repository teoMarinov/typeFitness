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
        bg="rgba(40, 40, 40, 0.9)"
        m={"10px"}
        pl={"20px"}
        py={"10px"}
        rounded={"lg"}
        textColor={"white"}
      >
        <Text mr={"15px"}>{data[0]}:</Text>
        <Grid
          templateColumns="repeat(6, 1fr)"
          justifyContent={"space-around"}
          w={"900px"}
          textAlign={"center"}
        >
          <Text>calories</Text>
          <Text>fat</Text>
          <Text>saturated fat</Text>
          <Text>carbohydrates</Text>
          <Text>sugar</Text>
          <Text>protein</Text>
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
