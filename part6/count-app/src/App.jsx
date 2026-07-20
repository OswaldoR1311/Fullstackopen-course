// import './App.css'
// import Controls from './components/Controls'
// import Display from './components/Display'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Panel from './components/Panel'

// function App() {
// 	return (
// 		<div>
// 			<Display />
// 			<Controls />
// 		</div>
// 	)
// }

// export default App

//Context API
function App() {
	return (
		<div>
			<Navbar />
			<Panel />
			<Footer />
		</div>
	)
}

export default App
