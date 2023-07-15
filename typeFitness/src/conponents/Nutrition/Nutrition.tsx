import {
  Box,
  Button,
  IconButton,
  Center,
  Text
} from "@chakra-ui/react";
import image from "../../images/Eliminating-Foul-Odors-in-restaurant-kitchen-scaled.jpeg"
import AddFoodModal from "../Modals/AddFoodModal";
import ListFoods from "./ListFoods";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";
import FoodDetailBox from "./FoodDetailBox";

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

  const context = useContext(AuthContext)
  const currentUser = context.userData?.handle


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
  }, [searchInput])

  return (
    <Box
      width="100%"
      height="100vh"
    >
      <Box
        top="0"
        left="0"
        width="100%"
        height="100%"
        position={'fixed'}
        backgroundSize="cover"
        backgroundImage={image}
        backgroundPosition="center"
      />

      <Box
        height="100%"
        pos={'relative'}
        overflowY="scroll"
      >
        <AddFoodModal />
        <ListFoods searchInput={searchInput} setSearchInput={setSearchInput}>
          {displayData.map(e => (
            < FoodDetailBox food={e} />
          ))}
        </ListFoods>
      </Box>
    </Box>
  )
}
