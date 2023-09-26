/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Button } from "@chakra-ui/react";

type propType = {
  changeMenu: any;
};

export default function NutritionHeader({ changeMenu }: propType) {
  return (
    <Flex
      w={"100%"}
      p={1.5}
      py={"10px"}
      bg="rgba(20, 20, 20, 0.81)"
      justify={"space-around"}
    >
      <Button
        textColor={"white"}
        w={"200px"}
        bg="rgba(45, 45, 45, 1)"
        fontSize={"1.2em"}
        _hover={{ bg: "rgba(60, 60, 60, 0.81)" }}
        onClick={() => changeMenu("menu")}
      >
        Food tracker
      </Button>
      <Button
        textColor={"white"}
        w={"200px"}
        bg="rgba(45, 45, 45, 1)"
        fontSize={"1.2em"}
        _hover={{ bg: "rgba(60, 60, 60, 0.81)" }}
        onClick={() => changeMenu("logger")}
      >
        Food history
      </Button>
      <Button
        textColor={"white"}
        w={"200px"}
        bg="rgba(45, 45, 45, 1)"
        fontSize={"1.2em"}
        _hover={{ bg: "rgba(60, 60, 60, 0.81)" }}
        onClick={() => changeMenu("planner")}
      >
        Diet Planner
      </Button>
    </Flex>
  );
}
