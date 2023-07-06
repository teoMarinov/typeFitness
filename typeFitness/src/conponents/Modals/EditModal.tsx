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
import { EditIcon } from "@chakra-ui/icons"
import { useState } from "react"
import editData from "../../utils/editData.ts"


type TypeProp = {
    name: string;
    id: string;
    workout: TypeExercise[];
    currentUser: string
}
export default function EditModal({ name, id, workout, currentUser }: TypeProp) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editedVals, setEditedVals] = useState(workout)
    const [newName, setNewName] = useState(name)


    const handleChange = (index: number, key: string, newVal: string) => {
        const updatedExercise = { ...editedVals[index], [key]: newVal };
        const updatedVals = [...editedVals];
        updatedVals[index] = updatedExercise;
        setEditedVals(updatedVals);
    };

    const handleSaveChanges = () => {
        if (name !== newName) editData(`workouts/${currentUser}/${id}/name`, newName)
        editedVals.map((exercise: TypeExercise, index: number) => {
            if (exercise.reps !== workout[index].reps) editData(`workouts/${currentUser}/${id}/exercises/${index}/reps`, exercise.reps)
            if (exercise.sets !== workout[index].sets) editData(`workouts/${currentUser}/${id}/exercises/${index}/sets`, exercise.sets)
        })
        onClose()
    }


    return (
        <>

            <IconButton size={'sm'} aria-label='Edit' _hover={{ bg: 'gray.200' }} bg={'gray.50'} onClick={onOpen} icon={<EditIcon />} />
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size='460px'>
                <ModalOverlay />
                <ModalContent h='52vh' width={'460px'}>
                    <ModalBody pb={6} >
                        <VStack >
                            <Input textAlign={'center'} fontWeight={'bold'} size={'lg'} fontSize={'4xl'} p={0} value={newName} mt={'1'} w={'full'} onChange={(e) => setNewName(e.target.value)} mr={1}></Input>
                            <Center h='35vh'>
                                <VStack>
                                    {workout.map((_, index: number) => (
                                        <Grid templateColumns='repeat(10, 1fr)' gap={2}>
                                            <GridItem colSpan={8} >
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
                                </VStack>
                            </Center>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={handleSaveChanges}>
                            Save
                        </Button>
                        <Button onClick={() => {
                            setEditedVals(workout)
                            setNewName(name)
                            onClose()
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

