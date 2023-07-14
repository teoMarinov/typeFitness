import { useReducer } from "react";
import { Text, Button, Input } from "@chakra-ui/react";


const ACTION = {
  ADD_NUMBER: 'add number',
  ADD_LETTER: 'add letter',
  CLEAR: 'clear'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_NUMBER:
      return ({ ...state, numbers: action.payload })
    case ACTION.ADD_LETTER:
      return ({ ...state, letters: action.payload })
      case ACTION.CLEAR:
        return ({numbers: 0, letters: ''})
    default:
      return alert('something went wrong with useReducer')
  }
}

const initailState = { numbers: 0, letters: 'dw' }

export default function Home() {

  const [state, dispatch] = useReducer(reducer, initailState)


  return (
    <>
      <Text>
        {state.letters}
      </Text>
      <Input onChange={(e) => dispatch({ type: ACTION.ADD_LETTER, payload: e.target.value })} value={state.letters}/>
      <Text>
        {state.numbers}
      </Text>
      <Input onChange={(e) => dispatch({ type: ACTION.ADD_NUMBER, payload: 'asdkjhasgd' })} />
      <Button onClick={() => dispatch({type: ACTION.CLEAR})}>Clear</Button>
    </>
  )
}
