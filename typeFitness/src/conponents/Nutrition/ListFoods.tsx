import { Box, Center, HStack, Input, SimpleGrid, Spacer, Text } from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { useState } from "react"


type propType = {
    children: any
    searchInput: string
    setSearchInput: any
}

export default function ListFoods({ children, searchInput, setSearchInput }: propType) {

    const [open, setOpen] = useState(false)
    const menuH = open ? `${90 + Math.ceil(children.length / 6) * 320}px` : '60px'
    const handleToggleList = () => {
        if (open) {
            setOpen(false)
            setTimeout(() => {
                setSearchInput('')
            }, 180)
        } else {
            setOpen(true)

        }
    }


    return (
        <>
            <Box
                rounded={'xl'}
                textColor={'white'}
                fontWeight={'bold'}
                bg="rgba(100, 100, 100, 0.9)"
                style={{
                    backdropFilter: "blur(2px)",
                    letterSpacing: "0.15em"
                }}
                w='85%'
                h={menuH}
                pos={'absolute'}
                left={'7.5%'}
                top={20}
                transition="height 0.2s ease"
                textAlign="center"
                overflow={'hidden'}

            >
                <Center
                    position={'relative'}
                    _hover={{ cursor: "pointer" }}
                    onClick={handleToggleList}
                    mt='2'
                >
                    {
                        open
                        && (
                            <Input
                                w={'400px'}
                                mt={'10px'}
                                mr={'300px'}
                                pos={'absolute'}

                                transition="opacity 0.1s linear"
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        )
                    }
                    <Text
                        mt={'11px'}
                        textAlign={'center'}
                        userSelect={'none'}
                        transition="transform 0.1s linear, font-size 0.1s linear"
                        transform={open ? 'translateX(200px)' : 'translateX(0%)'}
                    >
                        Your saved foods {open ? <ChevronUpIcon mb={'2px'} boxSize={6} /> : <ChevronDownIcon mb={'2px'} boxSize={6} />}
                    </Text>
                </Center>
                <Box mt={4}>
                    <SimpleGrid columns={{ base: 1, md: 6 }} p={5} spacing={5}>
                        {children}
                    </SimpleGrid>
                </Box>
            </Box >
        </>
    )
}
