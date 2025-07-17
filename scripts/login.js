class SignUpForm {
    constructor(element) {
        this.formElement = element;
        this.inputElementsList = this.formElement.elements;
        this.valid = false;
        this.data = {
            name: { value: null, isValid: false },
            email: { value: null, isValid: false },
            password: { value: null, isValid: false },
        };
        this.setUpListeners();
    }
    setUpListeners() {
        [...this.inputElementsList].forEach((element) => {
            if (element instanceof HTMLButtonElement) {
                element.addEventListener("click", (e) => {
                    e.preventDefault();
                    //
                    console.log("clicked");
                });
            }
            else {
                element.addEventListener("change", (e) => {
                    const target = e.target;
                    //
                    console.log("change");
                });
            }
        });
    }
}
const signUpForm = document.getElementById("signup-form");
const newSignUpForm = new SignUpForm(signUpForm);
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
class SignInForm extends SignUpForm {
    constructor(element) {
        super(element);
        this.formElement = element;
        this.inputElementsList = this.formElement.elements;
        this.valid = false;
        this.data = {
            email: { value: null, isValid: false },
            password: { value: null, isValid: false },
        };
        this.setUpListeners();
    }
    setUpListeners() {
        [...this.inputElementsList].forEach((element) => {
            if (element instanceof HTMLButtonElement) {
                element.addEventListener("click", (e) => {
                    e.preventDefault();
                    //
                    console.log("clicked");
                });
            }
            else {
                element.addEventListener("change", (e) => {
                    const target = e.target;
                    //
                    console.log("change");
                });
            }
        });
    }
}
const signInForm = document.getElementById("signin-form");
const newSignInForm = new SignInForm(signInForm);
