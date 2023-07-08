import { TypeExercise } from "../Workouts/ListWorkouts"
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Heading,
  ModalCloseButton,
  ModalFooter
} from "@chakra-ui/react"
import { useState } from "react"
import ExerciseLogger from "../Workouts/ExerciseLogger"
import { logType } from "../Workouts/ExerciseLogger"
import addData from "../../utils/addData"


type propTypes = {
  workout: TypeExercise[] | string
  currentUser: string
  unfocus: any
}



type exerciseType = logType[]

type workoutDataType = {
  name: string
  date: string
  exercises: exerciseType[]
}

export default function LoggerModal({ workout, currentUser, unfocus }: propTypes) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loggedData, setLoggedData] = useState([])
  const [currentlyOpen, setCurrentlyOpen] = useState('')


  const handleClose = () => {
    setCurrentlyOpen('')
    unfocus(false)
    onClose()
  }

  const handleFinishWorkout = () => {
    const workoutData: workoutDataType = {
      name: workout.name,
      date: new Date().toString(),
      exercises: loggedData
    }
    
    console.log(loggedData)
    console.log(workoutData)
    try {
      addData(`finishedWorkouts/${currentUser}`, workoutData)
    } catch(error) {
      console.log(error)
    }

    handleClose()
  }


  return (
    workout.exercises ?
      (<Box
        w={'full'}
        h={'100%'}
        onClick={onOpen}
        position={'absolute'}
      >
        <Modal 
        isCentered 
        size='460px' 
        isOpen={isOpen} 
        onClose={onClose} 
        closeOnOverlayClick={false} 
        >
          <ModalOverlay />
          <ModalContent
            minH='52vh'
            maxH='80vh'
            width={'460px'}
            textColor={'white'}
            bg="rgba(0, 0, 0, 0.9)"
            position={'relative'}
            overflow={'auto'}
          >
            <ModalCloseButton
              mt={2}
              zIndex={1}
              onClick={handleClose}
            />
            <ModalBody
              pb={6}
            >
              <Heading
                mt={2}
                w={'full'}
                textAlign={'center'}
                pb={6}
              >
                {workout.name}
              </Heading>

              {
                workout.exercises.map((exercise: TypeExercise, index: number) => (
                  <Box key={index}>
                  <ExerciseLogger
                    exercise={exercise}
                    loggedData={loggedData}
                    setLoggedData={setLoggedData}
                    currentlyOpen={currentlyOpen}
                    setCurrentlyOpen={setCurrentlyOpen}
                    exerciseIndex={index}
                    />
                    </Box>
                ))
              }

            </ModalBody>
            <ModalFooter>
              <Button
                w={'full'}
                h={'60px'}
                bg={'rgb(5,5,5)'}
                _hover={{ bg: 'rgb(15,15,15)' }}
                textColor={'white'}
                onClick={handleFinishWorkout}
                // onClick={() => console.log(loggedData)}
                pos={'absolute'}
                rounded={0}
                bottom={0}
                right={0}
              >
                Finish
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>) : <></>
  )
}
