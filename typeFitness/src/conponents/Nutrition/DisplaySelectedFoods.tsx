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

export type weightsType = {
    [key:string]: string
}

type propType = {
    selectedFoods: (string & foodDetails)[]
    removeFood: any,
    weights: weightsType,
    changeWeights: any
}

export default function DisplaySelectedFoods({  selectedFoods, removeFood, weights, changeWeights }: propType) {


    return (
        <>
            {selectedFoods.map((currenFood: string & foodDetails) => (
                <VStack key={currenFood[0]}>
                    <SelecetedFoodRow currentFood={currenFood} removeFood={removeFood} weights={weights[currenFood[0]]}  changeWeights={changeWeights}/>
                </VStack>
            ))}
        </>
    )
}
