/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import readData from "../../utils/readData";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import ExerciseDetailsRow from "./ExerciseDetailsRow";
import "./CalenderStyle.css";

const localizer = momentLocalizer(moment);

export default function CalenderComp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState("");
  const [selectedEventData, setSelectedEventData] = useState({});
  const [exerciseData, setExerciseData] = useState<any>([]);
  const [currentlySelected, setCurrentlySelected] = useState("");

  const context = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  useEffect(() => {
    readData(`finishedWorkouts/${currentUser}`, (snapshot: any) => {
      const data = Object.values(snapshot);
      const standardisedData = data.map((exercise: any) => {
        exercise.start = new Date(exercise.date);
        exercise.end = new Date(exercise.date);
        exercise.title = exercise.name;
        return exercise;
      });
      setExerciseData(standardisedData);
    });
  }, [currentUser]);

  const handleEventSelect = (event: any) => {
    setSelectedEventTitle(event.title);
    setSelectedEventData(Object.entries(event.exercises));
    setIsModalOpen(true);
  };

  return (
    <>
      <Center textColor={"gray.950"}>
        <Box h={"790px"} w={"95%"}>
          {Array.isArray(exerciseData) && (
            <Calendar
              localizer={localizer}
              events={exerciseData}
              views={["month", "day"]}
              defaultView="month"
              onSelectEvent={handleEventSelect}
            />
          )}
        </Box>
      </Center>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isCentered
        closeOnOverlayClick={false}
        size="460px"
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
          <ModalHeader>
            <Heading mt={2} w={"full"} textAlign={"center"} pb={6}>
              {selectedEventTitle}
            </Heading>
          </ModalHeader>
          <ModalCloseButton
            mt={"10px"}
            mr={"5px"}
            onClick={() => setCurrentlySelected("")}
          />
          <ModalBody>
            {Array.isArray(selectedEventData) &&
              selectedEventData.map((exercise: any, index: number) => (
                <>
                  <ExerciseDetailsRow
                    exercise={exercise}
                    currentIndex={index}
                    currentlySelected={currentlySelected}
                    setCurrentlySelected={setCurrentlySelected}
                  />
                </>
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
