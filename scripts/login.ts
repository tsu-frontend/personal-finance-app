import { FormUtility } from "./utilities/formUtility.js";

interface TSignIn {
  email: { value: null | string; isValid: boolean };
  password: { value: null | string; isValid: boolean };
}
interface TSignUp extends TSignIn {
  name: { value: null | string; isValid: boolean };
}

class SignInForm {
  data: TSignIn;

  public formElement: HTMLFormElement;
  public inputElementsList: HTMLFormControlsCollection;
  public valid: boolean;
  public formUtility: FormUtility;

  constructor(element: HTMLFormElement) {
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
        element.addEventListener("click", (e: MouseEvent) => {
          e.preventDefault();
          console.log(e);
        });
      } else if (element instanceof HTMLInputElement) {
        element.addEventListener("change", (e: Event) => {
          // console.log(element.value)

          this.validateInputValue(element);
        });
      }
    });
  }
  validateInputValue(target: HTMLInputElement) {
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

  async submitFormData(formData: TSignIn) {}
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

class SignUpForm extends SignInForm {
  data: TSignUp;

  constructor(element: HTMLFormElement) {
    super(element);

    this.data = {
      ...this.data,
      name: { value: null, isValid: false },
    };
  }

}

const signInForm = document.getElementById("signin-form");
const newSignInForm = new SignInForm(signInForm as HTMLFormElement);
// console.log(newSignInForm);

const signUpForm = document.getElementById("signup-form");
const newSignUpForm = new SignUpForm(signUpForm as HTMLFormElement);
