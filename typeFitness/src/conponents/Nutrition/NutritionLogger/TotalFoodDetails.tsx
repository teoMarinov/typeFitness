import { foodDetails } from "../NutritionMenu";
import {
  Center,
  Text,
  Grid,
  HStack,
  VStack,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

type propType = {
  data: foodDetails;
};

export default function TotalFoodDetails({ data }: propType) {
  return (
    <>
      <Center>
        <HStack
          bg="rgba(40, 40, 40, 0.9)"
          m={"5px"}
          py={"10px"}
          rounded={"lg"}
          textColor={"white"}
          fontSize={"lg"}
          paddingX={"30px"}
        >
          <Flex w={"750px"} justifyContent={"space-around"}>
            <Center>
              <Text mr={"15px"}>{data.name} :</Text>
            </Center>
            <VStack>
              <Text>Calories</Text>
              <Text>{data.calories} kcal</Text>
            </VStack>
            <VStack>
              <Text>fat</Text>
              <Text>{data.fat} g</Text>
            </VStack>
            <VStack>
              <Text>Saturated fat</Text>
              <Text>{data.saturatedFat} g</Text>
            </VStack>
            <VStack>
              <Text>Carbohydrates</Text>
              <Text>{data.carbohydrate} g</Text>
            </VStack>
            <VStack>
              <Text>Sugar</Text>
              <Text>{data.sugar} g</Text>
            </VStack>
            <VStack>
              <Text>Protein</Text>
              <Text>{data.protein} g</Text>
            </VStack>
          </Flex>
        </HStack>
      </Center>
    </>
  );
}
