/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  VStack,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddFoodModal from "../../Modals/AddFoodModal";
import ListFoods from "./ListFoods";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import readData from "../../../utils/readData";
import addData from "../../../utils/addData";
import FoodDetailBox from "./FoodDetailBox";
import DisplaySelectedFoods from "./DisplaySelectedFoods";
import DisplaySelectedFoodTopRow from "./DisplaySelectedFoodTopRow";
import DisplaySelectedFoodBotRow from "./DisplaySelectedFoodBotRow";
import MealDetailBox from "./MealDetailsBox";
import TodayDietMenu from "../TodayDietMenu/TodayDietMenu";
import DailyMacros from "./DailyMacros";

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

type dataType = [string, foodDetails][];

export type mealDetails = {
  calories: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugar: number;
  protein: number;
  name: string;
  date: string;
  ingredients: dataType;
};

type mealType = [string, mealDetails][];

export default function NutritionMenu({ todayLoggs }: any) {
  const [data, setData] = useState<dataType>([]);
  const [mealData, setMealData] = useState<mealType>([]);
  const [displayData, setDisplayData] = useState<dataType | mealType>([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentSelectedFoods, setCurrentSelecetedFoods] = useState<any>([]);
  const [mealName, setMealName] = useState("");
  const [currentToggle, setCurrentToggle] = useState("foods");
  const [displayPlus, setDisplayPlus] = useState(true);

  const totalCalories = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].calories * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalFat = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].fat * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalSaturatedFat = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].saturatedFat * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalCarbohydrates = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].carbohydrate * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalSugar = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].sugar * food[1].weight) / 100;
      return acc;
    }, 0)
    .toFixed(1);
  const totalProtein = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
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
    readData(
      `nutrition/${currentUser}/foods`,
      (snapshot: Record<string, foodDetails>) => {
        const result: dataType = Object.entries(snapshot).sort((a, b) => {
          const dateA: Date = new Date(a[1].date);
          const dateB = new Date(b[1].date);
          return dateA.getTime() - dateB.getTime();
        });
        setData(result);
        setDisplayData(result);
      }
    );
  }, [currentUser]);

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
        setDisplayData(result);
      }
    );
  }, [currentUser]);

  useEffect(() => {
    if (currentToggle === "foods") {
      setDisplayData(data);
    } else if (currentToggle === "meals") {
      setDisplayData(mealData);
    }
  }, [currentToggle]);

  useEffect(() => {
    const fitleredData = data.filter((food) => {
      const normalizedInput = searchInput.toLowerCase();
      return food[1].name.toLowerCase().includes(normalizedInput);
    });
    setDisplayData(fitleredData);
  }, [currentUser, data, searchInput]);

  const handleAddToSelected = (food: [string, foodDetails]) => {
    if (currentSelectedFoods.some((item) => item[0] === food[0])) {
      return alert(`${food[1].name} has already been added`);
    }
    const newFood: any = [...currentSelectedFoods, food];
    setCurrentSelecetedFoods(newFood);
  };

  const resetSelectedMenu = () => {
    setMealName("");
    setCurrentSelecetedFoods([]);
    setDisplayPlus(true);
  };

  const removeFromSelected = (id: string) => {
    if (currentSelectedFoods.length === 1) return resetSelectedMenu();
    const editedArr = currentSelectedFoods.filter(
      (food: string & foodDetails) => {
        return id !== food[0];
      }
    );

    setCurrentSelecetedFoods(editedArr);
  };

  const handleChoseFromMenu = (meal: [string, mealDetails], name: string) => {
    setCurrentSelecetedFoods(meal);
    setMealName(name);
  };

  const changeFoodWeight = (id: string, newVal: number) => {
    const editedWeight: any = [...currentSelectedFoods];
    editedWeight.map((food: string & foodDetails[]) => {
      if (food[0] === id) food[1].weight = newVal;
    });

    setCurrentSelecetedFoods(editedWeight);
  };

  const handleSave = (type: string) => {
    if (!mealName) return alert("you must enter name!");

    if (type === "finishedMeals") {
      const ingredients: foodDetails[] = [];
      currentSelectedFoods.map((food: string & foodDetails[]) => {
        ingredients.push(food[1]);
      });

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

      addData(`nutrition/${currentUser}/finishedMeals`, mealProps);
      resetSelectedMenu();
    } else if (type === "meals") {
      const mealProps = {
        name: mealName,
        calories: totalCalories,
        fat: totalFat,
        saturatedFat: totalSaturatedFat,
        carbohydrates: totalCarbohydrates,
        sugar: totalSugar,
        protein: totalProtein,
        date: new Date().toString(),
        ingredients: currentSelectedFoods,
      };

      addData(`nutrition/${currentUser}/meals`, mealProps);
      setDisplayPlus(false);
    } else {
      throw new Error(
        `${type} is not valid command for handleSave Nutriotion 164`
      );
    }
  };
  return (
    <>
      <ListFoods
        setSearchInput={setSearchInput}
        numberOfElems={displayData.length}
        currentToggle={currentToggle}
        setCurrentToggle={setCurrentToggle}
      >
        {currentToggle === "foods" ? (
          <>
            {displayData.map((e) => (
              <Box key={e[0]}>
                <FoodDetailBox
                  food={e}
                  currentUser={currentUser}
                  addToSelected={handleAddToSelected}
                />
              </Box>
            ))}
            <AddFoodModal />
          </>
        ) : (
          displayData.map((e) => (
            <Box key={e[0]}>
              <MealDetailBox
                meal={e}
                ingredients={e[1].ingredients}
                currentUser={currentUser}
                addToSelected={setCurrentSelecetedFoods}
                addSelectedName={setMealName}
                hidePlus={setDisplayPlus}
              />
            </Box>
          ))
        )}
      </ListFoods>
      <TodayDietMenu chooseMeal={handleChoseFromMenu} />
      {currentSelectedFoods.length > 0 && (
        <Center>
          <VStack bg={"rgba(0,0,0, 0.6)"} rounded={"md"}>
            <DisplaySelectedFoodTopRow
              name={mealName}
              editName={setMealName}
              closeMenu={resetSelectedMenu}
            />
            <DisplaySelectedFoods
              selectedFoods={currentSelectedFoods}
              changeFoodWeight={changeFoodWeight}
              removeFood={removeFromSelected}
            />
            <DisplaySelectedFoodBotRow totalMacros={totalMacros} />
            <HStack w={"full"} pos={"relative"} h={"50px"}>
              <Button
                colorScheme="green"
                mb={6}
                onClick={() => handleSave("finishedMeals")}
                pos={"absolute"}
                left={"50%"}
              >
                Save
              </Button>
              {displayPlus ? (
                <IconButton
                  aria-label="Search database"
                  icon={<AddIcon />}
                  colorScheme="green"
                  mb={6}
                  pos={"absolute"}
                  right={6}
                  onClick={() => {
                    handleSave("meals");
                  }}
                ></IconButton>
              ) : (
                <Text
                  mb={6}
                  pos={"absolute"}
                  right={7}
                  textColor={"white"}
                  w={"60px"}
                  textAlign={"center"}
                >
                  saved to meals
                </Text>
              )}
            </HStack>
          </VStack>
        </Center>
      )}
      <DailyMacros todayLoggs={todayLoggs} />
    </>
  );
}
