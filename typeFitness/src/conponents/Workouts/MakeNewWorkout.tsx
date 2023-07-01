import {
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Center, Button
} from "@chakra-ui/react";
import { useState } from "react";

export default function MakeNewWorkout() {

    const [backgroundHeight, setbackgroundHeight] = useState("45vh")
    const [toggleWorkoutMaker, setToggleWorkoutMaker] = useState(false)

    const toggleNewWorkout = () => {
        if (backgroundHeight === "45vh") setbackgroundHeight('65vh')
        else setbackgroundHeight('45vh')
        setToggleWorkoutMaker(!toggleWorkoutMaker)
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
                    (< Box width={"30%"} height={'500px'} bg={'white'}>
                        <Button bg={'red.400'} colorScheme={"blue"} onClick={toggleNewWorkout} ml={'92%'}>
                            X
                        </Button>
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




