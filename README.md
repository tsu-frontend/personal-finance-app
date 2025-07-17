# Project Goals

The user should not have access to the main pages without going through the verification process, which is:

## Sign Up Page

### **Sign up form should include the following inputs:**

- Name
- Email
- Password

**After successfully signing up, the user should verify their email before being redirected to the `login page`.**

## Login Page

### **Login form should include the following inputs:**

- Email
- Password

**After successfully logging in, the user should be redirected to the `overview page`.**

## Form manager will be written in typescript



## Forms should be connected to the following Supabase Integration

- Store user credentials securely in Supabase Auth.
- Handle authentication, registration, and session management via Supabase APIs.
- Ensure error handling for failed sign up or login attempts.
- Use environment variables to store Supabase URL and API key.
- Validate form inputs before sending data to Supabase.
- After frontend validation, perform Supabase backend validation, which will return a success or fail flag. Only on success should the user be allowed to proceed to the following pages.
