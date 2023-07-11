import { TypeExercise } from "../Workouts/ListWorkouts.tsx"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    Text,
    useDisclosure,
    IconButton,
    Input,
    VStack,
    Center,
    Grid,
    GridItem
} from '@chakra-ui/react'
import { DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"
import FetchFromApi from "./FetchFromApiModal.tsx"
import addData from "../../utils/addData.ts"

type TypeProp = {
    currentUser: string
    update: number
    setUpdate: any

}

type ExerciseList = {
    name: string
    exercises: TypeExercise[]
}




export default function MakeNewWorkoutModal({ update, setUpdate, currentUser }: TypeProp) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editedVals, setEditedVals] = useState([])
    const [newName, setNewName] = useState('')
    const [indexesToDelete, setIndexesToDelete] = useState([])


    const handleChange = (index: number, key: string, newVal: string) => {
        const updatedExercise = { ...editedVals[index], [key]: newVal };
        const updatedVals = [...editedVals];
        updatedVals[index] = updatedExercise;
        setEditedVals(updatedVals);
    };

    const exerciseList: ExerciseList = {
        name: newName,
        exercises: editedVals
    }
    const handleAddNewWorkout = () => {
        if (!newName) return alert('Must enter a valid name')
        addData(`workouts/${currentUser}`, exerciseList)
        setUpdate(update + 1)
        onClose()
        console.log(exerciseList)
    }

    const handleRemoveExerciseFromSelectedExs = (name: string, index: number) => {
        const editedList = editedVals.filter(e => e.name !== name)
        setEditedVals(editedList)
        setIndexesToDelete([...indexesToDelete, index])

    }

    const handleCancel = () => {
        setEditedVals([])
        setNewName('')
        setIndexesToDelete([])
        onClose()
    }

    return (
        <>
            <Center
                style={{backdropFilter: "blur(6px)"}}
                w={'450px'}
                h={'50vh'}
                bg="rgba(10, 10, 10, 0.3)"
                boxShadow="0 0 8px 1px white"
                rounded={'xl'}
                onClick={onOpen}
                _hover={{
                    cursor: 'pointer',
                    bg: "rgba(0, 0, 0, 0.6)",
                    width: '460px',
                    height: '52vh',
                    '& > *': {
                        width: '90px',
                        height: '90px',
                    },
                    '* > *': {
                        fontSize: '80px',
                    }
                }} transition="height 0.1s ease, width 0.1s ease"
            >
                <Center
                    w={'70px'}
                    h={'70px'}
                    borderRadius="90px"
                    border={'2px'}
                    transition="height 0.15s ease, width 0.15s ease"
                    borderColor={'white'}

                >
                    <Text
                        textColor={'white'}
                        mb={4}
                        transition="font-size 0.1s"
                        fontSize={60}
                    >
                        +
                    </Text>
                </Center>
            </Center>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size='460px'>
                <ModalOverlay />
                <ModalContent
                    h='52vh'
                    width={'460px'}
                    textColor={'white'}
                    bg="rgba(0, 0, 0, 0.9)"
                    position={'relative'}
                >
                    <ModalBody pb={6} >
                        <VStack >
                            <Input
                                p={2}
                                mr={1}
                                top={5}
                                w={'85%'}
                                size={'lg'}
                                fontWeight={'bold'}
                                textAlign={'center'}
                                position={'absolute'}
                                placeholder="Enter workout name"
                                _placeholder={{
                                    color: "rgba(255, 255, 255, 0.3)",
                                    fontSize: '20',
                                    justifySelf: 'center'
                                }}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <Center w='90%' position={'absolute'} top={"15%"} >
                                <VStack mt={'3'}>
                                    {editedVals.map((exercise: TypeExercise, index: number) => (
                                        <Grid templateColumns='repeat(12, 1fr)' gap={2}>
                                            <GridItem colSpan={1} >
                                                <IconButton
                                                    size="sm"
                                                    aria-label="Edit"
                                                    _hover={{ bg: "red.500" }}
                                                    textColor="white"
                                                    colorScheme="blackAlpha"
                                                    onClick={() => handleRemoveExerciseFromSelectedExs(exercise.name, index)}
                                                    top={'1'}
                                                    right={0}
                                                    icon={<DeleteIcon />}
                                                />
                                            </GridItem>

                                            <GridItem colSpan={9} >
                                                <Center h='40px'>
                                                    <Text
                                                        textAlign={'center'}
                                                        justifySelf={'center'}
                                                        mr={1}
                                                        mt={0.5}
                                                        fontSize='18'>
                                                        {editedVals[index].name}
                                                    </Text>
                                                </Center>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <Input
                                                    p={0}
                                                    w={'40px'}
                                                    fontSize='18'
                                                    textAlign={'center'}
                                                    value={editedVals[index].sets}
                                                    onChange={(e) => handleChange(index, 'sets', e.target.value)}>
                                                </Input>
                                            </GridItem >
                                            <GridItem colSpan={1}>
                                                <Input
                                                    p={0}
                                                    w={'40px'}
                                                    fontSize='18'
                                                    textAlign={'center'}
                                                    value={editedVals[index].reps}
                                                    onChange={(e) => handleChange(index, 'reps', e.target.value)}>
                                                </Input>
                                            </GridItem>
                                        </Grid>
                                    ))}
                                    <FetchFromApi selectedExs={editedVals} setSelectedExs={setEditedVals} />
                                </VStack>
                            </Center>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='green'
                            mr={3}
                            onClick={handleAddNewWorkout}
                        >
                            Save
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
