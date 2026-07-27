import { useState } from 'react'

function App() {
	const [counter, setCounter] = useState(0)

	return (
		<div>
			<p>count: {counter}</p>
			<button type="button" onClick={() => xsetCounter(counter + 1)}>
				increment
			</button>
		</div>
	)
}

export default App
