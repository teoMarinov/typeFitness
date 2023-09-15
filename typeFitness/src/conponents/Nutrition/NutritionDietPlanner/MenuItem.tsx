import { Box, Center, HStack, IconButton, Text } from "@chakra-ui/react";

import { mealDetails } from "../NutritionMenu/NutritionMenu";
import { DeleteIcon } from "@chakra-ui/icons";

type propType = {
  data: [string, mealDetails];
  remove: any;
  index: number;
};
export default function MenuItem({ data, remove, index }: propType) {
  return (
    <>
      <Center
        textColor={"white"}
        overflow={"hidden"}
        h={"80px"}
        m={"15px"}
        pos={"relative"}
      >
        <HStack
          p={"15px"}
          fontSize={"xl"}
          userSelect="none"
          rounded={"lg"}
          bg="rgba(255, 250, 250, 0.05)"
        >
          <Text w={"240px"} textAlign={"center"} fontSize={"2xl"}>
            {data[1].name}
          </Text>
          <HStack marginRight={"15px"}>
            <Text>Calories:</Text>
            <Text>{data[1].calories} kcal</Text>
          </HStack>
          <HStack marginRight={"15px"}>
            <Text>Carbs:</Text>
            <Text>{data[1].carbohydrates} g</Text>
          </HStack>
          <HStack marginRight={"15px"}>
            <Text>Sugar:</Text>
            <Text>{data[1].sugar} g</Text>
          </HStack>
          <HStack marginRight={"15px"}>
            <Text>Fat:</Text>
            <Text>{data[1].fat} g</Text>
          </HStack>
          <HStack marginRight={"15px"}>
            <Text>Saturated fat:</Text>
            <Text>{data[1].saturatedFat} g</Text>
          </HStack>
          <HStack marginRight={"20px"}>
            <Text>Protein:</Text>
            <Text>{data[1].protein} g</Text>
          </HStack>
        </HStack>
        <IconButton
          pos={"absolute"}
          right={2}
          size={"sm"}
          aria-label="Delete"
          _hover={{ bg: "rgba(70, 70, 70, 0.81)" }}
          bg={"none"}
          textColor={"white"}
          onClick={() => remove(index)}
          icon={<DeleteIcon />}
        />
      </Center>
    </>
  );
}
