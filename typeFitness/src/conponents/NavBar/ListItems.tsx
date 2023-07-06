import { ListItem, Flex, Icon, Button, Center } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"


type ListItemsProps = {
    pathTo: string;
    icon: React.ElementType | null;
    text: string;
};


export default function ListItems({ pathTo, icon=null, text }: ListItemsProps) {
    return (
        <ListItem >
            <NavLink to={pathTo}>
                <Flex>
                    <Button width={'10vh'} colorScheme={"green"} fontSize={'1.2em'} py={6}>
                        
                        {icon && <Icon as={icon} fontSize="1.2em" mr={1} />}
                        {text}
                    </Button>
                </Flex>
            </NavLink>
        </ListItem>
    )
}
