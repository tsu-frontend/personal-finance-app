export class FormUtility {
    emailValidator(emailValue) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = pattern.test(emailValue);
        console.log(result ? "valid email" : "invalid email");
        return result;
    }
    passwordValidator(passwordValue) {
        const result = passwordValue.length >= 6;
        console.log(result ? "password is valid" : "password is invalid");
        return result;
    }
    nameValidator(nameValue) {
        const result = nameValue.length >= 2;
        console.log(result ? "valid name" : "invalid name");
        return result;
    }
}
