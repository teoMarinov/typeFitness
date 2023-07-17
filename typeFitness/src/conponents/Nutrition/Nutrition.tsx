import {
  Box,
  Button,
  IconButton,
  Center,
  Text,
  VStack
} from "@chakra-ui/react";
import image from "../../images/Eliminating-Foul-Odors-in-restaurant-kitchen-scaled.jpeg"
import AddFoodModal from "../Modals/AddFoodModal";
import ListFoods from "./ListFoods";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";
import FoodDetailBox from "./FoodDetailBox";
import DisplaySelectedFoods from "./DisplaySelectedFoods";

export type foodDetails = {
  calories: string
  carbohydrate: string
  date: string
  fat: string
  name: string
  protein: string
  saturatedFat: string
  sugar: string
}


export default function Nutrition() {

  const [data, setData] = useState([])
  const [displayData, setDisplayData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [currentSelectedFoods, setCurrentSelecetedFoods] = useState([])

  const context = useContext(AuthContext)
  const currentUser = context.userData?.handle

  const handleAddToSelected = (test: any) => {
    if (currentSelectedFoods.includes(test)) return alert(`${test[1].name} has already been addedd`)
    setCurrentSelecetedFoods([...currentSelectedFoods, test])
  }

  const removeFromSelected = (id: string) => {
    if (currentSelectedFoods.length === 1) return setCurrentSelecetedFoods([])
    const editedArr = currentSelectedFoods.filter((food: string & foodDetails) => {
      return id === food[0]
    })
    setCurrentSelecetedFoods(editedArr)
  }

  useEffect(() => {
    readData(`nutrition/${currentUser}/foods`, (snapshot: any) => {
      const result: (string & foodDetails)[] = Object.entries(snapshot).sort((a, b) => {
        const dateA = new Date(a[1].date);
        const dateB = new Date(b[1].date);
        return dateA - dateB;
      });
      setData(result)
      setDisplayData(result)
    })
  }, [currentUser])

  useEffect(() => {
    const fitleredData = data.filter((food: (string & foodDetails)[]) => {
      const normalizedInput = searchInput.toLowerCase()
      return food[1].name.toLowerCase().includes(normalizedInput)
    })
    setDisplayData(fitleredData)
  }, [currentUser, data, searchInput])


  return (
    <Box
      width="100%"
      height="100vh"
      
    >
      <Box
        top="0"
        left="0"
        width="100%"
        mb={2}
        height="100%"
        position={'fixed'}
        backgroundSize="cover"
        backgroundImage={image}
        backgroundPosition="center"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
            backgroundColor: 'transparent',
          }
        }}
      />

      <Box
        height="100%"
        pos={'relative'}
        overflowY="scroll"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
            backgroundColor: 'transparent',
          }
        }}
      >
        <AddFoodModal />
        <ListFoods searchInput={searchInput} setSearchInput={setSearchInput}>
          {displayData.map(e => (
            <Box key={e[0]}>
              < FoodDetailBox food={e} currentUser={currentUser} addToSelected={handleAddToSelected} />
            </Box>
          ))}
        </ListFoods>
        {currentSelectedFoods.length > 0 && (<DisplaySelectedFoods selectedFoods={currentSelectedFoods} removeFood={removeFromSelected} />)}
      </Box>
    </Box>
  )
}
