import {
  Box,
  Button,
  IconButton,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import image from "../../images/Eliminating-Foul-Odors-in-restaurant-kitchen-scaled.jpeg";
import AddFoodModal from "../Modals/AddFoodModal";
import ListFoods from "./ListFoods";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";
import addData from "../../utils/addData";
import FoodDetailBox from "./FoodDetailBox";
import DisplaySelectedFoods from "./DisplaySelectedFoods";
import DisplaySelectedFoodTopRow from "./DisplaySelectedFoodTopRow";
import DisplaySelectedFoodBotRow from "./DisplaySelectedFoodBotRow";

export type foodDetails = {
  calories: number;
  carbohydrate: number;
  date: string;
  fat: number;
  name: string;
  protein: number;
  saturatedFat: number;
  sugar: number;
  weight: number;
};

export type macroType = {
  calories: number;
  fat: number;
  saturatedFat: number;
  carbohydrate: number;
  sugar: number;
  protein: number;
  weight: number;
};

export default function Nutrition() {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentSelectedFoods, setCurrentSelecetedFoods] = useState([]);
  const [mealName, setMealName] = useState("");

  const totalCalories = currentSelectedFoods
    .reduce((acc, food: string & macroType[]) => {
      acc += (food[1].calories * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalFat = currentSelectedFoods
    .reduce((acc, food) => {
      acc += (food[1].fat * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalSaturatedFat = currentSelectedFoods
    .reduce((acc, food) => {
      acc += (food[1].saturatedFat * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalCarbohydrates = currentSelectedFoods
    .reduce((acc, food) => {
      acc += (food[1].carbohydrate * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalSugar = currentSelectedFoods
    .reduce((acc, food) => {
      acc += (food[1].sugar * food[1].weight) / 100;
      return acc;
    }, 0)
    .toFixed(1);
  const totalProtein = currentSelectedFoods
    .reduce((acc, food) => {
      acc += (food[1].protein * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);

  const totalMacros = {
    totalCalories,
    totalFat,
    totalSaturatedFat,
    totalCarbohydrates,
    totalSugar,
    totalProtein,
  };

  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  useEffect(() => {
    readData(`nutrition/${currentUser}/foods`, (snapshot: any) => {
      const result: (string & foodDetails)[] = Object.entries(snapshot).sort(
        (a, b) => {
          const dateA = new Date(a[1].date);
          const dateB = new Date(b[1].date);
          return dateA - dateB;
        }
      );
      setData(result);
      setDisplayData(result);
    });
  }, [currentUser]);

  useEffect(() => {
    const fitleredData = data.filter((food: (string & foodDetails)[]) => {
      const normalizedInput = searchInput.toLowerCase();
      return food[1].name.toLowerCase().includes(normalizedInput);
    });
    setDisplayData(fitleredData);
  }, [currentUser, data, searchInput]);

  const handleAddToSelected = (food: any) => {
    if (currentSelectedFoods.includes(food))
      return alert(`${food[1].name} has already been addedd`);
    setCurrentSelecetedFoods([...currentSelectedFoods, food]);
  };

  const removeFromSelected = (id: string) => {
    if (currentSelectedFoods.length === 1) return setCurrentSelecetedFoods([]);
    const editedArr = currentSelectedFoods.filter(
      (food: string & foodDetails) => {
        return id !== food[0];
      }
    );
    setCurrentSelecetedFoods(editedArr);
  };

  const changeFoodWeight = (id: string, newVal: number) => {
    const editedWeight: any = [...currentSelectedFoods];
    editedWeight.map((food: string & foodDetails[]) => {
      if (food[0] === id) food[1].weight = newVal;
    });
    console.log(editedWeight);
    setCurrentSelecetedFoods(editedWeight);
  };

  const handleSave = () => {
    const ingredients: foodDetails[] = [];
    currentSelectedFoods.map((food: string & foodDetails[]) => {
      ingredients.push(food[1]);
    });
    if (!mealName) return alert("you must enter name!");

    const mealProps = {
      name: mealName,
      calories: totalCalories,
      fat: totalFat,
      saturatedFat: totalSaturatedFat,
      carbohydrates: totalCarbohydrates,
      sugar: totalSugar,
      protein: totalProtein,
      date: new Date().toString(),
      ingredients,
    };

    if(!ingredients) return alert('you must select at least 1 food')
    console.log(mealProps);
  };

  return (
    <Box width="100%" height="100vh">
      <Box
        top="0"
        left="0"
        width="100%"
        mb={2}
        height="100%"
        position={"fixed"}
        backgroundSize="cover"
        backgroundImage={image}
        backgroundPosition="center"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: "transparent",
          },
        }}
      />

      <Box
        height="100%"
        pos={"relative"}
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: "transparent",
          },
        }}
      >
        <AddFoodModal />
        <ListFoods searchInput={searchInput} setSearchInput={setSearchInput}>
          {displayData.map((e) => (
            <Box key={e[0]}>
              <FoodDetailBox
                food={e}
                currentUser={currentUser}
                addToSelected={handleAddToSelected}
              />
            </Box>
          ))}
        </ListFoods>
        {currentSelectedFoods.length > 0 && (
          <Center>
            <VStack bg={"rgba(0,0,0, 0.6)"} rounded={"md"}>
              <DisplaySelectedFoodTopRow
                name={mealName}
                editName={setMealName}
              />
              <DisplaySelectedFoods
                selectedFoods={currentSelectedFoods}
                changeFoodWeight={changeFoodWeight}
                removeFood={removeFromSelected}
              />
              <DisplaySelectedFoodBotRow totalMacros={totalMacros} />
              <Button colorScheme="green" mb={4} onClick={handleSave}>
                Save
              </Button>
            </VStack>
          </Center>
        )}
      </Box>
    </Box>
  );
}
