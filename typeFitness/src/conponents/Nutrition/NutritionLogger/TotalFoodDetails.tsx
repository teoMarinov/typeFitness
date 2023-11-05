import { foodDetails } from "../NutritionMenu/NutritionMenu";
import {
  Center,
  Text,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";

type propType = {
  data: foodDetails;
};

export default function TotalFoodDetails({ data }: propType) {

const calories = ((data.calories * data.weight)/100).toFixed(1)
const fat = ((data.fat * data.weight)/100).toFixed(1)
const saturatedFat = ((data.saturatedFat * data.weight)/100).toFixed(1)
const carbohydrate = ((data.carbohydrate * data.weight)/100).toFixed(1)
const sugar = ((data.sugar * data.weight)/100).toFixed(1)
const protein = ((data.calories * data.weight)/100).toFixed(1)

  return (
    <>
      <Center>
        <HStack
          bg="rgba(35, 35, 35, 0.85)"
          m={"5px"}
          py={"10px"}
          rounded={"lg"}
          textColor={"white"}
          fontSize={"lg"}
          paddingX={"30px"}
          userSelect={'none'}
        >
          <Flex w={"750px"} justifyContent={"space-around"}>
            <Center>
              <Text mr={"15px"}>
                {data.name} : {data.weight} g
              </Text>
            </Center>
            <VStack>
              <Text>Calories</Text>
              <Text>{calories} kcal</Text>
            </VStack>
            <VStack>
              <Text>fat</Text>
              <Text>{fat} g</Text>
            </VStack>
            <VStack>
              <Text>Saturated fat</Text>
              <Text>{saturatedFat} g</Text>
            </VStack>
            <VStack>
              <Text>Carbohydrates</Text>
              <Text>{carbohydrate} g</Text>
            </VStack>
            <VStack>
              <Text>Sugar</Text>
              <Text>{sugar} g</Text>
            </VStack>
            <VStack>
              <Text>Protein</Text>
              <Text>{protein} g</Text>
            </VStack>
          </Flex>
        </HStack>
      </Center>
    </>
  );
}
