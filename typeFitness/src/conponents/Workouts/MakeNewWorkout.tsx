import { Box, Stat, useColorModeValue, Center, Button, Input, VStack, Text, Heading } from "@chakra-ui/react";
import { useState } from "react";
import FetchFromApi from "./FetchFromApi";
import addData from "../../utils/addData.ts";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
    const [toggleWorkoutMaker, setToggleWorkoutMaker] = useState(false)

    const toggleNewWorkout = () => {
        if (backgroundHeight === "45vh") setbackgroundHeight('65vh')
        else setbackgroundHeight('45vh')
        setToggleWorkoutMaker(!toggleWorkoutMaker)
        setSelectedExs([])
        setName('')
    }

    const [selectedExs, setSelectedExs] = useState([])
    const [name, setName] = useState('')
    const exerciseList: ExerciseList = {
        name: name.replace(/\s+/g, "_"),
        exercises: selectedExs
    }

    const handleSave = () => {
        addData(`workouts/${currentUser}`, exerciseList)
        toggleNewWorkout()
    }

    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={'5'}
            width="100%"
            height={backgroundHeight}
            bg={'blue.300'}
            shadow={'xl'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
        >
            <Center
                height={backgroundHeight}
            >
                {toggleWorkoutMaker ?
                    (< Box width={"30%"} height={'500px'} bg={'white'} position={'relative'}>
                        <Button bg={'transparent'} textColor={'red.600'} fontWeight={'bold'} colorScheme={"blue"} onClick={toggleNewWorkout} position={'absolute'} top={2} right={0}>
                        <Heading textColor={'red.600'} fontWeight={'bold'} size={'lg'}>X</Heading>
                        </Button>
                        <Center>
                            <VStack>
                                <Input placeholder="Enter workout name" onChange={(event) => setName(event.target.value)} position={'relative'} top={2} left={-15} width={'400px'} ></Input>
                                {selectedExs.map((exercise: CurrentExercise) => (
                                    <Text key={exercise.name}>{exercise.name} - {exercise.sets} x {exercise.reps}</Text>
                                ))}
                                <FetchFromApi selectedExs={selectedExs} setSelectedExs={setSelectedExs}/>
                                <Button onClick={handleSave} bg={'white'}>Save</Button>
                            </VStack>
                        </Center>
                    </Box>)
                    :
                    (<Button bg={'blue.400'} colorScheme={"blue"} onClick={toggleNewWorkout}>
                        Make New Workout
                    </Button>
                    )
                }
            </Center >
        </Stat>
    )

}




