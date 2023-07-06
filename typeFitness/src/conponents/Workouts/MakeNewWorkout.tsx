import { Box, Stat, Center, Button, Input, VStack, Text, IconButton, HStack } from "@chakra-ui/react";
import { useState } from "react";
import FetchFromApi from "./FetchFromApi";
import addData from "../../utils/addData.ts";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CloseIcon, DeleteIcon } from '@chakra-ui/icons'
import image from "../../images/pexels-victor-freitas-841130.jpg"
export interface CurrentExercise {
    [key: string]: string;
}

interface ExerciseList {
    name: string
    exercises: string[]
}

export default function MakeNewWorkout() {

    const context = useContext(AuthContext)
    const currentUser = context.userData?.handle

    const [backgroundHeight, setbackgroundHeight] = useState("45vh")
    const [displayButton, setdisplayButton] = useState('block')
    const [boxDisplay, setBoxDisplay] = useState('none')
    const [boxOpacity, setBoxOpacity] = useState(false)

    const handleOpenNewWorkout = () => {
        setbackgroundHeight('65vh')
        setdisplayButton('none')
        setTimeout(() => {
            setBoxDisplay('block')
            setTimeout(() => {
                setBoxOpacity(true)
            }, 10)
        }, 100)
    }

    const handleCloseNewWorkout = () => {
        setbackgroundHeight('45vh')
        setBoxDisplay('none')
        setTimeout(() => {
            setdisplayButton('block')
        }, 125)
        setBoxOpacity(false)
    }


    const [selectedExs, setSelectedExs] = useState([])
    const [name, setName] = useState('')
    const exerciseList: ExerciseList = {
        name,
        exercises: selectedExs
    }

    const handleSave = () => {
        if (!exerciseList.name) return alert('Select name')
        if (exerciseList.exercises.length === 0) return alert('Select exercises')
        addData(`workouts/${currentUser}`, exerciseList)
        handleCloseNewWorkout()
    }


    const handleRemoveExerciseFromSelectedExs = (name: string) => {
        const editedList = selectedExs.filter(e => e.name !== name)
        setSelectedExs(editedList)
    }

    // console.log(selectedExs)
    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={"5"}
            width="100%"
            height={backgroundHeight}
            shadow={"xl"}
            backgroundImage={image}
            backgroundSize="cover"
            backgroundPosition="center"
            transition="height 0.25s ease"
            mb={'3'}
        >
            <Center
                height={'65vh'}
            >
                < Box
                    shadow={'xl'}
                    width="35%"
                    height={'500px'}
                    style={{ backdropFilter: "blur(10px)" }}
                    bg="rgba(0, 0, 0, 0.25)"
                    rounded={'xl'}
                    position={'relative'}
                    opacity={boxOpacity ? '100' : '0'}
                    display={boxDisplay}
                    transition="opacity 0.25s"
                >
                    <IconButton
                        size={'lg'}
                        aria-label='Edit'
                        bg={'none'} textColor={'white'} colorScheme="blackAlpha"
                        onClick={handleCloseNewWorkout}
                        position={'absolute'}
                        top={7}
                        right={10}
                        icon={<CloseIcon />} />
                    <Center>
                        <VStack>
                            <Input mb={8} textColor={'white'} placeholder="Enter workout name" focusBorderColor="white" onChange={(event) => setName(event.target.value)} position={'relative'} top={8} left={-15} width={'400px'} ></Input>
                            {selectedExs.map((exercise: CurrentExercise) => (
                                <HStack key={exercise.name} pt={4} textColor="white" position="relative">
                                    <Text fontSize="xl" flex="1">
                                        {exercise.name} - {exercise.sets} x {exercise.reps}
                                    </Text>
                                    <IconButton
                                        size="sm"
                                        aria-label="Edit"
                                        bg="none"
                                        textColor="white"
                                        colorScheme="blackAlpha"
                                        onClick={() => handleRemoveExerciseFromSelectedExs(exercise.name)}
                                        position="absolute"
                                        top={'4'}
                                        right={-9}
                                        icon={<DeleteIcon />}
                                    />
                                </HStack>
                            ))}

                            <FetchFromApi selectedExs={selectedExs} setSelectedExs={setSelectedExs} />
                            <Button position={'absolute'} bottom={5} onClick={handleSave} bg={'none'} textColor={'white'} colorScheme="blackAlpha" size={'lg'}>
                                Save
                            </Button>
                        </VStack>
                    </Center>
                </Box>
                <Button
                    display={displayButton}
                    bg="transparent"
                    textColor="white"
                    onClick={handleOpenNewWorkout}
                    _hover={{ bg: "rgba(0, 0, 0, 0.5)" }}
                    style={{
                        backdropFilter: "blur(2px)",
                    }}
                    mb={'20vh'}
                >
                    Make New Workout
                </Button>



            </Center >
        </Stat>
    )

}




