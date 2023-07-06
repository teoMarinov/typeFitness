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
    GridItem,
    Box
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"
import editData from "../../utils/editData.ts"
import FetchFromApi from "./FetchFromApiModal.tsx"
import addData from "../../utils/addData.ts"

type TypeProp = {
    name: string;
    id: string;
    workout: TypeExercise[] | [];
    currentUser: string
    update: number
    setUpdate: any
    unfocus: any
    existingWorkout: boolean
}

type ExerciseList = {
    name: string
    exercises: TypeExercise[]
}

export default function EditModal({
    update,
    setUpdate,
    name, id,
    workout,
    currentUser,
    unfocus,
    existingWorkout
}: TypeProp) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editedVals, setEditedVals] = useState(workout)
    const [newName, setNewName] = useState(name)
    const [indexesToDelete, setIndexesToDelete] = useState([])


    const handleChange = (index: number, key: string, newVal: string) => {
        const updatedExercise = { ...editedVals[index], [key]: newVal };
        const updatedVals = [...editedVals];
        updatedVals[index] = updatedExercise;
        setEditedVals(updatedVals);
    };

    const handleSaveChanges = () => {
        if (name !== newName) editData(`workouts/${currentUser}/${id}/name`, newName)
        editedVals.map((exercise: TypeExercise, index: number) => {
            if (exercise.reps !== workout[index]?.reps) editData(`workouts/${currentUser}/${id}/exercises/${index}/reps`, exercise.reps)
            if (exercise.sets !== workout[index]?.sets) editData(`workouts/${currentUser}/${id}/exercises/${index}/sets`, exercise.sets)
            if (!workout[index]) editData(`workouts/${currentUser}/${id}/exercises/${index}/name`, exercise.name)
        })
        indexesToDelete.map((currentIndex: number) => {
            editData(`workouts/${currentUser}/${id}/exercises/${currentIndex}`, null)
        })
        setUpdate(update + 1)
        onClose()
    }

    const exerciseList: ExerciseList = {
        name: newName,
        exercises: editedVals
    }
    const handleAddNewWorkout = () => {
        if (!newName) return alert('Must enter a valid name')
        addData(`workouts/${currentUser}`, exerciseList)
        setUpdate(update + 1)
        onClose()
    }

    const handleRemoveExerciseFromSelectedExs = (name: string, index: number) => {
        const editedList = editedVals.filter(e => e.name !== name)
        setEditedVals(editedList)
        setIndexesToDelete([...indexesToDelete, index])

    }

    return (
        <>

            {existingWorkout ? (
                <IconButton
                    size={'sm'}
                    aria-label='Edit'
                    _hover={{ bg: 'rgba(30, 30, 30, 0.81)' }}
                    bg={'none'}
                    textColor={'white'}
                    onClick={onOpen}
                    icon={<EditIcon />}
                />
            )
                :
                (
                    <Center
                        w={'100%'}
                        h={'100%'}
                        onClick={onOpen}
                        _hover={{
                            cursor: 'pointer',
                            '& > *': {
                                width: '90px',
                                height: '90px',
                            },
                            '* > *': {
                                fontSize: '80px',
                              }
                          }}
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
                )}
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
                                value={newName}
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
                            onClick={existingWorkout ? handleSaveChanges : handleAddNewWorkout}
                        >
                            Save
                        </Button>
                        <Button onClick={() => {
                            unfocus(false)
                            setEditedVals(workout)
                            setNewName(name)
                            setIndexesToDelete([])
                            onClose()
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

