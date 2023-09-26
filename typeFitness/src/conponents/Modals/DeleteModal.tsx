/* eslint-disable @typescript-eslint/no-explicit-any */
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
    name: string;
    path: string
    unfocus: any
}

export default function DeleteModal({ name, path, unfocus }: PropType) {

    const { isOpen, onOpen, onClose } = useDisclosure()



    const handleAcceptDelete = () => {
        editData(path, null)
        onClose()
    }


    const handleClose = () => {
        onClose()
        unfocus(false)
    }

    return (
        <>
            <IconButton
                size={'sm'}
                aria-label='Delete'
                _hover={{ bg: 'rgba(30, 30, 30, 0.81)' }}
                bg={'none'}
                textColor={'white'}
                onClick={(e) => {
                    e.stopPropagation();
                    onOpen(); 
                }}
                icon={<DeleteIcon />}
            />
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent
                    textColor={'white'}
                    bg="rgba(15, 15, 15, 1)"
                >
                    <ModalHeader
                        textAlign={'center'}
                    >
                        Are you sure you want to delete {name}
                    </ModalHeader>
                    <ModalFooter>
                        <Button
                            colorScheme='green'
                            mr={3}
                            onClick={handleAcceptDelete}
                        >
                            Delete
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

