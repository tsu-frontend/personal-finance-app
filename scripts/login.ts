type TFormData = {
  name?: { value: null | string; isValid: boolean };
  email: { value: null | string; isValid: boolean };
  password: { value: null | string; isValid: boolean };
};

class SignInForm {
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
    };

    this.setUpListeners();
  }

  static validateEmail(email: string | null): boolean {
    return !!email && SignInForm.EMAIL_REGEX.test(email);
  }

  static validatePassword(password: string | null): boolean {
    return !!password && SignInForm.PASSWORD_REGEX.test(password);
  }

  validate(): boolean {
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
        element.addEventListener("click", (e: MouseEvent) => {
          e.preventDefault();
          // run validation
          this.validate();
        });
      } else {
        element.addEventListener("change", (e) => {
          const target = e.target as HTMLInputElement;

          if (this.data[name as keyof TFormData]) {
            this.data[name as keyof TFormData]!.value = value;
          }

          // run validation
          let valid = this.validate();
          if (valid) {
            console.log("Form is valid");
          } else {
            console.log("Form is invalid");
          }
          //
        });
      }
    });
  }
}

class SignUpForm extends SignInForm {
  constructor(element: HTMLFormElement) {
    super(element);
    this.data = { ...this.data };
    this.data.name = { value: null, isValid: false };
  }

  static validateName(name: string | null): boolean {
    console.log("validating name:", name);

    return typeof name === "string" && name.trim().length >= 3;
  }

  validate(): boolean {
    const { name, email, password } = this.data;
    let valid = true;

    if (SignUpForm.validateName(name?.value || null)) {
      console.log("name is valid");
    } else {
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
const newSignUpForm = new SignUpForm(signUpForm as HTMLFormElement);

const signInForm = document.getElementById("signin-form");
const newSignInForm = new SignInForm(signInForm as HTMLFormElement);

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
