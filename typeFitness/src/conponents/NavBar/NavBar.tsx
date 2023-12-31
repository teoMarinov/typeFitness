import {
  Center,
  Flex,
  List,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
} from "@chakra-ui/react";
import ListItems from "./ListItems";
import Logout from "../Logout/Logout";

type propType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  username: any
};

const NavBar = ({ username }: propType) => {
  return (
    <Flex>
      <Center minHeight={"5vh"}>
        <List color="whit1e" spacing={"10%"} w={"100px"} m={6}>
          <Box pos={"fixed"}>
            <ListItems pathTo="/workouts" icon={null} text="Workouts" />
            <ListItems pathTo="/logger" icon={null} text="Logger" />
            <ListItems pathTo="/progress" icon={null} text="Progress" />
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
