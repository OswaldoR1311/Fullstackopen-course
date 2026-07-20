import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export function NotificationContextProvider({ children }) {
	const [notification, setNotification] = useState(null)

	function handleNotification(message, timeout = 5000) {
		setNotification(message)
		setTimeout(() => {
			setNotification(null)
		}, timeout)
	}

	return (
		<NotificationContext.Provider
			value={{ notification, setNotification, handleNotification }}
		>
			{children}
		</NotificationContext.Provider>
	)
}
