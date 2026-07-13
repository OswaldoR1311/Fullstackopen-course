import { useNotificationStore } from '../notificationStore'

function Notification() {
	const notification = useNotificationStore((state) => state.message)

	if (!notification) return null

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		marginBottom: 10,
	}

	return (
		<div>
			<div style={style}>{notification}</div>
		</div>
	)
}

export default Notification
