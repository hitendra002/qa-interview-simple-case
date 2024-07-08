import { Locator, Page, expect, } from '@playwright/test'

export class LoginPage{
    private page: Page
    private userNameInput: Locator
    private passwordInput: Locator
    private logInButton: Locator
    readonly logOutButton: Locator
    private welcomeMessage: any

    //Locators from Login webpage
    constructor(page: Page){
        this.page = page
        this.userNameInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.logInButton = page.getByRole('button', { name: 'LOGIN'})
        this.logOutButton = page.getByRole('button', { name: 'LOG OUT'})
        this.welcomeMessage = (firstName: string, lastName: string) => page.getByText(`Welcome ${firstName} ${lastName}`)
    }

    /**
     * This method used to navigate to Login webpage
     */
    async navigateTo(){
        await this.page.goto('/login')
    }

    async enterUserName(userName: string){
        await this.userNameInput.fill(userName)
    }

    async enterPassword(password: string){
        await this.passwordInput.fill(password)
    }

    async clickLogInButton(){
        await this.logInButton.click()
    }

    async clickLogOutButton(){
        await this.logOutButton.click()
    }

    /**
     * This method used to login Strawberry QA application
     * @param userName Username for login
     * @param password Password for login
     */
    async login(userName: string, password: string){
        await this.enterUserName(userName)
        await this.enterPassword(password)
        await this.clickLogInButton()
    }

    /**
     * This method is used to assert UI button visibility
     * @param button UI button locator
     * @param timeOut timeout to wait for visibility
     */
    async VerifyButtonIsVisible(button: Locator, timeOut?: number){
        await expect(button).toBeVisible({ timeout: timeOut })
    }

    /**
     * This method is used to assert Welcome message after user login
     * @param firstName User's first name
     * @param lastName User's last name
     * @param timeOut timeout to wait for visibility
     */
    async VerifyWelcomMessage(firstName: string, lastName: string, timeOut?: number){
        await expect(this.welcomeMessage(firstName, lastName)).toBeVisible({ timeout: timeOut })
    }
}