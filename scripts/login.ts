import { SUPABASE_URL, PUBLIC_KEY } from "./api/supabaseConfig.js";

// const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`;
// const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`;

type TFormData = {
  name: { value: null | string; isValid: boolean };
  email: { value: null | string; isValid: boolean };
  password: { value: null | string; isValid: boolean };
};

class FormManager {
  data: TFormData;
  public formElement: HTMLFormElement;
  public inputs: HTMLFormControlsCollection;
  public valid: boolean;

  constructor(element: HTMLFormElement) {
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

  private validate(name: string, value: string): boolean {
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
          const target = e.target as HTMLInputElement;
          const value = target.value;

          if (target.name === "email") this.data.email.isValid = this.validate("email", value);
          if (target.name === "password") this.data.password.isValid = this.validate("password", value);
          if (target.name === "name") this.data.name.isValid = this.validate("name", value);
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

        const body: { email: string; password: string; name?: string } = {
          email: this.data.email.value,
          password: this.data.password.value,
        };

        if (this.formElement.id === "signup-form") {
          body.name = this.data.name.value;
        }

        fetch(`${SUPABASE_URL}/auth/v1/${this.formElement.id === "signup-form" ? "signup" : "token?grant_type=password"}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: PUBLIC_KEY,
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
      } else {
        console.log("form is invalid");
      }
    });
  }
}

const signInform = new FormManager(document.getElementById("signin-form") as HTMLFormElement);
const signUpForm = new FormManager(document.getElementById("signup-form") as HTMLFormElement);
