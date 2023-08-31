import { Center, VStack } from "@chakra-ui/react";
import DailyMenu from "./DailyMenu";

export default function NutritionDietPlanner() {
  return (
    <>
      <VStack >
        <DailyMenu name={"Monday"}></DailyMenu>
        <DailyMenu name={"Tuesday"}></DailyMenu>
        <DailyMenu name={"Wednesday"}></DailyMenu>
        <DailyMenu name={"Thursday"}></DailyMenu>
        <DailyMenu name={"Friday"}></DailyMenu>
        <DailyMenu name={"Saturday"}></DailyMenu>
        <DailyMenu name={"Sunday"}></DailyMenu>
      </VStack>
    </>
  );
}
