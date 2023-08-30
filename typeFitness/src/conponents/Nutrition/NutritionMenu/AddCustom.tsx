/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Grid,
    GridItem,
    Center,
    Input,
    Text,
    Spinner,
    Link,
    HStack
} from "@chakra-ui/react"
import GridRow from "./GridRow"
import { ACTION } from "../../Modals/AddFoodModal"


type propTypes = {
    state: any
    dispatch: any
}



export default function AddCustom({ state, dispatch }: propTypes) {


    const inputBoxLength = state.name.length > 5 ? `${state.name.length * 9}px` : '48px'




    const setCalories = (value: number) => {
        dispatch({ type: ACTION.CHANGE_CALORIES, payload: value })
    }

    const setFat = (value: number) => {
        dispatch({ type: ACTION.CHANGE_FAT, payload: value })
    }

    const setSaturatedFat = (value: number) => {
        dispatch({ type: ACTION.CHANGE_SATURATED_FAT, payload: value })
    }

    const setCarbohydrate = (value: number) => {
        dispatch({ type: ACTION.CHANGE_CARBOHYDRATE, payload: value })
    }

    const setSugar = (value: number) => {
        dispatch({ type: ACTION.CHANGE_SUGAR, payload: value })
    }

    const setProtein = (value: number) => {
        dispatch({ type: ACTION.CHANGE_PROTEIN, payload: value })
    }

    return (
        <>

            <Grid
                templateColumns='repeat(2, 1fr)'
                gap={2}
                mt={6}
            >
                <GridItem
                    colSpan={1}

                >
                    <Center
                        textColor='white'
                    >
                        <Input
                            p={0}
                            w={inputBoxLength}
                            maxW={'180px'}
                            color="white"
                            border={'none'}
                            rounded={'none'}
                            value={state.name}
                            borderBottom="2px solid rgba(195, 195, 195, 0.3)"
                            focusBorderColor="none"
                            _hover={{}}
                            textAlign={'center'}
                            placeholder="name"
                            onChange={(e) => dispatch({ type: ACTION.CHANGE_NAME, payload: e.target.value })}
                        />
                    </Center>
                </GridItem>
                <GridItem
                    colSpan={1}
                >
                    <Center
                        textColor='white'
                    >
                        <Input
                            p={0}
                            w={'29.2px'}
                            color="white"
                            border={'none'}
                            rounded={'none'}
                            borderBottom="2px solid rgba(195, 195, 195, 0.3)"
                            focusBorderColor="none"
                            value={'100'}
                            _hover={{
                                cursor: 'default'
                            }}
                            textAlign={'center'}
                        />
                        <Text
                            mt={'3px'}
                            pl={1}
                            pb={2}
                            borderBottom="2px solid rgba(195, 195, 195, 0.3)"
                            fontSize={'lg'}
                            _hover={{
                                cursor: 'default'
                            }}
                        >
                            g
                        </Text>
                    </Center>
                </GridItem>
            </Grid>

            <GridRow name={'calories'} value={state.calories} setValue={setCalories} mes="kcal" />
            <GridRow name={'fat'} value={state.fat} setValue={setFat} mes="g" />
            <GridRow name={'saturated fat'} value={state.saturatedFat} setValue={setSaturatedFat} mes="g" />
            <GridRow name={'carbohydrate'} value={state.carbohydrate} setValue={setCarbohydrate} mes="g" />
            <GridRow name={'sugar'} value={state.sugar} setValue={setSugar} mes="g" />
            <GridRow name={'protein'} value={state.protein} setValue={setProtein} mes="g" />
        </>
    )
}
