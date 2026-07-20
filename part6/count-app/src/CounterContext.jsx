import { createContext, useState } from 'react'

const CounterContext = createContext()

export default CounterContext

// export const CounterContextProvider = (props) => {
// 	const [counter, setCounter] = useState(0)

// 	return (
// 		<CounterContext.Provider value={{ counter, setCounter }}>
// 			{props.children}
// 		</CounterContext.Provider>
// 	)
// }

export function CounterContextProvider({ children }) {
	const [counter, setCounter] = useState(0)

	function increment() {
		return setCounter(counter + 1)
	}

	function decrement() {
		return setCounter(counter - 1)
	}

	function zero() {
		return setCounter(0)
	}

	return (
		<CounterContext.Provider
			value={{ counter, setCounter, increment, decrement, zero }}
		>
			{children}
		</CounterContext.Provider>
	)
}
