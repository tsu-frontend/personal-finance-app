import { FormUtility } from "./utilities/formUtility.js";
class SignInForm {
    constructor(element) {
        this.formElement = element;
        this.inputElementsList = this.formElement.elements;
        this.valid = false;
        this.data = {
            email: { value: null, isValid: false },
            password: { value: null, isValid: false },
        };
        this.formUtility = new FormUtility();
        this.setUpListeners();
    }
    setUpListeners() {
        [...this.inputElementsList].forEach((element) => {
            if (element instanceof HTMLButtonElement) {
                element.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log(e);
                });
            }
            else if (element instanceof HTMLInputElement) {
                element.addEventListener("change", (e) => {
                    // console.log(element.value)
                    this.validateInputValue(element);
                });
            }
        });
    }
    validateInputValue(target) {
        if (target.type === "email") {
            const isEmailValid = this.formUtility.emailValidator(target.value);
            this.data.email.value = target.value;
            this.data.email.isValid = isEmailValid;
            console.log("dsd");
        }
        if (target.type === "password") {
            const isPasswordValid = this.formUtility.passwordValidator(target.value);
            this.data.password.value = target.value;
            this.data.password.isValid = isPasswordValid;
        }
        if (target.type === "name") {
            if (target.name === "name") {
                const isNameValid = this.formUtility.nameValidator(target.value);
                this.data.name.value = target.value;
                this.data.name.isValid = isNameValid;
            }
        }
    }
    async submitFormData(formData) { }
}
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
class SignUpForm extends SignInForm {
    constructor(element) {
        super(element);
        this.data = Object.assign(Object.assign({}, this.data), { name: { value: null, isValid: false } });
    }
}
const signInForm = document.getElementById("signin-form");
const newSignInForm = new SignInForm(signInForm);
// console.log(newSignInForm);
const signUpForm = document.getElementById("signup-form");
const newSignUpForm = new SignUpForm(signUpForm);
