import { TypeExercise } from "./ListWorkouts"
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
    Flex,
    Input,
    VStack
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
    }


    return (
        <>

            <IconButton size={'sm'} aria-label='Edit' _hover={{ bg: 'gray.500' }} bg={'gray.300'} onClick={onOpen} icon={<EditIcon />} />

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody pb={6}>
                        <VStack w='full'>
                            <Input border={'none'} textAlign={'center'} fontWeight={'bold'} size={'lg'} p={0} value={newName} w={'full'} onChange={(e) => setNewName(e.target.value)} mr={1}></Input>
                            {workout.map((exercise: TypeExercise, index: number) => (
                                <Flex key={exercise.name + index}>
                                    <Text mr={1} mt={2}>{editedVals[index].name} </Text>
                                    <Input border={'none'} textAlign={'center'} p={0} value={editedVals[index].sets} w={'40px'} onChange={(e) => handleChange(index, 'sets', e.target.value)} mr={1}></Input>
                                    <Input border={'none'} p={0} value={editedVals[index].reps} w={'40px'} onChange={(e) => handleChange(index, 'reps', e.target.value)}></Input>
                                </Flex>
                            ))}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSaveChanges}>
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

