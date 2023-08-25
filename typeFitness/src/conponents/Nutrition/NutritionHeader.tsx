import { Flex, Button } from "@chakra-ui/react";

type propType = {
  changeMenu: any;
};

export default function NutritionHeader({ changeMenu }: propType) {
  return (
    <Flex
      w={"full"}
      h={"40px"}
      bg="rgba(20, 20, 20, 0.81)"
      justify={"space-around"}
    >
      <Button
        textColor={"white"}
        w={"200px"}
        bg="none"
        fontSize={"1.2em"}
        _hover={{ bg: "rgba(50, 50, 50, 0.81)" }}
        onClick={() => changeMenu('menu')}
      >
        Menu
      </Button>
      <Button
        textColor={"white"}
        w={"200px"}
        bg="none"
        fontSize={"1.2em"}
        _hover={{ bg: "rgba(50, 50, 50, 0.81)" }}
        onClick={() => changeMenu('logger')}
      >
        Logger
      </Button>
      <Button
        textColor={"white"}
        w={"200px"}
        bg="none"
        fontSize={"1.2em"}
        _hover={{ bg: "rgba(50, 50, 50, 0.81)" }}
        onClick={() => changeMenu('planner')}
      >
        Diet Planner
      </Button>
    </Flex>
  );
}
