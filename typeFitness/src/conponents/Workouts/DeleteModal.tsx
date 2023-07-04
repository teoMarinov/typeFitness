import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react'
import { DeleteIcon } from "@chakra-ui/icons"
import editData from "../../utils/editData"

type PropType = {
    workoutId: string;
    workoutName: string;
    currentUser: string
}

export default function DeleteModal({ workoutId, workoutName, currentUser }: PropType) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleAcceptDelete = () => {
        editData(`workouts/${currentUser}/${workoutId}`, null)
        onClose()
    }

    return (
        <>
            <IconButton size={'sm'} aria-label='Delete' _hover={{ bg: 'gray.500' }} bg={'gray.300'} onClick={onOpen} icon={<DeleteIcon />} />

                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Are you sure you want to delete {workoutName} </ModalHeader>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={handleAcceptDelete}>
                                Delete
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </>
    )
}

