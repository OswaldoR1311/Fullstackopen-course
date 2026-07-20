import { useContext } from 'react'
import CounterContext from '../CounterContext'

function useCounter() {
	return useContext(CounterContext)
}

export default useCounter
