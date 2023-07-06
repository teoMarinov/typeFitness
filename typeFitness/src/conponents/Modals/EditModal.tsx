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
    update: number
    setUpdate: any 
}
export default function EditModal({update, setUpdate, name, id, workout, currentUser }: TypeProp) {

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
        setUpdate(update + 1)
        onClose()
    }


    return (
        <>

            <IconButton size={'sm'} aria-label='Edit' _hover={{ bg: 'rgba(30, 30, 30, 0.81)' }} bg={'none'} textColor={'white'} onClick={onOpen} icon={<EditIcon />} />
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size='460px'>
                <ModalOverlay />
                <ModalContent h='52vh' width={'460px'} textColor={'white'} bg="rgba(0, 0, 0, 0.9)" position={'relative'}>
                    <ModalBody pb={6} >
                        <VStack >
                            <Input
                                p={0}
                                mr={1} 
                                top={5}
                                w={'85%'}
                                size={'lg'}
                                fontSize={'4xl'}
                                value={newName}
                                fontWeight={'bold'}
                                textAlign={'center'}
                                position={'absolute'}
                                onChange={(e) => setNewName(e.target.value)}
                                />
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

