import {
  Center,
  Flex,
  List,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import ListItems from "./ListItems";
import Logout from "../Logout/Logout";

type propType = {
  username: string;
};

const NavBar = ({ username }: propType) => {
  return (
    <Flex>
      <Center minHeight={"5vh"}>
        <List color="whit1e" spacing={"10%"} w={"100px"} m={6}>
          <Box pos={"fixed"}>
            <ListItems pathTo="/" icon={null} text="Home" />
            <ListItems pathTo="/workouts" icon={null} text="Workouts" />
            <ListItems pathTo="/logger" icon={null} text="Logger" />
            <ListItems pathTo="/nutrition" icon={null} text="Nutrition" />
            <Box h="70vh"></Box>
            <>
              <Popover>
                <PopoverTrigger>
                  <Button
                    py={6}
                    bg={"none"}
                    width={"125px"}
                    pos="absolute"
                    left={"-15px"}
                    fontSize={"1.2em"}
                    textColor={"white"}
                    _hover={{ bg: "rgba(30, 30, 30, 0.81)" }}
                  >
                    {username}
                  </Button>
                </PopoverTrigger>

                <PopoverContent width={"145px"} bg="none" border={"none"}>
                  <PopoverBody>
                    <Logout />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </>
          </Box>
        </List>
      </Center>
    </Flex>
  );
};
export default NavBar;
