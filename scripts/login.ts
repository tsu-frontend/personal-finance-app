import { FormUtility } from "./utilities/formUtility.js";
import { ServiceManager } from "https://esm.sh/supabase-service-manager";
import { User, UserTransactions } from "./user.js";

export const SupaClient = new ServiceManager({
  supabase: {
    url: "https://dhpewqtvbasnugkfiixs.supabase.co",
    anonKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk",
  },
});
interface TSignIn {
  email: { value: null | string; isValid: boolean };
  password: { value: null | string; isValid: boolean };
}
interface TSignUp extends TSignIn {
  name: { value: null | string; isValid: boolean };
}

// const currentUser = new User();
// console.log(currentUser);

class SignInForm {
  data: TSignIn;

  public listenersList: ((element: HTMLInputElement) => void)[];

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
    this.listenersList = [this.validatePassword, this.validateEmail];
    this.setUpListeners();
  }

  setUpListeners() {
    [...this.inputElementsList].forEach((element) => {
      if (element instanceof HTMLButtonElement) {
        element.addEventListener("click", (e: MouseEvent) => {
          e.preventDefault();
          this.submitFormData(this.data);
        });
      } else if (element instanceof HTMLInputElement) {
        element.addEventListener("change", (e: Event) => {
          this.listenersList.forEach((listener) => {
            listener(element);
          });
        });
      }
    });
  }
  validateEmail = (target: HTMLInputElement) => {
    if (target.type === "email") {
      const isEmailValid = this.formUtility.emailValidator(target.value);
      this.data.email.value = target.value;
      this.data.email.isValid = isEmailValid;
    }
  };
  validatePassword = (target: HTMLInputElement) => {
    if (target.type === "password") {
      const isPasswordValid = this.formUtility.passwordValidator(target.value);
      this.data.password.value = target.value;
      this.data.password.isValid = isPasswordValid;
    }
  };

  async submitFormData(formData: TSignIn) {
    // console.log(formData);
    if (!formData.email.isValid || !formData.password.isValid) {
      console.log("email or password is invalid ");
      return;
    }
    // console.log("valid");
    try {
      const response = await SupaClient.signIn(
        formData.email.value,
        formData.password.value
      );
      console.log(response);
      if (response.success) {
        signOutBtn.style.display = "block";
        this.formElement.style.display = "none";
      }
    } catch {}
  }
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
    this.listenersList.push(this.validateName);
  }

  validateName = (target: HTMLInputElement) => {
    if (target.type === "text") {
      const isNameValid = this.formUtility.nameValidator(target.value);
      this.data.name.value = target.value;
      this.data.name.isValid = isNameValid;
    }
  };
  async submitFormData(formData: TSignUp) {
    // console.log(formData);
    if (
      !formData.email.isValid ||
      !formData.password.isValid ||
      !formData.name.isValid
    ) {
      console.log("email, name or password is invalid ");
      return;
    }
    // console.log("valid");
    try {
      const response = await SupaClient.signUp(
        formData.email.value,
        formData.password.value,
        { firstName: formData.name.value }
      );
      console.log(response);
    } catch {}
  }
}

const signOutBtn = document.getElementById("signOut");

const signInForm = document.getElementById("signin-form");
const newSignInForm = new SignInForm(signInForm as HTMLFormElement);

const signUpForm = document.getElementById("signup-form");
const newSignUpForm = new SignUpForm(signUpForm as HTMLFormElement);

signOutBtn.addEventListener("click", () => {
  SupaClient.signOut();
  signInForm.style.display = "flex";
  signOutBtn.style.display = "none";
});

// SupaClient.getCurrentUser().then((res) => {
//   if (res.success) {
//     signOutBtn.style.display = "block";
//     const currentUser = new User(res.data);
//   } else {
    signInForm.style.display = "flex"; //??
//   }
// });
const currentUser = new User(SupaClient)



