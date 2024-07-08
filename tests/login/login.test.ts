import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { LoginPage } from '../../pages/login-page'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    
    //Arrange
    const existingUser = existingUsers[0]
    //Login page Object
    const loginPage = new LoginPage(page)

    //Act
    await loginPage.navigateTo() // Navigates to baseURL/{endpoint} i.e 'http://localhost:8080/login'
    // Enter username to login
    await loginPage.enterUserName(existingUser.email)
    // Enter password to login
    await loginPage.enterPassword(existingUser.password)
    // Click login button
    await loginPage.clickLogInButton()

    //Assert
    // Verify is user logged in? 
    await loginPage.VerifyButtonIsVisible(loginPage.logOutButton, 1000)
  })
})
