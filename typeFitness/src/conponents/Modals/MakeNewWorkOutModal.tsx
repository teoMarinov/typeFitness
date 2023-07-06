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
import { useState } from "react"
import FetchFromApi from './FetchFromApiModal';



export interface CurrentExercise {
    [key: string]: string;
}

interface ExerciseList {
    name: string
    exercises: string[]
}

type propType = {
    update: number,
    setUpdate: any
}
export default function MakeNewWorkOutModal({ update, setUpdate }: propType) {

    const [toggleDetails, setToggleDetails] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            <Center
                onMouseOver={() => {
                    setToggleDetails(true)
                }}
                onMouseLeave={() => {
                    setToggleDetails(false)
                }}
                h={toggleDetails ? ('52vh') : ('50vh')}
                w={toggleDetails ? ('460px') : ('450px')}
                bg="rgba(0, 0, 0, 0.3)"
                style={{
                    backdropFilter: "blur(6px)",
                }}
                textAlign="center"
                _hover={{
                    cursor: "pointer",
                    bg: "rgba(0, 0, 0, 0.6)"

                }}
                transition="height 0.15s ease, width 0.15s ease"
                rounded={'xl'}
                position={'relative'}
                onClick={onOpen}
            >
                <Center
                    w={toggleDetails ? '90px' : '70px'}
                    h={toggleDetails ? '90px' : '70px'}
                    borderRadius="90px"
                    border={'2px'}
                    transition="height 0.15s ease, width 0.15s ease"
                    borderColor={'white'}
                >
                    <Text
                        textColor={'white'}
                        mb={4}
                        transition="font-size 0.1s"
                        fontSize={toggleDetails ? 80 : 60}
                    >
                        +
                    </Text>
                </Center>
            </Center >

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size='460px'>
                <ModalOverlay />
                <ModalContent h='52vh' width={'460px'} textColor={'white'} bg="rgba(15, 15, 15, 1)" position={'relative'}>
                    <ModalBody pb={6} >
                        <VStack >
                            <Input
                                pb={1}
                                mr={1}
                                top={5}
                                w={'85%'}
                                size={'lg'}
                                fontSize={'4xl'}
                                // value={newName}
                                fontWeight={'bold'}
                                textAlign={'center'}
                                position={'absolute'}
                                // onChange={(e) => setNewName(e.target.value)}
                            />
                            <Center h='35vh'>
                                <VStack>
                                    {/* {workout.map((_, index: number) => (
                                        <Grid templateColumns='repeat(10, 1fr)' gap={2} mb={1}>
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
                                                    // value={editedVals[index].sets}
                                                    // onChange={(e) => handleChange(index, 'sets', e.target.value)}
                                                    >
                                                </Input>
                                            </GridItem >
                                            <GridItem colSpan={1}>
                                                <Input
                                                    p={0}
                                                    w={'40px'}
                                                    fontSize='18'
                                                    textAlign={'center'}
                                                    // value={editedVals[index].reps}
                                                    // onChange={(e) => handleChange(index, 'reps', e.target.value)}
                                                    >
                                                </Input>
                                            </GridItem>
                                        </Grid>
                                    ))} */}
                                    <FetchFromApi />
                                </VStack>
                            </Center>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} 
                        // onClick={handleSaveChanges}
                        >
                            Save
                        </Button>
                        <Button onClick={() => {
                            // setEditedVals(workout)
                            // setNewName(name)
                            onClose()
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></>
    );
}