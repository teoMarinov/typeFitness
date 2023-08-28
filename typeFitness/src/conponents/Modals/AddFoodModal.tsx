import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Center,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import SearchFromApi from "../Nutrition/SearchFromApi";
import { useState, useReducer, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddCustom from "../Nutrition/AddCustom";
import addData from "../../utils/addData";

export const ACTION = {
  CHANGE_NAME: "change name",
  CHANGE_CALORIES: "change calories",
  CHANGE_FAT: "change fat",
  CHANGE_SATURATED_FAT: "change saturated fat",
  CHANGE_CARBOHYDRATE: "change carbohydrate",
  CHANGE_SUGAR: "change sugar",
  CHANGE_PROTEIN: "change protein",
  RESET_STATE: "reset state",
};

const initialState = {
  name: "",
  calories: "",
  fat: "",
  saturatedFat: "",
  carbohydrate: "",
  sugar: "",
  protein: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION.CHANGE_NAME:
      return { ...state, name: action.payload };
    case ACTION.CHANGE_CALORIES:
      return { ...state, calories: action.payload };
    case ACTION.CHANGE_FAT:
      return { ...state, fat: action.payload };
    case ACTION.CHANGE_SATURATED_FAT:
      return { ...state, saturatedFat: action.payload };
    case ACTION.CHANGE_CARBOHYDRATE:
      return { ...state, carbohydrate: action.payload };
    case ACTION.CHANGE_SUGAR:
      return { ...state, sugar: action.payload };
    case ACTION.CHANGE_PROTEIN:
      return { ...state, protein: action.payload };
    case ACTION.RESET_STATE:
      return initialState;
  }
};

export default function AddFoodModal() {
  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSeleceted] = useState("search");

  const [state, dispatch] = useReducer(reducer, initialState);

  const currentMealNutriotion = {
    name: state.name,
    calories: state.calories || 0,
    fat: state.fat || 0,
    saturatedFat: state.saturatedFat || 0,
    carbohydrate: state.carbohydrate || 0,
    sugar: state.sugar || 0,
    protein: state.protein || 0,
    weight: 100,
    date: new Date().toString(),
  };

  const handleCancel = () => {
    onClose();
    dispatch({ type: ACTION.RESET_STATE });
  };

  const handleSave = () => {
    if (!currentMealNutriotion.name) return alert("no name");
    addData(`nutrition/${currentUser}/foods`, currentMealNutriotion);
    handleCancel();
  };
  return (
    <>
      <Center h="350px">
        <Button
          size={"md"}
          rounded={"xl"}
          height="70px"
          boxShadow="0 0 8px 1px white"
          width="70px"
          textColor={"white"}
          aria-label="Delete"
          bg="rgba(20, 20, 20, 0.3)"
          _hover={{
            cursor: "pointer",
            bg: "rgba(0, 0, 0, 0.6)",
            width: "90px",
            height: "90px",
            "& > *": {
              fontSize: "80px",
            },
          }}
          transition="height 0.1s ease, width 0.1s ease"
          fontWeight={"bold"}
          fontSize={"6xl"}
          onClick={onOpen}
          borderRadius="90px"
        >
          <Text
            textColor={"white"}
            mb={4}
            transition="font-size 0.1s"
            fontSize={60}
          >
            +
          </Text>
        </Button>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.9)">
          <ModalHeader pos={"relative"}>
            <Button
              top={0}
              left={0}
              w={"50%"}
              bg={selected === "search" ? "rgba(70, 70, 70, 0.9)" : "none"}
              textColor={"white"}
              _hover={{
                bg: "rgba(45, 45, 45, 0.9)",
              }}
              rounded={"none"}
              pos={"absolute"}
              roundedLeft={"md"}
              onClick={() => setSeleceted("search")}
            >
              Search
            </Button>
            <Button
              top={0}
              right={0}
              w={"50%"}
              bg={selected === "add custom" ? "rgba(70, 70, 70, 0.9)" : "none"}
              textColor={"white"}
              _hover={{
                bg: "rgba(45, 45, 45, 0.9)",
              }}
              pos={"absolute"}
              rounded={"none"}
              roundedRight={"md"}
              onClick={() => setSeleceted("add custom")}
            >
              Add custom
            </Button>
          </ModalHeader>
          <ModalBody>
            {selected === "search" ? (
              <SearchFromApi
                moveToAddCustom={() => setSeleceted("add custom")}
                state={state}
                dispatch={dispatch}
              />
            ) : (
              <AddCustom state={state} dispatch={dispatch} />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
