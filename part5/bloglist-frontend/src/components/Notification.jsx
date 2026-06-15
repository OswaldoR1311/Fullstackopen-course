const Notification = ({ message, status }) => {
	console.log({ message, status })
	if (!message) {
		return null
	}

	return (
		<div
			className={`notification ${status === 'success' ? 'success' : 'error'}`}
		>
			{message}
		</div>
	)
}

export default Notification
