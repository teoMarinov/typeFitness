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
    unfocus: any
}


export default function EditModal({
    name, 
    id,
    workout,
    currentUser,
    unfocus
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
        if (workout) {
            editedVals.map((exercise: TypeExercise, index: number) => {
                if (exercise.reps !== workout[index]?.reps) editData(`workouts/${currentUser}/${id}/exercises/${index}/reps`, exercise.reps)
                if (exercise.sets !== workout[index]?.sets) editData(`workouts/${currentUser}/${id}/exercises/${index}/sets`, exercise.sets)
                if (!workout[index]) editData(`workouts/${currentUser}/${id}/exercises/${index}/name`, exercise.name)
            })   
        } else {
            addData(`workouts/${currentUser}/${id}/exercises`, editedVals)
        }
            editData(`workouts/${currentUser}/${id}/exercises`, editedVals)
        onClose()
    }


    const handleRemoveExerciseFromSelectedExs = (name: string, index: number) => {
        const editedList = editedVals.filter(e => e.name !== name)
        setEditedVals(editedList)
        setIndexesToDelete([...indexesToDelete, index])

    }

    const handleCancel = () => {
        unfocus(false)
        setEditedVals(workout)
        setNewName(name)
        setIndexesToDelete([])
        onClose()
    }

    return (
        <>


            <IconButton
                size={'sm'}
                aria-label='Edit'
                _hover={{ bg: 'rgba(30, 30, 30, 0.81)' }}
                bg={'none'}
                textColor={'white'}
                onClick={onOpen}
                icon={<EditIcon />}
            />
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size='460px'>
                <ModalOverlay />
                <ModalContent
                    h='52vh'
                    width={'460px'}
                    textColor={'white'}
                    bg="rgba(20, 20, 20, 0.9)"
                    position={'relative'}
                >
                    <ModalBody 
                    pb={6} 
                    overflow={'auto'}
                    >
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
                                    {editedVals && (editedVals.map((exercise: TypeExercise, index: number) => (
                                        <Grid templateColumns='repeat(12, 1fr)' gap={2} key={index}>
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
                                    )))}
                                    <FetchFromApi selectedExs={editedVals} setSelectedExs={setEditedVals} />
                                </VStack>
                            </Center>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='green'
                            mr={3}
                            onClick={handleSaveChanges}
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

