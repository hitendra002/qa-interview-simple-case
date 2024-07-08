import { Locator, Page, expect, } from '@playwright/test'

export class SignupPage{
    private page: Page
    private firstNameInput: Locator
    private lastNameInput: Locator
    private emailInput: Locator
    private passwordInput: Locator
    private submitButton: Locator
    private logOutButton: Locator

    //Locators from Signup webpage
    constructor(page: Page){
        this.page = page
        this.firstNameInput = page.locator('#firstName')
        this.lastNameInput = page.locator('#lastName')
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.submitButton = page.getByRole('button', { name: 'SUBMIT'})
        this.logOutButton = page.getByRole('button', { name: 'LOG OUT'})
    }

    /**
     * This method used to navigate to signup webpage
     */
    async navigateTo(){
        await this.page.goto('/signup')
    }

    /**
     * This method used to create new account
     * @param firstName User's first name
     * @param lastName User's last name
     * @param email User's email address
     * @param password  User's password
     */
    async createAccount(firstName: string, lastName: string, email: string, password: string){
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
        await expect(this.logOutButton).toBeVisible()
        await this.logOutButton.click()
    }
}