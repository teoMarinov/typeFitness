import {
  GridItem,
  Center,
  Box,
  Grid,
  Input,
  Text
} from "@chakra-ui/react"
import { useState, useEffect } from "react"


type propType = {
  name: string
  value: string
  mes: string
  setValue: any
}

export default function GridRow({ name, value, setValue, mes }: propType) {

  const [inputBoxLength, setInputBoxLength] = useState('')
  useEffect(() => {
    value.toString().length > 2 ? setInputBoxLength(`${value.toString().length * 9.2}px`) : setInputBoxLength('20px')
  }, [value])
  return (
    <Box
    >
      <Grid
        templateColumns='repeat(2, 1fr)'
        gap={2}
        mt={6}
      >
        <GridItem
          colSpan={1}

        >
          <Center
            textColor='white'
            _hover={{
              cursor: 'default'
            }}
          >
            {name}
          </Center>
        </GridItem>
        <GridItem
          colSpan={1}
        >
          <Center
            textColor='white'
          >
            <Input
              p={0}
              w={inputBoxLength}
              color="white"
              border={'none'}
              rounded={'none'}
              borderBottom="2px solid rgba(195, 195, 195, 0.3)"
              focusBorderColor="none"
              value={value}
              _hover={{}}
              textAlign={'center'}
              onChange={(e) => setValue(e.target.value)}
            />
            <Text
              mt={'3px'}
              pl={1}
              pb={2}
              borderBottom="2px solid rgba(195, 195, 195, 0.3)"
              fontSize={'lg'}
              _hover={{
                cursor: 'default'
              }}
            >
              {mes}
            </Text>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  )
}
