import { foodDetails } from "./Nutrition"
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import DeleteModal from "../Modals/DeleteModal"


type foodType = {
    food: (string & foodDetails)[]
    currentUser: string
}

export default function FoodDetailBox({ food, currentUser }: foodType) {

    const [toggleDetails, setToggleDetails] = useState(false)

    return (
        <Center
            onMouseOver={() => {
                setToggleDetails(true)
            }}
            onMouseLeave={() => {
                setToggleDetails(false)
            }}
            height='300px'
            width='220px'
            bg="rgba(20, 20, 20, 0.3)"
            style={{
                backdropFilter: "blur(6px)",
            }}
            textAlign="center"
            _hover={{
                cursor: "pointer",
                bg: "rgba(0, 0, 0, 0.6)",

            }}
            rounded={'xl'}
            boxShadow="0 0 8px 1px white"
            position={'relative'}
        >

            <VStack
                position={'relative'}
                w={'full'}
                h={'100%'}
                textAlign={'center'}
                justifyContent={'center'}
            >


            </VStack>
            <Box
                pos={'absolute'}
                top={0}
                right={0}
                opacity={toggleDetails ? '100' : '0'}
                transition="opacity 0.1s linear"
            >
                <DeleteModal
                    name={food[1].name}
                    path={`nutrition/${currentUser}/foods/${food[0]}`}
                    unfocus={setToggleDetails} />
            </Box>

            <Heading
                p={4}
                maxW={'90%'}
                display="block"
                textColor={'white'}
                position={'absolute'}
                opacity={toggleDetails ? '0' : '100'}
                transition="opacity 0.1s linear"
            >
                {food[1].name}
            </Heading>

            <VStack
                px={4}
                textColor={'white'}
                opacity={toggleDetails ? '100' : '0'}
                position={'absolute'}
                transition="opacity 0.1s linear"
                fontSize={'md'}
            >
                <Text>calories: {food[1].calories} kcal</Text>
                <Text>fats: {food[1].fat} g</Text>
                <Text>saturated fats: {food[1].saturatedFat} g</Text>
                <Text>carbohydrates fats: {food[1].carbohydrate} g</Text>
                <Text>sugar: {food[1].sugar} g</Text>
                <Text>protein: {food[1].protein} g</Text>
            </VStack>

        </Center >
    )
}
