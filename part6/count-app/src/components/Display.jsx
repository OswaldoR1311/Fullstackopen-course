// import { useCounter } from '../store'

// function Display() {
// 	const counter = useCounter()

// 	return <div>{counter}</div>
// }

// export default Display

//Context API
import useCounter from '../hooks/useCounter'

function Display() {
	const { counter } = useCounter()
	return <div>{counter}</div>
}

export default Display
