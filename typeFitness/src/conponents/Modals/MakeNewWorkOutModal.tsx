import {
    Box,
    useDisclosure,
    Center,
} from '@chakra-ui/react'
import { useState } from "react"
import EditModal from './EditModal';



export interface CurrentExercise {
    [key: string]: string;
}

interface ExerciseList {
    name: string
    exercises: string[]
}

type propType = {
    update: number
    setUpdate: any
    user: string
}
export default function MakeNewWorkOutModal({ update, setUpdate, user }: propType) {

    const [toggleDetails, setToggleDetails] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            <Center
                onMouseOver={() => {
                    setToggleDetails(true)
                }}
                onMouseLeave={() => {
                    setToggleDetails(false)
                }}
                h={toggleDetails ? ('52vh') : ('50vh')}
                w={toggleDetails ? ('460px') : ('450px')}
                bg="rgba(0, 0, 0, 0.3)"
                style={{
                    backdropFilter: "blur(6px)",
                }}
                textAlign="center"
                _hover={{
                    cursor: "pointer",
                    bg: "rgba(0, 0, 0, 0.6)"

                }}
                transition="height 0.15s ease, width 0.15s ease"
                rounded={'xl'}
                position={'relative'}
                onClick={onOpen}
                boxShadow="0 0 8px 1px white"
            >
                
                    <EditModal
                        update={update}
                        setUpdate={setUpdate}
                        workout={[]}
                        name={''}
                        id={0}
                        currentUser={user}
                        unfocus={setToggleDetails}
                        existingWorkout={false}
                    />
                
            </Center >
        </>
    );
}