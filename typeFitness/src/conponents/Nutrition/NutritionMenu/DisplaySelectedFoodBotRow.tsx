
import {
  Grid,
  GridItem,
   Text,
} from "@chakra-ui/react"

type macroType = {
  totalCalories: string
  totalFat: string
  totalSaturatedFat: string
  totalCarbohydrates: string
  totalSugar: string
  totalProtein: string
}

type propType = {
  totalMacros: macroType
}

export default function DisplaySelectedFoodBotRow({ totalMacros }: propType) {
  return (
    <Grid templateColumns='repeat(9, 0fr)' h={'50px'}>
      <GridItem w='215px' >
        <Text
          textColor={'white'}
          mt={'5px'}
          textAlign={'center'}
        >
          total:
        </Text>
      </GridItem>
      <GridItem w='115px'>
        <Text
          textColor={'white'}
          mt={'6.6px'}
          borderLeft={'1px'}
          textAlign={'center'}
        >
          {totalMacros.totalCalories} kcal
        </Text>
      </GridItem>
      <GridItem w='115px'>
        <Text
          textColor={'white'}
          mt={'6.6px'}
          borderLeft={'1px'}
          textAlign={'center'}
        >
          {totalMacros.totalFat} g
        </Text>
      </GridItem>
      <GridItem w='115px'>
        <Text
          textColor={'white'}
          mt={'6.6px'}
          borderLeft={'1px'}
          textAlign={'center'}
        >
          {totalMacros.totalSaturatedFat} g
        </Text>
      </GridItem>
      <GridItem w='115px'>
        <Text
          textColor={'white'}
          mt={'6.6px'}
          borderLeft={'1px'}
          textAlign={'center'}
        >
          {totalMacros.totalCarbohydrates} g
        </Text>
      </GridItem>
      <GridItem w='115px'>
        <Text
          textColor={'white'}
          mt={'6.6px'}
          borderLeft={'1px'}
          textAlign={'center'}
        >
          {totalMacros.totalSugar} g
        </Text>
      </GridItem>
      <GridItem w='115px'>
        <Text
          textColor={'white'}
          mt={'6.6px'}
          borderLeft={'1px'}
          textAlign={'center'}
        >
          {totalMacros.totalProtein} g
        </Text>
      </GridItem>
    </Grid>
  )
}
