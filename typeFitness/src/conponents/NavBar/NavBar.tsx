import { AbsoluteCenter, Center, Flex, List, Box, Spacer } from "@chakra-ui/react"
import { BiHomeAlt } from "react-icons/bi"
import { CiDumbbell } from "react-icons/ci"
import { GiChickenLeg } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import ListItems from "./ListItems"

const NavBar = () => {
    return (
        <Flex >
            <Center minHeight={'5vh'}>
                <List color='white' spacing={'10%'} w={'100px'} m={6} >
                    <Box pos={'fixed'}>
                        <ListItems pathTo="/" text="Home" />
                        <ListItems pathTo="/workouts" text="Workouts" />
                        <ListItems pathTo="/logger" text="Logger" />
                        <ListItems pathTo="/nutrition" text="Nutrition" />
                        <Box h='70vh'></Box>
                        <ListItems pathTo="/profile" icon={CgProfile} text="Profile" />
                    </Box>
                </List>
            </Center>
        </Flex>
    )
}
export default NavBar