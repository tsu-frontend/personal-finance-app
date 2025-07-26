type TFormData = {
  name?: { value: null | string; isValid: boolean };
  email: { value: null | string; isValid: boolean };
  password: { value: null | string; isValid: boolean };
};

class FormManager {
  data: TFormData;
  public formElement: HTMLFormElement;
  public inputElementsList: HTMLFormControlsCollection;
  public valid: boolean;

  private static EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  private static PASSWORD_REGEX = /^.{8,}$/;

  constructor(element: HTMLFormElement) {
    this.formElement = element;
    this.inputElementsList = this.formElement.elements;
    this.valid = false;

    this.data = {
      email: { value: null, isValid: false },
      password: { value: null, isValid: false },
      name: { value: null, isValid: false },
    };

    this.validation();
    this.submit();
  }

  private validate(name: string, value: string): boolean {
    let result = false;
    if (name === "email") {
      result = !!value && FormManager.EMAIL_REGEX.test(value);
    }
    if (name === "password") {
      result = !!value && FormManager.PASSWORD_REGEX.test(value);
    }
    if (name === "name") {
      result = !!value && value.trim().length >= 3;
    }
    console.log(name, value, result);
    return result;
  }

  validation() {
    [...this.inputElementsList].forEach((element) => {
      if (element instanceof HTMLInputElement) {
        element.addEventListener("change", (e) => {
          const target = e.target as HTMLInputElement;

          const value = target.value;
          if (target.name === "email") {
            this.data.email.isValid = this.validate("email", value);
          }
          if (target.name === "password") {
            this.data.password.isValid = this.validate("password", value);
          }
          if (target.name === "name") {
            this.data.name.isValid = this.validate("name", value);
          }
        });
      }
    });
  }

  submit() {
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      let submittable;
      if (this.formElement.id === "signin-form") {
        submittable = this.data.email.isValid && this.data.password.isValid;
      } else if (this.formElement.id === "signup-form") {
        submittable = this.data.email.isValid && this.data.password.isValid && this.data.name.isValid;
      }
      if (submittable) {
        console.log("form is valid");
      } else {
        console.log("form is invalid");
      }
    });
  }
}

const signInForm = document.getElementById("signin-form");
const signUpForm = document.getElementById("signup-form");
const newSignInForm = new FormManager(signInForm as HTMLFormElement);
const newSignUpForm = new FormManager(signUpForm as HTMLFormElement);
