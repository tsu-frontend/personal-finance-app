class SignInForm {
    constructor(element) {
        this.formElement = element;
        this.inputElementsList = this.formElement.elements;
        this.valid = false;
        this.data = {
            email: { value: null, isValid: false },
            password: { value: null, isValid: false },
        };
        this.setUpListeners();
    }
    static validateEmail(email) {
        return !!email && SignInForm.EMAIL_REGEX.test(email);
    }
    static validatePassword(password) {
        return !!password && SignInForm.PASSWORD_REGEX.test(password);
    }
    validate() {
        const { email, password } = this.data;
        let valid = true;
        if (!SignInForm.validateEmail(email.value)) {
            valid = false;
            console.log("email not valid");
        }
        if (!SignInForm.validatePassword(password.value)) {
            valid = false;
            console.log("password under 8 characters");
        }
        this.valid = valid;
        return valid;
    }
    setUpListeners() {
        [...this.inputElementsList].forEach((element) => {
            if (element instanceof HTMLButtonElement) {
                element.addEventListener("click", (e) => {
                    e.preventDefault();
                    // run validation
                    this.validate();
                });
            }
            else {
                element.addEventListener("change", (e) => {
                    const target = e.target;
                    if (this.data[name]) {
                        this.data[name].value = value;
                    }
                    // run validation
                    let valid = this.validate();
                    if (valid) {
                        console.log("Form is valid");
                    }
                    else {
                        console.log("Form is invalid");
                    }
                    //
                });
            }
        });
    }
}
SignInForm.EMAIL_REGEX = /^\S+@\S+\.\S+$/;
SignInForm.PASSWORD_REGEX = /^.{8,}$/;
class SignUpForm extends SignInForm {
    constructor(element) {
        super(element);
        this.data = Object.assign({}, this.data);
        this.data.name = { value: null, isValid: false };
    }
    static validateName(name) {
        console.log("validating name:", name);
        return typeof name === "string" && name.trim().length >= 3;
    }
    validate() {
        const { name, email, password } = this.data;
        let valid = true;
        if (SignUpForm.validateName((name === null || name === void 0 ? void 0 : name.value) || null)) {
            console.log("name is valid");
        }
        else {
            valid = false;
            console.log("name under 3 characters");
        }
        // if (!SignInForm.validateEmail(email.value)) {
        //   valid = false;
        //   console.log("email not valid");
        // }
        // if (!SignInForm.validatePassword(password.value)) {
        //   valid = false;
        //   console.log("password under 8 characters");
        // }
        this.valid = valid;
        return valid;
    }
}
const signUpForm = document.getElementById("signup-form");
const newSignUpForm = new SignUpForm(signUpForm);
const signInForm = document.getElementById("signin-form");
const newSignInForm = new SignInForm(signInForm);
///////////////////////////////////////////////////////////////////////////////////
// validation
newSignUpForm.formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    if (newSignUpForm.validate()) {
        console.log("valid");
        //
    }
});
newSignInForm.formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    if (newSignInForm.validate()) {
        console.log("valid");
        //
    }
});
