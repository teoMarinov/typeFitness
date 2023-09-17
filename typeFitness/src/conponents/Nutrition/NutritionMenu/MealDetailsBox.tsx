import { mealDetails } from "./NutritionMenu";
import { Box, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import DeleteModal from "../../Modals/DeleteModal";

type propType = {
  meal: [string, mealDetails];
  currentUser: string;
  addToSelected: any;
  addSelectedName: any;
  hidePlus: any;
  ingredients: any;
};

export default function MealDetailBox({
  meal,
  ingredients,
  currentUser,
  addToSelected,
  addSelectedName,
  hidePlus,
}: propType) {
  const [toggleDetails, setToggleDetails] = useState(false);

  const handleAddToSelected = () => {
    addToSelected(meal[1].ingredients);
    addSelectedName(meal[1].name);
    hidePlus(false);
  };

  const [toggleDetailsType, setToggleDetailsType] = useState("foods");

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
        bg: "rgba(45, 45, 45, 0.6)",
      }}
      rounded={"xl"}
      boxShadow="0 0 8px 1px white"
      onClick={handleAddToSelected}
    >
      <HStack
        w={"full"}
        h={"100%"}
        textAlign={"center"}
        justifyContent={"center"}
        pos={"relative"}
      ></HStack>
      <Box
        pos={"absolute"}
        top={1}
        right={1}
        opacity={toggleDetails ? "100" : "0"}
        transition="opacity 0.1s linear"
      >
        <HStack pos={"relative"}>
          <Box
            w={"30px"}
            h={"10px"}
            bg={toggleDetailsType === "foods" ? "white" : "none"}
            roundedLeft={"2xl"}
            pos={"absolute"}
            right={"127px"}
            top={"9px"}
            border="1px solid white"
            onClick={(e) => {
              e.stopPropagation();
              setToggleDetailsType("foods");
            }}
          ></Box>
          <Box
            w={"30px"}
            h={"10px"}
            bg={toggleDetailsType === "foods" ? "none" : "white"}
            roundedRight={"2xl"}
            pos={"absolute"}
            right={"97px"}
            top={"9px"}
            border="1px solid white"
            onClick={(e) => {
              e.stopPropagation();
              setToggleDetailsType("macros");
            }}
          ></Box>
        </HStack>
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
        {toggleDetailsType === "macros" && (
          <>
            <Text>fats: {meal[1].fat} g</Text>
            <Text>saturated fats: {meal[1].saturatedFat} g</Text>
            <Text>carbohydrates: {meal[1].carbohydrates} g</Text>
            <Text>sugar: {meal[1].sugar} g</Text>
            <Text>protein: {meal[1].protein} g</Text>
          </>
        )}
        {toggleDetailsType === "foods" &&
          ingredients &&
          ingredients.map((food: any) => (
            <>
              <Text>
                {food[1].name}: {food[1].weight}g
              </Text>
            </>
          ))}
      </VStack>
    </Center>
  );
}
