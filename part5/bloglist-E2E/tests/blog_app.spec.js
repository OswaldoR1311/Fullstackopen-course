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
			const blogTitle = `Blog for like test ${Date.now()}`
			await createBlog(page, blogTitle, 'playwright', 'https://playwright.dev')

			const blogContainer = page.locator('.blog').filter({
				hasText: blogTitle,
			})

			await blogContainer.getByRole('button', { name: 'view' }).click()

			const likeButton = blogContainer.getByRole('button', { name: 'like' })
			await likeButton.click()

			await expect(blogContainer.getByText('likes 1')).toBeVisible()
		})

		test(' a blog can be deleted', async ({ page }) => {
			const blogTitle = `Blog for delete test ${Date.now()}`
			const blogAuthor = 'Oswaldo'
			await createBlog(page, blogTitle, blogAuthor, 'https://playwright.dev')

			const blogContainer = page.locator('.blog').filter({ hasText: blogTitle })

			await blogContainer.getByRole('button', { name: 'view' }).click()

			page.once('dialog', (dialog) => {
				expect(dialog.message()).toContain(
					`Remove blog ${blogTitle} by ${blogAuthor}`,
				)
				dialog.accept()
			})

			await blogContainer.getByRole('button', { name: 'remove' }).click()
			await expect(blogContainer).not.toBeVisible()
		})

		test('only creator can see remove button', async ({ page, request }) => {
			const blogTitle = `Blog for delete button ${Date.now()}`
			const blogAuthor = 'Oswaldo'

			await userLogin(page, 'root', '123456')
			await createBlog(page, blogTitle, blogAuthor, 'http://playwright.dev')

			const blog = page.locator('.blog').filter({ hasText: blogTitle })

			await expect(blog).toBeVisible()

			page.once('dialog', (dialog) => {
				expect(dialog.message()).toContain('Are you sure to log out?')
				dialog.accept()
			})

			await page.getByRole('button', { name: 'log out' }).click()

			await expect(page.getByRole('button', { name: 'login' })).toBeVisible()

			await request.post('http://localhost:3001/api/users', {
				data: { name: 'superuser2', username: 'root2', password: '123456' },
			})

			await userLogin(page, 'root2', '123456')

			await expect(page.getByText('superuser2 logged in')).toBeVisible()

			await expect(blog).toBeVisible()
			await expect(
				blog.getByRole('button', { name: 'remove' }),
			).not.toBeVisible()
		})
	})
})
