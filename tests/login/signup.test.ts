import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login-page'
import { SignupPage } from '../../pages/signup-page'

test.describe.configure({ mode: 'serial' })

test.describe('Signup form tests', () => {
  test('Create new user account and verify login', async ({ page }) => {

    //Arrange
    // New User account details - For the best practice this should be stored in data file and fetched like data-driven approach
    const user = {
      firstName: 'John',
      lastName: 'Wick',
      email: 'john@mail.com',
      password: 'p@@@ssword'
    }
    //Login page Object
    const loginPage = new LoginPage(page)
    const signupPage = new SignupPage(page)

    //Act
    await signupPage.navigateTo() // Navigates to baseURL/{endpoint} i.e 'http://localhost:8080/signup'
    // Create new user account
    await signupPage.createAccount(user.firstName, user.lastName, user.email, user.password)
    // Login with new user account
    await loginPage.login(user.email, user.password)

    //Assert
    // Verify is new user logged in? 
    await loginPage.VerifyButtonIsVisible(loginPage.logOutButton, 1000) //Verify Logout button after login
    await loginPage.VerifyWelcomMessage(user.firstName, user.lastName, 1000) //Verify Welcome message after login
  })
})
