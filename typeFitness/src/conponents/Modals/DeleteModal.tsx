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
            <IconButton size={'sm'} aria-label='Delete' _hover={{ bg: 'rgba(30, 30, 30, 0.81)' }} bg={'none'} textColor={'white'} onClick={onOpen} icon={<DeleteIcon />} />

                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent textColor={'white'} bg="rgba(0, 0, 0, 0.9)">
                        <ModalHeader textAlign={'center'}>Are you sure you want to delete {workoutName} </ModalHeader>
                        <ModalFooter>
                            <Button colorScheme='green' mr={3} onClick={handleAcceptDelete}>
                                Delete
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </>
    )
}

