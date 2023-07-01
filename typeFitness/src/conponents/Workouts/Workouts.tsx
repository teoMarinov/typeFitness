import MakeNewWorkout from "./MakeNewWorkout"
import ListWorkouts from "./ListWorkouts"
import { Grid, GridItem } from "@chakra-ui/react"

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

export default function Workouts() {
  return (
    <Grid
      h={'100vh'}
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(3, 1fr)'
      w='full'
    >
      <GridItem colSpan={3} h='44vh'>
        <MakeNewWorkout />
      </GridItem>
      {testData.map((workout: Workout) => (

        <GridItem colSpan={1} h='45vh' p={10} >
          <ListWorkouts workout={workout} />
        </GridItem>
      ))}

    </Grid>

  )
}
