import { foodDetails } from "./Nutrition"
import {
    Center,
    Grid,
    GridItem,
    Box,
    Input,
    Text,
    VStack
} from "@chakra-ui/react"
import SelecetedFoodRow from "./SelecetedFoodRow"


type propType = {
    selectedFoods: (string & foodDetails)[]
    removeFood: any
}

export default function DisplaySelectedFoods({ selectedFoods, removeFood }: propType) {


    return (
        <VStack gap={0} w={'90%'} ml={'5%'} bg={'rgba(0,0,0, 0.6)'} rounded={'md'} mb={20}>
            <Grid templateColumns='repeat(9, 0fr)'>
                <GridItem w='215px' >
                    <Input
                        border={'none'}
                        rounded={'none'}
                        placeholder="Enter name"
                        textColor={'white'}
                        textAlign={'center'}
                    />
                </GridItem>
                <GridItem w='115px'>
                    <Text
                        textColor={'white'}
                        mt={'6.6px'}
                        borderLeft={'1px'}
                        textAlign={'center'}
                    >
                        calories
                    </Text>
                </GridItem>
                <GridItem w='115px'>
                    <Text
                        textColor={'white'}
                        mt={'6.6px'}
                        borderLeft={'1px'}
                        textAlign={'center'}
                    >
                        fat
                    </Text>
                </GridItem>
                <GridItem w='115px'>
                    <Text
                        textColor={'white'}
                        mt={'6.6px'}
                        borderLeft={'1px'}
                        textAlign={'center'}
                    >
                        saturated fat
                    </Text>
                </GridItem>
                <GridItem w='115px'>
                    <Text
                        textColor={'white'}
                        mt={'6.6px'}
                        borderLeft={'1px'}
                        textAlign={'center'}
                    >
                        carbohydrate
                    </Text>
                </GridItem>
                <GridItem w='115px'>
                    <Text
                        textColor={'white'}
                        mt={'6.6px'}
                        borderLeft={'1px'}
                        textAlign={'center'}
                    >
                        sugar
                    </Text>
                </GridItem>
                <GridItem w='115px'>
                    <Text
                        textColor={'white'}
                        mt={'6.6px'}
                        borderLeft={'1px'}
                        borderRight={'1px'}
                        textAlign={'center'}
                    >
                        protein
                    </Text>
                </GridItem>
                
            </Grid>
            {selectedFoods.map((currenFood: string & foodDetails) => (
                <VStack key={currenFood[0]}>
                    <SelecetedFoodRow currentFood={currenFood} removeFood={removeFood}/>
                </VStack>
            ))}
        </VStack >
    )
}
