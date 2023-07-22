
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
    name: string
    editName: any
}


export default function DisplaySelectedFoodTopRow({ name,  editName }: propType) {
  return (
    <Grid templateColumns='repeat(9, 0fr)' mt={2}>
                <GridItem w='215px' >
                    <Input
                        border={'none'}
                        rounded={'sm'}
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => editName(e.target.value)}
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
                        textAlign={'center'}
                    >
                        protein
                    </Text>
                </GridItem>
            </Grid>
  )
}
