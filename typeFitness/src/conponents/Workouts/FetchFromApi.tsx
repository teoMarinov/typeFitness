import { Box, Center, Heading, Input, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import exerciseFetcher from "../../utils/exerciseFetcher.ts";
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from '@chakra-ui/react'
import { CurrentExercise } from "./MakeNewWorkout.tsx";



interface Exercise {
    [key: string]: string;
}

interface SelectedExercises {
    selectedExs: CurrentExercise[];
    setSelectedExs: React.Dispatch<React.SetStateAction<CurrentExercise[]>>;
}

export default function FetchFromApi({ selectedExs, setSelectedExs }: SelectedExercises) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputedName, setInputedName] = useState('')
    const [fetchedExs, setFetchedExs] = useState([])
    const [stepTwo, setStepTwo] = useState(false)
    const [currentExercise, setCurrentExercise] = useState({})
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')

    const newExerciseSelect: NewExerciseSelect = {
        name: currentExercise.name,
        sets,
        reps
    }

    useEffect(() => {
        inputedName &&
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
        setSelectedExs([...selectedExs, newExerciseSelect])
        setStepTwo(false)
        setInputedName('')
        setFetchedExs([])
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen} bg='white'>Add more exercises</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Choose exercise</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <>

                            {stepTwo ?
                                (<VStack w='full' bg='red.200' >
                                    <Button onClick={handleBack} mr={'360px'}>{'<'}</Button>
                                    <Heading textAlign={'center'} size={'sm'}>{currentExercise.name}</Heading>
                                    {currentExercise.name}
                                    <Box>
                                        <Input width={'70px'} placeholder="sets" mr={2} onChange={(event) => setSets(event.target.value)}></Input>
                                        <Input width={'70px'} placeholder="reps" ml={2} onChange={(event) => setReps(event.target.value)}></Input>
                                    </Box>
                                    <Button onClick={handleSave}>Save</Button>
                                </VStack>)
                                :
                                (<>
                                    <Input onChange={(event) => setInputedName(event.target.value)}></Input>
                                    {
                                        fetchedExs.map((exercise: Exercise) => (
                                            <>
                                                <Center onClick={() => handleSelectEx(exercise)}>
                                                    <Text >
                                                        {exercise.name}
                                                    </Text>
                                                </Center>
                                            </>
                                        ))
                                    }

                                </>
                                )}
                        </>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
