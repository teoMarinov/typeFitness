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
import DisplaySelectedFoodTopRow from "./DisplaySelectedFoodTopRow"


type propType = {
    selectedFoods: (string & foodDetails)[]
    removeFood: any
}

export default function DisplaySelectedFoods({  selectedFoods, removeFood }: propType) {


    return (
        <>
            {selectedFoods.map((currenFood: string & foodDetails) => (
                <VStack key={currenFood[0]}>
                    <SelecetedFoodRow currentFood={currenFood} removeFood={removeFood} />
                </VStack>
            ))}
        </>
    )
}
