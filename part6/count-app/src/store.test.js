// import { beforeEach, describe, expect, it } from 'vitest'
// import useCounterStore from './store'

//Version without custom hooks
// beforeEach(() => {
// 	useCounterStore.setState({ counter: 0 })
// })

// describe('counter store', () => {
// 	it('initial state is 0', () => {
// 		expect(useCounterStore.getState().counter).toBe(0)
// 	})

// 	it('increment increases counter by 1', () => {
// 		useCounterStore.getState().actions.increment()
// 		expect(useCounterStore.getState().counter).toBe(1)
// 	})

// 	it('decrement decreases counter by 1', () => {
// 		useCounterStore.getState().actions.decrement()
// 		expect(useCounterStore.getState().counter).toBe(-1)
// 	})

// 	it('zero resets counter to 0', () => {
// 		useCounterStore.getState().actions.increment()
// 		useCounterStore.getState().actions.decrement()
// 		useCounterStore.getState().actions.zero()
// 		expect(useCounterStore.getState().counter).toBe(0)
// 	})
// })

//Version with custom hooks
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import useCounterStore, { useCounter, useCounterControls } from './store'

beforeEach(() => {
	useCounterStore.setState({ counter: 0 })
})

describe('counter hooks', () => {
	it('useCounter returns initial value of 0', () => {
		const { result } = renderHook(() => useCounter())
		expect(result.current).toBe(0)
	})

	it('increment updates counter', () => {
		const { result: counter } = renderHook(() => useCounter())
		const { result: controls } = renderHook(() => useCounterControls())

		act(() => controls.current.increment())
		expect(counter.current).toBe(1)
	})

	it('decrement updates counter', () => {
		const { result: counter } = renderHook(() => useCounter())
		const { result: controls } = renderHook(() => useCounterControls())

		act(() => controls.current.decrement())
		expect(counter.current).toBe(-1)
	})

	it('zero resets counter', () => {
		const { result: counter } = renderHook(() => useCounter())
		const { result: controls } = renderHook(() => useCounterControls())

		act(() => {
			controls.current.increment()
			controls.current.decrement()
			controls.current.zero()
		})

		expect(counter.current).toBe(0)
	})
})
