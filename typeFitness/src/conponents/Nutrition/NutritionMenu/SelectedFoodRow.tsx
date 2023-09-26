/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  Grid,
  GridItem,
  Input,
  Text,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

type propType = {
  currentFood: any;
  removeFood: any;
  changeFoodWeight: any;
};

export default function SelectedFoodRow({
  currentFood,
  removeFood,
  changeFoodWeight,
}: propType) {
  const handleWeightChange = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue === "" || !isNaN(inputValue)) {
      changeFoodWeight(currentFood[0], Number(inputValue));
    } else {
      alert("You can enter only numbers");
    }
  };

  const [inputBoxLength, setInputBoxLength] = useState("");

  useEffect(() => {
    currentFood[1].weight.toString().length > 2
      ? setInputBoxLength(`${currentFood[1].weight.toString().length * 9}px`)
      : setInputBoxLength("20px");
  }, [currentFood[1].weight]);
  return (
    <HStack ml={"40px"} mr={"10px"}>
      <Grid templateColumns="repeat(9, 0fr)" h="50px" ml={"10px"}>
        <GridItem w="215px">
          <Center mt={"8px"}>
            <Text textColor={"white"} textAlign={"center"}>
              {currentFood[1].name} :
            </Text>
            <Center textColor="white" ml={1.5}>
              <Input
                p={0}
                w={inputBoxLength}
                color="white"
                border={"none"}
                rounded={"none"}
                borderBottom="2px solid rgba(1195, 195, 195, 0.3)"
                focusBorderColor="none"
                value={currentFood[1].weight}
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
          </Center>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].calories * currentFood[1].weight) / 100).toFixed(
              1
            )}{" "}
            kcal
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].fat * currentFood[1].weight) / 100).toFixed(1)} g
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {(
              (currentFood[1].saturatedFat * currentFood[1].weight) /
              100
            ).toFixed(1)}{" "}
            g
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {(
              (currentFood[1].carbohydrate * currentFood[1].weight) /
              100
            ).toFixed(1)}{" "}
            g
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].sugar * currentFood[1].weight) / 100).toFixed(1)}{" "}
            g
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"15px"}
            textAlign={"center"}
            borderLeft={"1px"}
          >
            {((currentFood[1].protein * currentFood[1].weight) / 100).toFixed(
              1
            )}{" "}
            g
          </Text>
        </GridItem>
      </Grid>
      <GridItem>
        <IconButton
          size={"sm"}
          mt={"10px"}
          mb={"6px"}
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
