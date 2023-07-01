import { Heading, Center, Text, VStack, IconButton, Flex, Box, Input } from "@chakra-ui/react"
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons"
import { Workout } from "./Workouts"
import { useState } from "react"
import editData from "../../utils/editData"


type WorkoutType = {
  workout: string & Workout
  user: string
}

export type TypeExercise = {
  name: string;
  sets: string;
  reps: string;
}
export default function ListWorkouts({ workout, user }: WorkoutType) {

  const [toggleDetails, setToggleDetails] = useState(true)
  const [toggleEditMenu, setToggleEditMenu] = useState(false)
  const [toggleDelete, setToggleDelete] = useState(false)
  const [editedVals, setEditedVals] = useState(workout[1].exercises)

  const handleChange = (index: number, key: string, newVal: string) => {
    const updatedExercise = { ...editedVals[index], [key]: newVal };
    const updatedVals = [...editedVals];
    updatedVals[index] = updatedExercise;
    setEditedVals(updatedVals);
  };


  const handleAcceptEdit = () => {
    setToggleEditMenu(false)
    const changedValues = [...editedVals]
  }

  const handleAcceptDelete = (postId: string) => {
    editData(`workouts/${user}`, postId, null)
  }


  return (
    <Center
      onMouseOver={() => setToggleDetails(true)}
      // onMouseLeave={() => toggleEditMenu || setToggleDetails(false)}
      bg="white"
      h="50vh"
      border="1px solid"
      textAlign="center"
      _hover={{ cursor: "pointer" }}
    >
      {toggleDetails ? (<VStack position={'relative'} w={'full'} h={'100%'} textAlign={'center'} justifyContent={'center'}>
        {toggleEditMenu ?
          (<>
            <IconButton
              bg={'none'}
              aria-label='Call Segun'
              size='xs'
              icon={<CloseIcon />}
              position={'absolute'}
              top={1}
              right={1}
              onClick={() => {
                setToggleEditMenu(false)
              }}
            />
            <IconButton
              bg={'none'}
              aria-label='Call Segun'
              size='xs'
              icon={<CheckIcon />}
              position={'absolute'}
              top={1}
              right={7}
              // onClick={handleAcceptEdit}
            />
            {toggleDelete ? (
              <>
                <IconButton
                  bg={'none'}
                  aria-label='Call Segun'
                  size='xs'
                  icon={<CloseIcon />}
                  position={'absolute'}
                  top={7}
                  right={1}
                  onClick={() => setToggleDelete(false)}
                />
                <IconButton
                  bg={'none'}
                  aria-label='Call Segun'
                  size='xs'
                  icon={<CheckIcon />}
                  position={'absolute'}
                  top={7}
                  right={7}
                  onClick={() => handleAcceptDelete(workout[0])}
                />
              </>
            )
              :
              (<IconButton
                bg={'none'}
                aria-label='Call Segun'
                size='xs'
                icon={<DeleteIcon />}
                position={'absolute'}
                top={7}
                right={1}
                onClick={() => setToggleDelete(true)}
              />)}
          </>)
          : (<IconButton
            bg={'none'}
            aria-label='Call Segun'
            size='xs'
            icon={<EditIcon />}
            position={'absolute'}
            top={1}
            right={1}
            onClick={() => setToggleEditMenu(true)}
          />)}
        {workout[1].exercises.map((exercise: TypeExercise, index: number) => (
          <Box key={exercise.name + index}>
            {

              toggleEditMenu ?
                (<>
                  <Flex>
                    <Input value={editedVals[index].name} w={'350px'} onChange={(e) => handleChange(index, 'name', e.target.value)} mr={1}></Input>
                    <Input value={editedVals[index].sets} w={'70px'} onChange={(e) => handleChange(index, 'sets', e.target.value)} mr={1}></Input>
                    <Input value={editedVals[index].reps} w={'70px'} onChange={(e) => handleChange(index, 'reps', e.target.value)}></Input>
                  </Flex>

                </>)
                :
                (
                  <Text >{exercise.name} - {exercise.sets} x {exercise.reps}</Text>
                )}
          </Box>
        ))}
      </VStack>) : (<Heading as="h2" display="block">
        {workout[1].name}
      </Heading>)
      }
    </Center >
  );
}