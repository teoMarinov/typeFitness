import { Text } from "@chakra-ui/react";
import { mealDetails } from "../NutritionMenu";

type propType = {
  data: [string, mealDetails[]];
};

export default function TotalDailyDetails({ data }: propType) {
  const totalCals = data[1].reduce((acc: number, meal: mealDetails) => {
    acc += Number(meal.calories);
    return acc;
  }, 0);

  const totalFat = data[1].reduce((acc: number, meal: mealDetails) => {
    acc += Number(meal.fat);
    return acc;
  }, 0);

  const totalSaturatedFat = data[1].reduce((acc: number, meal: mealDetails) => {
    acc += Number(meal.saturatedFat);
    return acc;
  }, 0);

  const totalCarbohydrates = data[1].reduce(
    (acc: number, meal: mealDetails) => {
      acc += Number(meal.carbohydrates);
      return acc;
    },
    0
  );

  const totalSugar = data[1].reduce((acc: number, meal: mealDetails) => {
    acc += Number(meal.sugar);
    return acc;
  }, 0);

  const totalProtein = data[1].reduce((acc: number, meal: mealDetails) => {
    acc += Number(meal.protein);
    return acc;
  }, 0);

  return <Text color={"white"}>{data[0]}</Text>;
}
