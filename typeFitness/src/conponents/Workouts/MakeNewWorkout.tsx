import { AbsoluteCenter, Box, Center, Image, Button } from "@chakra-ui/react";
import bgImage from "../../images/pexels-victor-freitas-841130.jpg"

export default function MakeNewWorkout() {
    return (
        <Center
            width="100%"
            height="100%"
            bg={'blue.300'}
        >
            <Button bg={'blue.400'} colorScheme={"blue"}> Make New Workout</Button>
        </Center>
    )

}
