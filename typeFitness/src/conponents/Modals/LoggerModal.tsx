/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeExercise } from "../Workouts/ListWorkouts";
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
  ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";
import ExerciseLogger from "../Workouts/ExerciseLogger";
import addData from "../../utils/addData";
import { Workout } from "../Workouts/Workouts";

type propTypes = {
  workout: Workout;
  currentUser: string;
  unfocus: (_: boolean) => void;
};

type workoutDataType = {
  name: string;
  date: string;
  exercises: exericiseType
};

type logsType = {
  failure: boolean;
  reps: string;
  weight: string;
};

type exericiseType = {[key: string] : logsType}


type exerciseLogType = {
  logs: logsType;
};

export type loggedDataType = {
  [key: string]: exerciseLogType;
};

export default function LoggerModal({
  workout,
  currentUser,
  unfocus,
}: propTypes) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedData, setLoggedData] = useState<loggedDataType>({});
  const [currentlyOpen, setCurrentlyOpen] = useState<number | string>("");

  const handleClose = () => {
    setLoggedData({});
    setCurrentlyOpen("");
    unfocus(false);
    onClose();
  };

  const handleFinishWorkout = () => {
    const data = Object.entries(loggedData);
    const exercises: exericiseType = data.reduce(
      (acc: exericiseType, currentExercise: any) => {
        const exerciseName = currentExercise[0];
        const filteredLogs = currentExercise[1].logs.filter(
          (i: logsType) => i.reps && i.weight
        );
        if (filteredLogs.length === 0) return acc;
        acc[exerciseName] = filteredLogs;
        addData(`exerciseLogs/${currentUser}/${exerciseName}`, {
          date: new Date().toString(),
          exercises: filteredLogs,
        });
        return acc;
      },
      {}
    );


    const workoutData: workoutDataType = {
      name: workout.name,
      date: new Date().toString(),
      exercises,
    };
    addData(`finishedWorkouts/${currentUser}`, workoutData);

    handleClose();
  };

  return workout.exercises ? (
    <Box w={"full"} h={"100%"} onClick={onOpen} position={"absolute"}>
      <Modal
        isCentered
        size="460px"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          minH="52vh"
          maxH="80vh"
          width={"460px"}
          textColor={"white"}
          bg="rgba(0, 0, 0, 0.9)"
          position={"relative"}
          overflow={"auto"}
        >
          <ModalCloseButton mt={2} zIndex={1} onClick={handleClose} />
          <ModalBody pb={6}>
            <Heading mt={2} w={"full"} textAlign={"center"} pb={6}>
              {workout.name}
            </Heading>

            {workout.exercises.map((exercise: TypeExercise, index: number) => (
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
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              w={"full"}
              h={"60px"}
              bg={"rgb(5,5,5)"}
              _hover={{ bg: "rgb(15,15,15)" }}
              textColor={"white"}
              onClick={handleFinishWorkout}
              pos={"absolute"}
              rounded={0}
              bottom={0}
              right={0}
            >
              Finish
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  ) : (
    <></>
  );
}
