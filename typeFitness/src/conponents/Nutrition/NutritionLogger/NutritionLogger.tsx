import { Box, Text } from "@chakra-ui/react";
import { mealDetails } from "../NutritionMenu";
import TotalDailyDetails from "./TotalDailyDetails";

type propType = {
  data: [string, mealDetails[]][];
};

export default function NutritionLogger({ data }: propType) {
  return (
    <>
      {data.map((log: [string, mealDetails[]]) => (
        <TotalDailyDetails data={log} />
      ))}
    </>
  );
}
