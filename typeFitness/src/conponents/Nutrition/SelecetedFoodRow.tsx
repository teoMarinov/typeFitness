import { foodDetails } from "./Nutrition";
import {
  Center,
  Grid,
  GridItem,
  Box,
  Input,
  Text,
  Button,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

type propType = {
  currentFood: (string & foodDetails)[];
  removeFood: any;
};

export default function SelecetedFoodRow({
  currentFood,
  removeFood,
}: propType) {
  const handleWeightChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input value is a valid number or empty string (for backspace/delete)
    if (inputValue === "" || !isNaN(inputValue)) {
      setWeight(Number(inputValue));
    } else {
      alert("You can enter only numbers");
    }
  };

  const [weight, setWeight] = useState(123);
  const [inputBoxLength, setInputBoxLength] = useState("");

  useEffect(() => {
    weight.toString().length > 2
      ? setInputBoxLength(`${weight.toString().length * 9}px`)
      : setInputBoxLength("20px");
  }, [weight]);
  return (
    <HStack ml={"40px"} mr={"10px"}>
      <Grid templateColumns="repeat(9, 0fr)" h="50px">
        <GridItem w="215px">
          <HStack mt={"8px"}>
            <Text textColor={"white"} textAlign={"center"}>
              {currentFood[1].name} :
            </Text>
            <Center textColor="white">
              <Input
                p={0}
                w={inputBoxLength}
                color="white"
                border={"none"}
                rounded={"none"}
                borderBottom="2px solid rgba(195, 195, 195, 0.3)"
                focusBorderColor="none"
                value={weight}
                _hover={{}}
                textAlign={"center"}
                onChange={handleWeightChange}
              />
              <Text
                mt={"5px"}
                ml={0}
                pl={1}
                pb={2}
                borderBottom="2px solid rgba(195, 195, 195, 0.3)"
                fontSize={"md"}
                _hover={{
                  cursor: "default",
                }}
              >
                g
              </Text>
            </Center>
          </HStack>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].calories * weight) / 100).toFixed(1)} kcal
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].fat * weight) / 100).toFixed(1)} g
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].saturatedFat * weight) / 100).toFixed(1)} g
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].carbohydrate * weight) / 100).toFixed(1)} g
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].sugar * weight) / 100).toFixed(1)} g
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].protein * weight) / 100).toFixed(1)} g
          </Text>
        </GridItem>
      </Grid>
      <GridItem>
        <IconButton
          size={"sm"}
          mt={"10px"}
          aria-label="Delete"
          _hover={{ bg: "rgba(70, 70, 70, 0.81)" }}
          bg={"none"}
          textColor={"white"}
          onClick={() => removeFood(currentFood[0])}
          icon={<DeleteIcon />}
        />
      </GridItem>
    </HStack>
  );
}
