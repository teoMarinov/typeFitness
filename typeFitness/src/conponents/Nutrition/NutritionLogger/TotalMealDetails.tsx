import { foodDetails } from "../NutritionMenu/NutritionMenu";
import {
  Center,
  Text,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";
import TotalFoodDetails from "./TotalFoodDetails";

type dataType = {
  calories: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugar: number;
  protein: number;
  name: string;
  date: string;
  ingredients: foodDetails[];
};

type propType = {
  data: dataType;
  setChildrenListHeight: (height: number) => void;
  childrenListHeight: number;
};

export default function TotalMealDetails({
  data,
  childrenListHeight,
  setChildrenListHeight,
}: propType) {
  const totalCals = data.ingredients
    .reduce((acc: number, meal: foodDetails) => {
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

  const [listHeight, setListHeight] = useState<string>("0px");

  const childrenHeight = data.ingredients.length * 116;

  const openList = () => {
    setListHeight(`${childrenHeight}px`);
    setChildrenListHeight(childrenListHeight + childrenHeight);
  };

  const closeList = () => {
    setListHeight("0px");
    setChildrenListHeight(childrenListHeight - childrenHeight);
  };

  const handleChangeHeight = () => {
    setOpen(!open);

    open ? closeList() : openList();
  };

  return (
    <>
      <Center>
        <HStack
          bg="rgba(30, 30, 30, 0.85)"
          m={"2px"}
          py={"10px"}
          rounded={"lg"}
          textColor={"white"}
          fontSize={"lg"}
          onClick={handleChangeHeight}
          paddingX={"30px"}
          userSelect={'none'}
        >
          <Flex w={"800px"} justifyContent={"space-around"}>
            <Center>
              <Text mr={"15px"}>{data.name} :</Text>
            </Center>
            <VStack>
              <Text>Calories</Text>
              <Text>{totalCals} kcal</Text>
            </VStack>
            <VStack>
              <Text>fat</Text>
              <Text>{totalFat} g</Text>
            </VStack>
            <VStack>
              <Text>Saturated fat</Text>
              <Text>{totalSaturatedFat} g</Text>
            </VStack>
            <VStack>
              <Text>Carbohydrates</Text>
              <Text>{totalCarbohydrates} g</Text>
            </VStack>
            <VStack>
              <Text>Sugar</Text>
              <Text>{totalSugar} g</Text>
            </VStack>
            <VStack>
              <Text>Protein</Text>
              <Text>{totalProtein} g</Text>
            </VStack>
          </Flex>
          {open ? (
            <ChevronUpIcon mb={"2px"} boxSize={6} />
          ) : (
            <ChevronDownIcon mb={"2px"} boxSize={6} />
          )}
        </HStack>
      </Center>
      <VStack h={listHeight} overflow={"hidden"} transition="height 0.2s ease">
        {data.ingredients.map((food: foodDetails) => (
          <TotalFoodDetails data={food} />
        ))}
      </VStack>
    </>
  );
}
