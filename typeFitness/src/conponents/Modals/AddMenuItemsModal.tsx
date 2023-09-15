import {
  Modal,
  ModalOverlay,
  ModalContent,
  HStack,
  Box,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import readData from "../../utils/readData";
import { foodDetails } from "../Nutrition/NutritionMenu/NutritionMenu";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { mealDetails } from "../NutritionMenu/NutritionMenu";

type propType = {
  addToDiet: any;
};

export default function AddMenuItemsModal({ addToDiet }: propType) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = (meal: [string, mealDetails]) => {
    onClose();
    addToDiet(meal);
  };

  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    readData(
      `nutrition/${currentUser}/meals`,
      (snapshot: Record<string, foodDetails>) => {
        const result: any = Object.entries(snapshot).sort((a, b) => {
          const dateA: Date = new Date(a[1].date);
          const dateB = new Date(b[1].date);
          return dateA.getTime() - dateB.getTime();
        });
        setMealData(result);
      }
    );
  }, [currentUser]);

  return (
    <>
      <Center mt={"15px"}>
        <Button
          mt={"4px"}
          size={"md"}
          rounded={"xl"}
          height="50px"
          border={"1px"}
          width="50px"
          textColor={"white"}
          aria-label="Delete"
          bg="rgba(20, 20, 20, 0.3)"
          _hover={{
            bg: "rgba(30, 30, 30, 0.3)",
          }}
          transition="height 0.1s ease, width 0.1s ease"
          fontWeight={"bold"}
          fontSize={"6xl"}
          onClick={onOpen}
          borderRadius="90px"
        >
          <Text
            textColor={"white"}
            mb={2}
            transition="font-size 0.1s"
            fontSize={40}
          >
            +
          </Text>
        </Button>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent bg={"gray.800"} textColor={"white"} py={5}>
          <ModalCloseButton />
          <ModalBody>
            {mealData.map((meal: [string, mealDetails]) => (
              <Box
                textColor={"white"}
                rounded={"lg"}
                bg={"gray.750"}
                boxShadow="0 0 6px 1px gray"
                overflow={"hidden"}
                m={"10px"}
                mx={"40px"}
                onClick={() => handleOnClick(meal)}
              >
                <HStack
                  p={"15px"}
                  fontSize={"xl"}
                  _hover={{
                    cursor: "pointer",
                  }}
                  userSelect="none"
                >
                  <Text
                    w={"330px"}
                    textAlign={"center"}
                    mr={"30px"}
                    fontSize={"2xl"}
                  >
                    {meal[1].name}
                  </Text>
                  <VStack marginRight={"15px"}>
                    <Text>Calories:</Text>
                    <Text>1234 kcal</Text>
                  </VStack>
                  <VStack marginRight={"15px"}>
                    <Text>Carbs:</Text>
                    <Text>1234 g</Text>
                  </VStack>
                  <VStack marginRight={"15px"}>
                    <Text>Sugar:</Text>
                    <Text>1234 g</Text>
                  </VStack>
                  <VStack marginRight={"15px"}>
                    <Text>Fat:</Text>
                    <Text>1234 g</Text>
                  </VStack>
                  <VStack marginRight={"15px"}>
                    <Text>Saturated fat:</Text>
                    <Text>1234 g</Text>
                  </VStack>
                  <VStack marginRight={"15px"}>
                    <Text>Protein:</Text>
                    <Text>1234 g</Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
