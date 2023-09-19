import {
  ListItem,
  Flex,
  Icon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

type ListItemsProps = {
  pathTo: string;
  icon: React.ElementType | null;
  text: string;
};

export default function ListItems({
  pathTo,
  icon = null,
  text,
}: ListItemsProps) {
  return (
    <ListItem>
      <NavLink to={pathTo}>
        <Flex>
          <Button
            py={6}
            bg={"none"}
            rounded={"xl"}
            width={"10.5vh"}
            fontSize={"1.2em"}
            textColor={"white"}
            _hover={{ bg: "rgba(30, 30, 30, 0.81)" }}
          >
            {icon && <Icon as={icon} fontSize="1.2em" mr={1} />}
            {text}
          </Button>
        </Flex>
      </NavLink>
    </ListItem>
  );
}
