const { test, expect } = require('@playwright/test')
const { userLogin, createBlog } = require('./helpers')

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
			await userLogin(page, 'root', '123456')
			await expect(page.getByText('Superuser logged in')).toBeVisible()
		})
	})

	test('fails with the wrong credentials', async ({ page }) => {
		await userLogin(page, 'root', 'wrong')
		await expect(page.getByText('wrong username')).toBeVisible()
	})

	test.describe('When logged in', () => {
		test.beforeEach(async ({ page }) => {
			await userLogin(page, 'root', '123456')
		})

		test('a new blog can be created', async ({ page }) => {
			await createBlog(
				page,
				'a test blog by playwright',
				'playwright',
				'https://playwright.dev',
			)

			await expect(
				page.getByText('a test blog by playwright by playwright'),
			).toBeVisible()
		})

		test('a blog can be liked', async ({ page }) => {
			const blogContainer = page.locator('.blog').filter({
				hasText: 'a test blog by playwright by playwright',
			})

			await blogContainer.getByRole('button', { name: 'view' }).click()

			const likeButton = blogContainer.getByRole('button', { name: 'like' })
			await likeButton.click()

			await expect(blogContainer.getByText('likes 1')).toBeVisible()
		})
	})
})
