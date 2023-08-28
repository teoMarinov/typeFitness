import React from "react";
import {  foodDetails } from "../NutritionMenu";
import { Center, Text, Grid, HStack, VStack, GridItem } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";


type dataType = {
    calories: number;
    fat: number;
    saturatedFat: number;
    carbohydrates: number;
    sugar: number;
    protein: number;
    name: string;
    date: string;
    ingredients: foodDetails[]
}

type propType = {
  data: dataType
};

export default function TotalMealDetails({ data }: propType) {
  const totalCals = data.ingredients
    .reduce((acc: number, meal: foodDetails) => {
      console.log(meal);
      acc += Number(meal.calories);
      return acc;
    }, 0)
    .toFixed(1);

  const totalFat = data.ingredients
    .reduce((acc: number, meal: foodDetails) => {
      acc += Number(meal.fat);
      return acc;
    }, 0)
    .toFixed(1);

  const totalSaturatedFat = data.ingredients
    .reduce((acc: number, meal: foodDetails) => {
      acc += Number(meal.saturatedFat);
      return acc;
    }, 0)
    .toFixed(1);

  const totalCarbohydrates = data.ingredients
    .reduce((acc: number, meal: foodDetails) => {
      acc += Number(meal.carbohydrate);
      return acc;
    }, 0)
    .toFixed(1);

  const totalSugar = data.ingredients
    .reduce((acc: number, meal: foodDetails) => {
      acc += Number(meal.sugar);
      return acc;
    }, 0)
    .toFixed(1);

  const totalProtein = data.ingredients
    .reduce((acc: number, meal: foodDetails) => {
      acc += Number(meal.protein);
      return acc;
    }, 0)
    .toFixed(1);

  const [open, setOpen] = useState(false);

  const listHeight = open ? `${data.ingredients.length} * 20px` : "0px";

  return (
    <>
      <Center>
        <HStack
          bg="rgba(100, 100, 100, 0.9)"
          m={"5px"}
          py={"10px"}
          rounded={"lg"}
          textColor={"white"}
          fontSize={"lg"}
          onClick={() => setOpen(!open)}
          paddingX={"30px"}
        >
          <Grid
            w={"800px"}
            templateColumns="repeat(7, 1fr)"
            templateRows="repeat(2, 1fr)"
            justifyContent={"space-around"}
            textAlign={"center"}
          >
            <GridItem rowSpan={2}>
              <Text mr={"15px"} mt={"12px"}>
                {data.name}:
              </Text>
            </GridItem>
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
      <VStack h={listHeight} overflow={"hidden"} transition="height 0.2s ease">
        {data.ingredients.map((food: foodDetails) => (
          <Text textColor={"white"}>{food.name}</Text>
        ))}
      </VStack>
    </>
  );
}
