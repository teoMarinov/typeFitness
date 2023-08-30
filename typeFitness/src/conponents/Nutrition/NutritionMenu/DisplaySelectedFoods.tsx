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
import SelectedFoodRow from "./SelectedFoodRow"

export type weightsType = {
    [key:string]: string
}

type propType = {
    selectedFoods: (string & foodDetails)[]
    removeFood: any,
    changeFoodWeight:any
}

export default function DisplaySelectedFoods({  selectedFoods, removeFood, changeFoodWeight }: propType) {


    return (
        <>
            {selectedFoods.map((currenFood: string & foodDetails) => (
                <VStack key={currenFood[0]}>
                    <SelectedFoodRow currentFood={currenFood} removeFood={removeFood} changeFoodWeight={changeFoodWeight}/>
                </VStack>
            ))}
        </>
    )
}
