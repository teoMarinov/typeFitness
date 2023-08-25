import { mealDetails } from "./Nutrition";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";

type propType = {
  meal: [string, mealDetails];
  currentUser: string;
  addToSelected: any;
  addSelectedName: any;
  hidePlus: any
};

export default function MealDetailBox({
  meal,
  currentUser,
  addToSelected,
  addSelectedName,
  hidePlus
}: propType) {
  const [toggleDetails, setToggleDetails] = useState(false);

  const handleAddToSelected = () => {
    addToSelected(meal[1].ingredients);
    addSelectedName(meal[1].name)
    hidePlus(false)
  };

  return (
    <Center
      onMouseOver={() => {
        setToggleDetails(true);
      }}
      onMouseLeave={() => {
        setToggleDetails(false);
      }}
      height="350px"
      width="260px"
      bg="rgba(20, 20, 20, 0.3)"
      style={{
        backdropFilter: "blur(6px)",
      }}
      textAlign="center"
      _hover={{
        cursor: "pointer",
        bg: "rgba(0, 0, 0, 0.6)",
      }}
      rounded={"xl"}
      boxShadow="0 0 8px 1px white"
      onClick={handleAddToSelected}
    >
      <VStack
        w={"full"}
        h={"100%"}
        textAlign={"center"}
        justifyContent={"center"}
      ></VStack>
      <Box
        pos={"absolute"}
        top={1}
        right={1}
        opacity={toggleDetails ? "100" : "0"}
        transition="opacity 0.1s linear"
      >
        <DeleteModal
          name={meal[1].name}
          path={`nutrition/${currentUser}/meals/${meal[0]}`}
          unfocus={setToggleDetails}
        />
      </Box>

      <Heading
        p={4}
        maxW={"90%"}
        display="block"
        textColor={"white"}
        position={"absolute"}
        opacity={toggleDetails ? "0" : "100"}
        transition="opacity 0.1s linear"
      >
        {meal[1].name}
      </Heading>

      <VStack
        px={4}
        textColor={"white"}
        opacity={toggleDetails ? "100" : "0"}
        position={"absolute"}
        transition="opacity 0.1s linear"
        fontSize={"md"}
      >
        <Text>fats: {meal[1].fat} g</Text>
        <Text>saturated fats: {meal[1].saturatedFat} g</Text>
        <Text>carbohydrates: {meal[1].carbohydrate} g</Text>
        <Text>sugar: {meal[1].sugar} g</Text>
        <Text>protein: {meal[1].protein} g</Text>
      </VStack>
    </Center>
  );
}
