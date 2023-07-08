/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Center, Heading, IconButton, Input, Spacer, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import exerciseFetcher from "../../utils/exerciseFetcher.ts";
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    Text,
} from '@chakra-ui/react'
import { CurrentExercise } from "../Workouts/MakeNewWorkout.tsx";
import { ArrowBackIcon, CloseIcon } from "@chakra-ui/icons";


interface Exercise {
    [key: string]: string;
}

interface SelectedExercises {
    selectedExs: CurrentExercise[];
    setSelectedExs: any;
}

export default function FetchFromApi({ selectedExs, setSelectedExs }: SelectedExercises) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputedName, setInputedName] = useState('')
    const [fetchedExs, setFetchedExs] = useState([])
    const [stepTwo, setStepTwo] = useState(false)
    const [currentExercise, setCurrentExercise] = useState({})
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')


    const newExerciseSelect: CurrentExercise = {
        name: currentExercise.name,
        sets,
        reps
    }

    useEffect(() => {
        if (!inputedName) return setFetchedExs([])
        exerciseFetcher(inputedName).then((snapshot) => {
            setFetchedExs(snapshot);
        })
    }, [inputedName])

    const handleSelectEx = (exercise: Exercise) => {
        setCurrentExercise(exercise)
        setStepTwo(true)
    }

    const handleBack = () => {
        setStepTwo(false)
        setSets('')
        setReps('')
    }

    const handleSave = () => {
        selectedExs ? setSelectedExs([...selectedExs, newExerciseSelect]) : setSelectedExs([newExerciseSelect])
        setStepTwo(false)
        setInputedName('')
        setFetchedExs([])
        onClose()
    }

    const handleClose = () => {
        setStepTwo(false)
        setInputedName('')
        setFetchedExs([])
        onClose()
    }


    return (
        <Box pt={4} pb={2}>
            <Button onClick={onOpen} bg={'none'} textColor={'white'} colorScheme="blackAlpha">
                Add more exercises
            </Button>

            <Modal isOpen={isOpen} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent position={'relative'} textColor={'white'} bg="rgba(13, 13, 13, 1)">
                    <Center mt='6'>
                        {stepTwo ? (<IconButton ml={'3.5'} fontSize={'2xl'} onClick={handleBack} aria-label="goBack" background={'none'} _hover={{ bg: 'rgba(30, 30, 30, 0.81)' }} textColor={'white'} icon={<ArrowBackIcon />} > </IconButton>) : <Box w='40px' />}
                        <Spacer />
                        <Heading fontSize={'2xl'} textAlign={'center'}>{stepTwo ? currentExercise.name : 'Choose exercise'}</Heading>
                        <Spacer />
                        <IconButton mr={'3.5'} onClick={handleClose} aria-label="closeModal" bg='none' _hover={{ bg: 'rgba(30, 30, 30, 0.81)' }} textColor={'white'} icon={<CloseIcon />} > </IconButton>
                    </Center>
                    <ModalBody>
                        <>

                            {stepTwo ?
                                (<VStack w='full' justify={'center'}>
                                    <Box top={'3'} mt={6}>
                                        <Input
                                            width={'70px'}
                                            placeholder="sets"
                                            mr={2}
                                            textAlign={'center'}
                                            pb={1}
                                            onChange={(event) => setSets(event.target.value)}>
                                        </Input>
                                        <Input
                                            width={'70px'}
                                            placeholder="reps"
                                            ml={2}
                                            textAlign={'center'}
                                            pb={1}
                                            onChange={(event) => setReps(event.target.value)}>
                                        </Input>
                                    </Box>
                                    <Button bottom={'-7'} mb={4} onClick={handleSave} w={'30%'} colorScheme="green" >Save</Button>
                                </VStack>)
                                :
                                (
                                    <Box height={'420px'}>
                                        <Input
                                            onChange={(event) => setInputedName(event.target.value)}
                                            mb={'6'}
                                            mt={'5'}
                                        >
                                        </Input>
                                        {
                                            fetchedExs.map((exercise: Exercise) => (
                                                <>
                                                    <Center
                                                        onClick={() => handleSelectEx(exercise)}
                                                        p={'4px'}
                                                        rounded={'md'}
                                                        _hover={{
                                                            cursor: "pointer",
                                                            bg: 'gray.800'
                                                        }}
                                                        fontSize={18}
                                                    >
                                                        <Text>
                                                            {exercise.name}
                                                        </Text>
                                                    </Center>
                                                </>
                                            ))
                                        }

                                    </Box>
                                )}
                        </>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
