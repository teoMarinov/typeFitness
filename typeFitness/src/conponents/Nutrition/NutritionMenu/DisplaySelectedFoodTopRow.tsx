/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  GridItem,
  Input,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type propType = {
  name: string;
  editName: any;
  closeMenu: any;
};

export default function DisplaySelectedFoodTopRow({
  name,
  editName,
  closeMenu,
}: propType) {
  return (
    <HStack ml={"40px"} mr={"10px"}>
      <Grid templateColumns="repeat(9, 0fr)" mt={2}  ml={"10px"}>
        <GridItem w="215px">
          <Input
            border={"none"}
            rounded={"sm"}
            placeholder="Enter name"
            value={name}
            onChange={(e) => editName(e.target.value)}
            textColor={"white"}
            textAlign={"center"}
          />
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"6.6px"}
            borderLeft={"1px"}
            textAlign={"center"}
          >
            calories
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"6.6px"}
            borderLeft={"1px"}
            textAlign={"center"}
          >
            fat
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"6.6px"}
            borderLeft={"1px"}
            textAlign={"center"}
          >
            saturated fat
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"6.6px"}
            borderLeft={"1px"}
            textAlign={"center"}
          >
            carbohydrate
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"6.6px"}
            borderLeft={"1px"}
            textAlign={"center"}
          >
            sugar
          </Text>
        </GridItem>
        <GridItem w="115px">
          <Text
            textColor={"white"}
            mt={"6.6px"}
            borderLeft={"1px"}
            textAlign={"center"}
          >
            protein
          </Text>
        </GridItem>
      </Grid>
      <IconButton
        size={"sm"}
        mt={"10px"}
        mb={"3px"}
        aria-label="Delete"
        _hover={{ bg: "rgba(70, 70, 70, 0.81)" }}
        bg={"none"}
        textColor={"white"}
        onClick={closeMenu}
        icon={<CloseIcon />}
      />
    </HStack>
  );
}
