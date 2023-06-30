import { Box, List, Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
const NavBar = () => {
    return (
        <List color='white' fontSize={'1.2em'} bgColor={'purple.300'}>
                <NavLink to="/home">
                    <Text>Home</Text>
                </NavLink>
                <NavLink to="/workouts">
                    <Text>Workouts</Text>
                </NavLink>
                <NavLink to="/nutrition"
                ><Text>Nutrition</Text>
                </NavLink>
                <NavLink to="/profile">
                    <Text>Profile</Text>
                </NavLink>
        </List>
    )
}
export default NavBar