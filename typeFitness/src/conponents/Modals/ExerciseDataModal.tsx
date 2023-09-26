/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  useDisclosure,
  Checkbox,
  HStack,
  Center,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  CompleteExerciseRecord,
} from "../Home/LoggedIn/LoggedInHome";
import { useState } from "react";

type propType = {
  initalData: CompleteExerciseRecord;
};

export default function ExerciseDataModal({ initalData }: propType) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checkReps, setCheckReps] = useState(false);
  const [checkSets, setCheckSets] = useState(false);

  const data =
    initalData &&
    Object.values(initalData[1]).reduce((acc: any, info: any) => {
      const splitDate = info.date.split(" ");
      const day = splitDate[2];
      const month = splitDate[1];
      const year = `${splitDate[3][2]}${splitDate[3][3]}`;
      const averageReps = (
        info.exercises.reduce((acc: any, exercise: any) => {
          acc += Number(exercise.reps);
          return acc;
        }, 0) / info.exercises.length
      ).toFixed();
      const averageWeight = (
        info.exercises.reduce((acc: any, exercise: any) => {
          acc += Number(exercise.weight);
          return acc;
        }, 0) / info.exercises.length
      ).toFixed();
      const reshapedInfo = {
        date: `${month}/${day}/${year}`,
        sets: info.exercises.length,
        weight: averageWeight,
        reps: averageReps,
      };
      acc.push(reshapedInfo);
      return acc;
    }, []);

  console.log(data);

  return (
    <>
      <Box w={"full"} h={"full"} pos={"absolute"} onClick={onOpen} />

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent userSelect={"none"} bg={"rgb(30,30,30)"}>
          <ModalHeader
            textAlign={"center"}
            fontSize={"2xl"}
            textColor={"white"}
          >
            {initalData[0]}
          </ModalHeader>
          <ModalCloseButton mt={"7px"} mr={"5px"} textColor={'white'}/>
          <ModalBody>
            <Center mb="15px">
              <HStack textColor={"white"}>
                <Checkbox onChange={() => setCheckReps(!checkReps)}>
                  reps
                </Checkbox>
                <Checkbox onChange={() => setCheckSets(!checkSets)}>
                  sets
                </Checkbox>
              </HStack>
            </Center>
            <Center>
              <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" padding={{ left: 20, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                {checkReps && (
                  <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
                )}
                {checkSets && (
                  <Line type="monotone" dataKey="sets" stroke="#82ca9d" />
                )}
              </LineChart>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
