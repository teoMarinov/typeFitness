import { foodDetails } from "./Nutrition"
import {
    Center,
    Grid,
    GridItem,
    Box,
    Input,
    Text,
    Button,
    IconButton,
    HStack
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { remove } from "firebase/database"

type propType = {
    currentFood: string & foodDetails
    removeFood: any
}

export default function SelecetedFoodRow({ currentFood, removeFood }: propType) {
    return (
        <HStack ml={'40px'}>
        <Grid templateColumns='repeat(9, 0fr)' h='50px'>
            <GridItem w='215px'>
                <Text
                    textColor={'white'}
                    mt={'15px'}
                    textAlign={'center'}
                    borderLeft={'1px'}
                >
                    {currentFood[1].name}
                </Text>
            </GridItem>
            <GridItem w='115px'>
                <Text
                    textColor={'white'}
                    mt={'15px'}
                    textAlign={'center'}
                    borderLeft={'1px'}
                >
                    {currentFood[1].calories} kcal

                </Text>
            </GridItem>
            <GridItem w='115px'>
                <Text
                    textColor={'white'}
                    mt={'15px'}
                    textAlign={'center'}
                    borderLeft={'1px'}
                >
                    {currentFood[1].fat} g
                </Text>
            </GridItem>
            <GridItem w='115px'>
                <Text
                    textColor={'white'}
                    mt={'15px'}
                    textAlign={'center'}
                    borderLeft={'1px'}
                >
                    {currentFood[1].saturatedFat} g
                </Text>
            </GridItem>
            <GridItem w='115px'>
                <Text
                    textColor={'white'}
                    mt={'15px'}
                    textAlign={'center'}
                    borderLeft={'1px'}
                >
                    {currentFood[1].carbohydrate} g
                </Text>
            </GridItem>
            <GridItem w='115px'>
                <Text
                    textColor={'white'}
                    mt={'15px'}
                    textAlign={'center'}
                    borderLeft={'1px'}
                >
                    {currentFood[1].sugar} g
                </Text>
            </GridItem>
            <GridItem w='115px'>
                <Text
                    textColor={'white'}
                    mt={'15px'}
                    textAlign={'center'}
                    borderLeft={'1px'}
                    borderRight={'1px'}
                >
                    {currentFood[1].protein} g
                </Text>
            </GridItem>
        </Grid>
            <GridItem>
                <IconButton
                    size={'sm'}
                    mt={'10px'}
                    aria-label='Delete'
                    _hover={{ bg: 'rgba(70, 70, 70, 0.81)' }}
                    bg={'none'}
                    textColor={'white'}
                    onClick={() => removeFood(currentFood[0])}
                    icon={<DeleteIcon />}
                />
            </GridItem>
        </HStack>
    )
}
