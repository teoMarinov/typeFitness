import {
  Box,
  Button,
  IconButton,
  Center
} from "@chakra-ui/react";
import image from "../../images/Eliminating-Foul-Odors-in-restaurant-kitchen-scaled.jpeg"
import { AddIcon } from '@chakra-ui/icons'

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
        <IconButton
          top={4}
          left={4}
          size={'md'}
          pos={'absolute'}
          icon={<AddIcon />}
          textColor={'white'}
          aria-label='Delete'
          bg={'rgba(40, 40, 40, 0.81)'}
          _hover={{ bg: 'rgba(30, 30, 30, 0.81)' }}
        />
      </Box>
    </Box>
  )
}
