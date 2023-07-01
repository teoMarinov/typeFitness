import MakeNewWorkout from "./MakeNewWorkout"
import ListWorkouts from "./ListWorkouts"
import {
  Box,
  SimpleGrid,
} from '@chakra-ui/react';




const testData: Array<Workout> = [
  {
    name: 'Monday',
    data: ['aasdsa', 'asdlikjasd', 'asjkhdakjshd']
  },
  {
    name: 'Wednesday',
    data: ['aasdsa', 'asdlikjasd', 'asjkhdakjshd']
  },
  {
    name: 'Friday',
    data: ['aasdsa', 'asdlikjasd', 'asjkhdakjshd']
  }
];

export interface Workout {
  name: string;
  data: string[];
}

export default function BasicStatistics() {
  return (
    <Box width={'100%'}>
      <MakeNewWorkout />
      <SimpleGrid columns={{ base: 1, md: 3 }} p={5} spacing={5} >
        {testData.map((workout: Workout, index) => (
          <Box key={workout.name + index}>
            <ListWorkouts workout={workout} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}


