import {
  Box,
  Button,
  IconButton,
  Center,
  Text
} from "@chakra-ui/react";
import image from "../../images/Eliminating-Foul-Odors-in-restaurant-kitchen-scaled.jpeg"
import AddIngredientModal from "../Modals/AddFoodModal";





export default function Nutrition() {

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
        <AddIngredientModal />
      </Box>
    </Box>
  )
}
