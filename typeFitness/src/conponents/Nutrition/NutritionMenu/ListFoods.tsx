import {
  Box,
  Center,
  HStack,
  Input,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

type propType = {
  children: any;
  numberOfElems: number;
  setSearchInput: any;
  currentToggle: string;
  setCurrentToggle: (newToggle: string) => void;
};

export default function ListFoods({
  children,
  numberOfElems,
  setSearchInput,
  currentToggle,
  setCurrentToggle,
}: propType) {
  const [open, setOpen] = useState(false);

  const menuH = open
    ? `${151 + Math.ceil((numberOfElems + 1) / 5) * 370}px`
    : "60px";
  const handleToggleList = () => {
    if (open) {
      setOpen(false);
      setTimeout(() => {
        setSearchInput("");
      }, 180);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Box
        rounded={"xl"}
        textColor={"white"}
        fontWeight={"bold"}
        bg="rgba(20, 20, 20, 0.85)"
        style={{
          backdropFilter: "blur(2px)",
          letterSpacing: "0.15em",
        }}
        w="85%"
        h={menuH}
        mt={"90px"}
        ml={"7.5%"}
        mb={"50px"}
        transition="height .2s ease"
        textAlign="center"
        overflow={"hidden"}
      >
        <Center
          _hover={{ cursor: "pointer" }}
          onClick={handleToggleList}
          mt="2"
        >
          <HStack mr={"245px"} mt={"120px"} pos={"absolute"}>
            <Button
              mt={"10px"}
              roundedRight={"none"}
              bg={currentToggle == "meals" ? "rgb(10,10,10)" : "white"}
              textColor={currentToggle == "meals" ? "white" : "rgb(10,10,10)"}
              pos={"absolute"}
              left={"-368px"}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentToggle("foods");
              }}
              _hover={{ bg: "rgb(230,230,230)", textColor: "black" }}
            >
              foods
            </Button>
            <Button
              mt={"10px"}
              roundedLeft={"none"}
              bg={currentToggle == "foods" ? "rgb(10,10,10)" : "white"}
              textColor={currentToggle == "foods" ? "white" : "black"}
              pos={"absolute"}
              left={"-295px"}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentToggle("meals");
              }}
              _hover={{ bg: "rgb(230,230,230)", textColor: "black" }}
            >
              meals
            </Button>
          </HStack>

          <Text mt={"11px"} textAlign={"center"} userSelect={"none"}>
            Your saves{" "}
            {open ? (
              <ChevronUpIcon mb={"2px"} boxSize={6} />
            ) : (
              <ChevronDownIcon mb={"2px"} boxSize={6} />
            )}
          </Text>
        </Center>
        <Input
          w={"600px"}
          mt={"30px"}
          left={"430px"}
          pos={"absolute"}
          placeholder={
            currentToggle == "foods"
              ? "search saved foods"
              : "search saved meals"
          }
          transition="opacity 0.1s linear"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Box mt={"85px"}>
          <SimpleGrid columns={{ base: 1, md: 5 }} p={5} spacing={5}>
            {children}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
