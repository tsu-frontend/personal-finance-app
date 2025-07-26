class FormManager {
    constructor(element) {
        this.formElement = element;
        this.inputs = this.formElement.elements;
        this.valid = false;
        this.data = {
            email: { value: null, isValid: false },
            password: { value: null, isValid: false },
            name: { value: null, isValid: false },
        };
        this.validation();
        this.submit();
    }
    validate(name, value) {
        if (name === "email") {
            return !!value && /^\S+@\S+\.\S+$/.test(value);
        }
        if (name === "password") {
            return !!value && /^.{8,}$/.test(value);
        }
        if (name === "name") {
            return !!value && value.trim().length >= 3;
        }
    }
    validation() {
        [...this.inputs].forEach((element) => {
            if (element instanceof HTMLInputElement) {
                element.addEventListener("change", (e) => {
                    const target = e.target;
                    const value = target.value;
                    if (target.name === "email")
                        this.data.email.isValid = this.validate("email", value);
                    if (target.name === "password")
                        this.data.password.isValid = this.validate("password", value);
                    if (target.name === "name")
                        this.data.name.isValid = this.validate("name", value);
                });
            }
        });
    }
    submit() {
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            const requiredFields = this.formElement.id === "signup-form" ? ["email", "password", "name"] : ["email", "password"];
            const submittable = requiredFields.every((input) => this.data[input].isValid);
            if (submittable) {
                console.log("form is valid");
            }
            else {
                console.log("form is invalid");
            }
        });
    }
}
const signInForm = document.getElementById("signin-form");
const signUpForm = document.getElementById("signup-form");
const newSignInForm = new FormManager(signInForm);
const newSignUpForm = new FormManager(signUpForm);
