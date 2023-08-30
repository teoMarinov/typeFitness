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
import { useState, useEffect } from "react"
import foodFetcher from "../../../utils/foodFetcher"
import { ACTION } from "../../Modals/AddFoodModal"

type propTypes = {
    moveToAddCustom: any
    state: any
    dispatch: any
}



export default function SearchFromApi({ moveToAddCustom, state, dispatch }: propTypes) {

    const [nameInput, setNameInput] = useState('')
    const [loading, setLoading] = useState(false)

    const inputBoxLength = state.name.length > 5 ? `${state.name.length * 9}px` : '48px'

    const handleMoveToAddCustom = () => {
        moveToAddCustom()
        dispatch({ type: ACTION.CHANGE_NAME, payload: nameInput })
    }


    useEffect(() => {
        dispatch({ type: ACTION.RESET_STATE })
        setLoading(true)
        foodFetcher(nameInput)
            .then((snapshot) => {
                dispatch({ type: ACTION.CHANGE_NAME, payload: (snapshot[0].name) })
                dispatch({ type: ACTION.CHANGE_CALORIES, payload: (snapshot[0].calories) })
                dispatch({ type: ACTION.CHANGE_FAT, payload: (snapshot[0].fat_total_g) })
                dispatch({ type: ACTION.CHANGE_SATURATED_FAT, payload: (snapshot[0].fat_saturated_g) })
                dispatch({ type: ACTION.CHANGE_CARBOHYDRATE, payload: (snapshot[0].carbohydrates_total_g) })
                dispatch({ type: ACTION.CHANGE_SUGAR, payload: (snapshot[0].sugar_g) })
                dispatch({ type: ACTION.CHANGE_PROTEIN, payload: (snapshot[0].protein_g) })
                console.log(typeof snapshot[0].calories)
            })
            .then(() => {
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
            })
    }, [nameInput]);

    const setCalories = (value: string) => {
        dispatch({ type: ACTION.CHANGE_CALORIES, payload: value })
    }

    const setFat = (value: string) => {
        dispatch({ type: ACTION.CHANGE_FAT, payload: value })
    }

    const setSaturatedFat = (value: string) => {
        dispatch({ type: ACTION.CHANGE_SATURATED_FAT, payload: value })
    }

    const setCarbohydrate = (value: string) => {
        dispatch({ type: ACTION.CHANGE_CARBOHYDRATE, payload: value })
    }

    const setSugar = (value: string) => {
        dispatch({ type: ACTION.CHANGE_SUGAR, payload: value })
    }

    const setProtein = (value: string) => {
        dispatch({ type: ACTION.CHANGE_PROTEIN, payload: value })
    }

    return (
        <>
            <Center textColor={'white'}>
                <Input
                    mt={4}
                    p={0}
                    textAlign={'center'}
                    color="white"
                    onChange={(e) => setNameInput(e.target.value)}
                />
            </Center>
            {nameInput && (loading ? (
                <Center
                >
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' />
                </Center>
            ) :

                // (dataReady ? (
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
                                    defaultValue={'100'}
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
                // ) : (
                //     <Text
                //         textAlign={'center'}
                //         textColor={'white'}
                //     >
                //         We are sorry, but we can't find any data for {nameInput}
                //         <Link
                //             textColor={'cyan.400'}
                //             ml={2}
                //             onClick={handleMoveToAddCustom}
                //         >
                //             Please use Add custom.
                //         </Link>
                //     </Text>
                // )

                // )
            )
            }

        </>
    )
}
