import { create } from 'zustand'

const useUnicafeCounter = create((set) => ({
	good: 0,
	neutral: 0,
	bad: 0,
	actions: {
		incrementGood: () => set((state) => ({ good: state.good + 1 })),
		incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
		incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
	},
}))

export const useGoodValue = () => useUnicafeCounter((state) => state.good)
export const useNeutralValue = () => useUnicafeCounter((state) => state.neutral)
export const useBadValue = () => useUnicafeCounter((state) => state.bad)
export const useCounterActions = () =>
	useUnicafeCounter((state) => state.actions)
