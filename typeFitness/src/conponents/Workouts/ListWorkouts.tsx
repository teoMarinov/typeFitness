import { Heading, Center, Text, VStack, IconButton } from "@chakra-ui/react"
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons"
import { Workout } from "./Workouts"
import { useState } from "react"
import editData from "../../utils/editData"

type WorkoutType = {
  workout: string & Workout
  user: string
}

type TypeExercise = {
  name: string;
  reps: string;
  sets: string
}
export default function ListWorkouts({ workout, user }: WorkoutType) {

  const [toggleDetails, setToggleDetails] = useState(false)
  const [toggleEditMenu, setToggleEditMenu] = useState(false)
  const [toggleDelete, setToggleDelete] = useState(false)



  const handleAcceptEdit = () => {
    setToggleEditMenu(false)
  }

  const handleAcceptDelete = (postId: string) => {
    editData(`workouts/${user}`, postId, null)
  }


  return (
    <Center
      onMouseOver={() => setToggleDetails(false)}
      // onMouseLeave={() => setToggleDetails(true)}
      bg="white"
      h="50vh"
      border="1px solid"
      textAlign="center"
      _hover={{ cursor: "pointer" }}
    >
      {toggleDetails ? (<Heading as="h2" display="block">
        {workout[1].name}
      </Heading>) :
        (<VStack position={'relative'} w={'full'} h={'100%'} textAlign={'center'} justifyContent={'center'}>
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
                onClick={() => setToggleEditMenu(false)}
              />
              <IconButton
                bg={'none'}
                aria-label='Call Segun'
                size='xs'
                icon={<CheckIcon />}
                position={'absolute'}
                top={1}
                right={7}
                onClick={handleAcceptEdit}
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
          {workout[1].exercises.map((exercise: TypeExercise, index) => (
            <Text key={exercise.name + index + exercise.reps}>{exercise.name} - {exercise.sets} x {exercise.reps}</Text>
          ))}
        </VStack>)}
    </Center>
  );
}