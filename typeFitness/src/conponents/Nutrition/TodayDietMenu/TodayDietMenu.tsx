import { weekDays } from "../../../common/constants";
import React from "react";
import { useContext, useEffect, useState } from "react";
import readData from "../../../utils/readData";
import { AuthContext } from "../../../context/AuthContext";
import { mealDetails } from "../NutritionMenu/NutritionMenu";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  Button,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

type propType = {
  chooseMeal: any;
};

export default function TodayDietMenu({ chooseMeal }: propType) {
  const [todayMenu, setTodayMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  const currentDayOfWeek = new Date().toString().split(" ")[0];

  useEffect(() => {
    readData(
      `diet/${currentUser}/${weekDays[currentDayOfWeek]}`,
      (snapshot: Record<string, mealDetails>) => {
        snapshot && setTodayMenu(snapshot);
      }
    );
  }, [currentUser]);

  return (
    <>
      <Button
        onClick={onOpen}
        pos={"fixed"}
        right={0}
        h={"400px"}
        w={"55px"}
        textColor={"white"}
        colorScheme="blackAlpha"
        bg={"rgba(10,10,10,0.8)"}
        _hover={{
          bg: "rgba(25,25,25,0.8)",
        }}
      >
        <Text
          fontSize={"40px"}
          fontWeight={"light"}
          letterSpacing={"5px"}
          transform="rotate(-90deg)"
        >
          Today's menu
        </Text>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent
          bg={"rgba(30,30,30,0.8)"}
          overflowY={"scroll"}
          css={{
            "&::-webkit-scrollbar": {
              width: "0px",
              height: "0xp",
            },
          }}
        >
          <DrawerCloseButton color={"white"} size={"lg"} mt={"13px"} />
          <DrawerHeader textAlign={"center"} textColor={"white"} my={"10px"}>
            Today's diet
          </DrawerHeader>

          <DrawerBody
            overflowY={"scroll"}
            css={{
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(150, 160, 170, 0.9)",
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(107, 114, 128, 0.9)",
              },
            }}
          >
            <VStack>
              {todayMenu.map((food: [string, mealDetails]) => (
                <>
                  <Box
                    bg={"rgba(10,10,10,0.8)"}
                    _hover={{
                      cursor: "pointer",
                    }}
                    w={"490px"}
                    userSelect={"none"}
                    p={"15px"}
                    rounded={"lg"}
                    onClick={() => {
                      chooseMeal(food[1].ingredients, food[1].name);
                      onClose();
                    }}
                    m={"3px"}
                  >
                    <Text
                      color={"white"}
                      textAlign={"center"}
                      fontSize={"2xl"}
                      mb={"5px"}
                    >
                      {food[1].name}
                    </Text>
                    <Text
                      style={{ wordSpacing: "5px" }}
                      color={"white"}
                      textAlign={"center"}
                      fontSize={"xs"}
                      mb={"5px"}
                    >
                      calories:{food[1].calories}kcal fat:{food[1].fat}g sat
                      fat:{food[1].saturatedFat}g carbs:
                      {food[1].carbohydrates}g sugar:{food[1].sugar}g protein:
                      {food[1].protein}g
                    </Text>
                  </Box>
                  <Box
                    bg={"rgba(10,10,10,0.8)"}
                    _hover={{
                      cursor: "pointer",
                    }}
                    w={"490px"}
                    userSelect={"none"}
                    p={"15px"}
                    rounded={"lg"}
                    onClick={() => {
                      chooseMeal(food[1].ingredients, food[1].name);
                      onClose();
                    }}
                    m={"3px"}
                  >
                    <Text
                      color={"white"}
                      textAlign={"center"}
                      fontSize={"2xl"}
                      mb={"5px"}
                    >
                      {food[1].name}
                    </Text>
                    <Text
                      style={{ wordSpacing: "5px" }}
                      color={"white"}
                      textAlign={"center"}
                      fontSize={"xs"}
                      mb={"5px"}
                    >
                      calories:{food[1].calories}kcal fat:{food[1].fat}g sat
                      fat:{food[1].saturatedFat}g carbs:
                      {food[1].carbohydrates}g sugar:{food[1].sugar}g protein:
                      {food[1].protein}g
                    </Text>
                  </Box>
                  <Box
                    bg={"rgba(10,10,10,0.8)"}
                    _hover={{
                      cursor: "pointer",
                    }}
                    w={"490px"}
                    userSelect={"none"}
                    p={"15px"}
                    rounded={"lg"}
                    onClick={() => {
                      chooseMeal(food[1].ingredients, food[1].name);
                      onClose();
                    }}
                    m={"3px"}
                  >
                    <Text
                      color={"white"}
                      textAlign={"center"}
                      fontSize={"2xl"}
                      mb={"5px"}
                    >
                      {food[1].name}
                    </Text>
                    <Text
                      style={{ wordSpacing: "5px" }}
                      color={"white"}
                      textAlign={"center"}
                      fontSize={"xs"}
                      mb={"5px"}
                    >
                      calories:{food[1].calories}kcal fat:{food[1].fat}g sat
                      fat:{food[1].saturatedFat}g carbs:
                      {food[1].carbohydrates}g sugar:{food[1].sugar}g protein:
                      {food[1].protein}g
                    </Text>
                  </Box>
                </>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
