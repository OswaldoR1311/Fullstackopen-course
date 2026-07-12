import { useCounter } from '../store'

function Display() {
	const counter = useCounter()

	return <div>{counter}</div>
}

export default Display
