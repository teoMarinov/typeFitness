import { Box, HStack, Text } from "@chakra-ui/react";

type propType = {
  name: string;
};

export default function DailyMenu({ name }: propType) {
  return (
    <Box
      textColor={"white"}
      rounded={"lg"}
      bg={"gray.800"}
      p={"20px"}
      px={"50px"}
      m={"10px"}
      mx={"40px"}
    >
      <HStack fontSize={"xl"}>
        <Text w={"155px"} fontSize={"3xl"}>
          {name}
        </Text>
        <Text mr={"30px"}>Calories:1234 kcal</Text>
        <Text mr={"30px"}>Carbs:1234 g</Text>
        <Text mr={"30px"}>Sugar:1234 g</Text>
        <Text mr={"30px"}>Fat:1234 g</Text>
        <Text mr={"30px"}>Saturated fat:1234 g</Text>
        <Text mr={"30px"}>Protein:1234 g</Text>
      </HStack>
    </Box>
  );
}
