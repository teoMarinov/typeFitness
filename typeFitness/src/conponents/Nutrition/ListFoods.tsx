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
    ? `${90 + Math.ceil((numberOfElems + 1) / 5 ) * 370}px`
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
        bg="rgba(100, 100, 100, 0.9)"
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
          {open && (
            <HStack mr={"245px"} pos={"absolute"}>
              <Button
                mt={"10px"}
                roundedRight={"none"}
                bg={currentToggle == "foods" ? "#292929" : "none"}
                textColor={"white"}
                pos={"absolute"}
                left={"-268px"}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentToggle("foods");
                }}
                _hover={{ bg: "#292929" }}
              >
                foods
              </Button>
              <Button
                mt={"10px"}
                roundedLeft={"none"}
                bg={currentToggle == "meals" ? "#292929" : "none"}
                textColor={"white"}
                pos={"absolute"}
                left={"-195px"}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentToggle("meals");
                }}
                _hover={{ bg: "#292929" }}
              >
                meals
              </Button>
              <Input
                w={"400px"}
                mt={"10px"}
                left={"-85px"}
                pos={"absolute"}
                transition="opacity 0.1s linear"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </HStack>
          )}
          <Text
            mt={"11px"}
            textAlign={"center"}
            userSelect={"none"}
            transition="transform 0.1s linear, font-size 0.1s linear"
            transform={open ? "translateX(300px)" : "translateX(0%)"}
          >
            Your saves{" "}
            {open ? (
              <ChevronUpIcon mb={"2px"} boxSize={6} />
            ) : (
              <ChevronDownIcon mb={"2px"} boxSize={6} />
            )}
          </Text>
        </Center>
        <Box mt={4}>
          <SimpleGrid columns={{ base: 1, md: 5 }} p={5} spacing={5}>
            {children}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
