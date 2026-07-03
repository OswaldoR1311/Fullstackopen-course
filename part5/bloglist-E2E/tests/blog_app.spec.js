const { test, expect } = require('@playwright/test')

test.describe('Blog App', () => {
	test.beforeEach(async ({ page, request }) => {
		await request.post('http://localhost:3001/api/testing/reset')
		await request.post('http://localhost:3001/api/users', {
			data: {
				name: 'Superuser',
				username: 'root',
				password: '123456',
			},
		})

		await page.goto('http://localhost:5173')
	})

	test('Login form is shown by default', async ({ page }) => {
		await page.getByRole('button', { name: 'login' }).click()

		const username = await page.getByLabel('username')
		const password = await page.getByLabel('password')
		const submitButton = await page.getByRole('button', { name: 'login' })

		await expect(username).toBeVisible()
		await expect(password).toBeVisible()
		await expect(submitButton).toBeVisible()
	})

	test.describe('Login', () => {
		test('succeeds with correct credentials', async ({ page }) => {
			await page.getByRole('button', { name: 'login' }).click()

			await page.getByLabel('username').fill('root')
			await page.getByLabel('password').fill('123456')

			await page.getByRole('button', { name: 'login' }).click()

			await expect(page.getByText('Superuser logged in')).toBeVisible()
		})
	})

	test('fails with the wrong credentials', async ({ page }) => {
		await page.getByRole('button', { name: 'login' }).click()

		await page.getByLabel('username').fill('root')
		await page.getByLabel('password').fill('wrong')

		await page.getByRole('button', { name: 'login' }).click()

		await expect(page.getByText('wrong username')).toBeVisible()
	})
})
