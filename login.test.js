const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './signup.html'), 'utf8');
document.body.innerHTML = html;
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

const { validateEmail, validatePassword,updateLoginButtonState, login, displayPasswordRecoveryModal, redirectToFacebookRegistration,isErrorMessageDisplayed,focusEmailInput,} = require('./login');
const loginButton = document.getElementById('loginbutton');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const container =require('./login');
const exp = require('constants');



delete global.window.location;
global.window = Object.create(window);

// Mock the function that sets the window location
global.window.location = {
    href: '',
};
global.alert = jest.fn();

delete window.location;
window.location = { href: '' };

const mockRedirect = jest.fn(); // Mock redirect function
// Mock error display callback
const mockErrorDisplay = jest.fn();
     
describe('Login component test', ()=>{

  test('login page has container', () =>{
   const container = document.querySelector('.container');
   expect(container).toBeTruthy();
  })

  test('check if there is two container in the login page', () =>{
    const containers = document.querySelectorAll('.container');
    expect(containers.length).toBe(2);
  })

  test('check whether login text is present in the container', () => {
    const h2Text = document.querySelector('h2');
    console.log(h2Text.textContent)
    expect(h2Text.textContent).toMatch(/Login/);
  })

  test('Label with text Email exists', ()=>{
    const emailLabel = document.querySelector('label[for="emailInput"]');
    expect(emailLabel).toBeTruthy();
    expect(emailLabel.textContent).toBe('Email');
  });

  test('Label with text password exists', ()=>{
    const passwordLabel = document.querySelector('label[for="passwordInput"]');
    expect(passwordLabel).toBeTruthy();
    expect(passwordLabel.textContent).toBe('Password');
  });

  test('login page has input field for email', ()=>{
      const emailInput = document.querySelector('#emailInput');
      expect(emailInput).toBeInTheDocument();
  });

  test('Email label exists', ()=>{
    const emailLabel = document.querySelector('label[for="emailInput"]');
    expect(emailLabel).toBeTruthy();
  });

  test('Label with text Email exists', ()=>{
    const emailLabel = document.querySelector('label[for="emailInput"]');
    expect(emailLabel.textContent).toBe('Email');
  });
  
  test('login page has input field for password', ()=>{ 
      const passwordInput = document.querySelector('#passwordInput');
      expect(passwordInput).toBeInTheDocument();
  });
  
  test('login page has Login button', ()=>{ 
    const loginInput = document.querySelector('.btn'); 
    expect(loginInput).toBeInTheDocument();
  });

  test('forgot password option is visible on the page', () =>{
    const forgotPasswordLink= document.getElementById('forgotPasswordLink');
    expect(forgotPasswordLink).toBeVisible();
  })

  test('checks if forgot password link is clickable', () =>{
    const forgotPasswordLink= document.getElementById('forgotPasswordLink');
    expect(forgotPasswordLink).toBeVisible();
    fireEvent.click(forgotPasswordLink);
  })

  test('create account option is visible on the page', () =>{
    const createAccountLink= document.getElementById('createAccountLink');
    expect(createAccountLink).toBeVisible();
  })

  test('checks if create account link is clickable', () =>{
    const createAccountLink= document.getElementById('createAccountLink');
    expect(createAccountLink).toBeVisible();
    fireEvent.click(createAccountLink);
  })
})

describe('Focus on email input field', () => {
  test('Check if focus is on the email input field after DOM is loaded', () => {
    // Simulate DOMContentLoaded event
    document.dispatchEvent(new Event('DOMContentLoaded'));

    // Check if the focus is on the username field
    const focusedElement = document.activeElement;
    const emailInput = document.getElementById('emailInput');

    expect(focusedElement).toEqual(emailInput);
  });
});

describe('positioning of the fields',()=>{

  test('Login text is centered in the container', () => {

    const container = document.querySelector('.container');
    const loginText = container.querySelector('h2');

    const containerRect = container.getBoundingClientRect();
    const loginTextRect = loginText.getBoundingClientRect();

    // Calculate the horizontal center position of the container
   
    const containerCenter = containerRect.left + containerRect.width / 2;
    console.log('Left:', containerRect.left);
console.log('Width:', containerRect.width);


    // Calculate the acceptable range around the center of the container
    const tolerance = containerRect.width / 4; // 50% of the container width

    // Verify that the horizontal center position of the "Login" text falls within the acceptable range
    expect(loginTextRect.left + loginTextRect.width / 2).toBeGreaterThanOrEqual(containerCenter - tolerance);
    expect(loginTextRect.left + loginTextRect.width / 2).toBeLessThanOrEqual(containerCenter + tolerance);
});


  test('the Email text is positioned above the email input field', () => {
      const emailLabel = screen.getByLabelText('Email');
      const emailInput = document.getElementById('emailInput');
  
      const labelRect  = emailLabel.getBoundingClientRect();
      const inputRect  = emailInput.getBoundingClientRect();
  
      expect(labelRect.bottom).toBeLessThanOrEqual(inputRect.top);
      // expect(emailLabelRect.left).toEqual(emailInputRect.left); // Ensure horizontal alignment
  });

  test('the password text is positioned above the password input field', () => {
    const passwordLabel = screen.getByLabelText('Password');
    const passwordInput = document.getElementById('passwordInput');

    const labelRect  = passwordLabel.getBoundingClientRect();
    const inputRect  = passwordInput.getBoundingClientRect();

    expect(labelRect.bottom).toBeLessThanOrEqual(inputRect.top);
});
});

describe('Login button enabled or disabled', ()=>{
  test('email and password field is empty, login button is disabled', ()=>{
    updateLoginButtonState();
    expect(loginButton.disabled).toBe(true);
  });

  test('email and password field is empty, login button is disabled', ()=>{
    emailInput.value = 'keerthana0497@gmail.com';
    passwordInput.value = 'Abcd1234';
    updateLoginButtonState();
    expect(loginButton.disabled).toBe(false);
  });

  test('snapshot of disabled login button', () => {
    // Set up DOM and call updateLoginButtonState to disable the button
    emailInput.value = '';
    passwordInput.value = '';
    updateLoginButtonState();

    // Take a snapshot of the login button's HTML representation
    document.body.innerHTML = loginButton.outerHTML;

    // Take a snapshot of the login button's computed styles
    const buttonStyles = window.getComputedStyle(loginButton);
    const buttonSnapshot = {};
    Object.keys(buttonStyles).forEach((styleName) => {
      buttonSnapshot[styleName] = buttonStyles[styleName];
    });

    expect(buttonSnapshot).toMatchSnapshot();
  });

  test('snapshot of enabled login button', () => {
    // Set up DOM and call updateLoginButtonState to enable the button
    emailInput.value = 'keerthana0497@gmail.com';
    passwordInput.value = 'Abcd1234';
    updateLoginButtonState();
  
    // Take a snapshot of the login button's HTML representation
    document.body.innerHTML = loginButton.outerHTML;
  
    // Take a snapshot of the login button's computed styles
    const buttonStyles = window.getComputedStyle(loginButton);
    const buttonSnapshot = {};
    Object.keys(buttonStyles).forEach((styleName) => {
      buttonSnapshot[styleName] = buttonStyles[styleName];
    });
  
    expect(buttonSnapshot).toMatchSnapshot();
  });
  

});

// Test email validation
describe('email validation', ()=>{

  test('Valid email should pass validation', () => {
      expect(validateEmail('user@example.com')).toBe(true);
    });
  
  test('Invalid email should fail validation', () => {
      expect(validateEmail('userexample.com')).toBe(false);
    });
})

  // Test password validation
  describe('password validation', ()=>{

    test('Valid password should pass validation', () => {
        expect(validatePassword('Abcd1234')).toBe(true);
      });
    
      test('Password less than 8 characters should fail validation', () => {
        expect(validatePassword('Abcd123')).toBe(false);
      });
      
      test('Password without uppercase letter should fail validation', () => {
        expect(validatePassword('abcd1234')).toBe(false);
      });
      
      test('Password without lowercase letter should fail validation', () => {
        expect(validatePassword('ABCD1234')).toBe(false);
      });
      
      test('Password without number should fail validation', () => {
        expect(validatePassword('Abcdefgh')).toBe(false);
      });
  })

// describe('checking error msg if fields are empty', ()=>{
//   test('should display error message when both email and password fields are empty', () => {
//     // Call login function with empty email and password
//     login('', '', mockRedirect, mockErrorDisplay);

//     // Check if error message is displayed
//     expect(mockErrorDisplay).toHaveBeenCalledWith('Please enter your email and password');
// });
// })

// Scenario: Both email and password are correct
test('Both email and password correct should call redirect callback with todo', () => {
    login('keerthana0497@gmail.com', 'Abcd1234');
    expect(global.window.location.href).toBe('./todo.html');
  });
  
  // Scenario: Email is correct but password is wrong
  test('Correct email but wrong password', () => {
    login('user@example.com', 'wrongpassword');
    expect(global.alert).toHaveBeenCalledWith('Incorrect password');
  });
  
  // Scenario: Email is wrong but password is correct
  test('Wrong email but correct password', () => {
    login('wrongemailexample.com', 'Abcd1234');
    expect(global.alert).toHaveBeenCalledWith('Incorrect email Id');
  });

  // Scenario: Both Email and password is wrong
  test('Wrong email and password', () => {
    login('wrongemailexample.com', 'wrongpassword');
    expect(global.alert).toHaveBeenCalledWith('Incorrect email and password');
  });

  describe('HTML Elements', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

  test('forgot password link has correct href attribute', () => {
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const href = forgotPasswordLink.getAttribute('href');
    expect(href).toBe('forgotpassword.html');
});

test('should redirect to a specific page when the "Create account" link is clicked', ()=>{   
  const createAccountLink = document.getElementById('createAccountLink');
  const href = createAccountLink.getAttribute('href');
  expect(href).toContain('https://www.facebook.com/register');
});
});



// describe('Login Button Event Listener', () => {
//   test('login button should be enabled after filling email and password fields', () => {
//     // Mock the input values for email and password
//     const emailInput = document.getElementById('emailInput');
//     const passwordInput = document.getElementById('passwordInput');
//     emailInput.value = 'test@example.com';
//     passwordInput.value = 'password123';

//     // Trigger input events on email and password fields
//     emailInput.dispatchEvent(new Event('input'));
//     passwordInput.dispatchEvent(new Event('input'));

//     // Retrieve the login button
//     const loginButton = document.querySelector('.btn button');

//     // Enable the login button (since it should initially be disabled)
//     loginButton.disabled = false;

//     // Assert that the button is initially disabled
//     expect(loginButton.disabled).toBe(true);

//     // Trigger a click event on the login button
//     loginButton.click();

//     // Now the login button should be enabled
//     expect(loginButton.disabled).toBe(false);
// });

// });

// Import necessary functions and modules
const { JSDOM } = require('jsdom');

describe('Login Button Click Event', () => {
  let window;
  let loginButton;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><button id="loginButton">Login</button>');
    window = dom.window;
    global.document = window.document;
    loginButton = document.getElementById('loginButton');
  });

  test('Login button click should call login function with email and password', () => {
    // Mock email and password input values
    document.getElementById('emailInput').value = 'keerthana0497@gmail.com';
    document.getElementById('passwordInput').value = 'Abcd1234';

    // Simulate click event on the login button
    const event = new window.Event('click');
    loginButton.dispatchEvent(event);

    // Verify that the login function is called with correct credentials
    expect(login).toHaveBeenCalledWith('keerthana0497@gmail.com', 'Abcd1234');
  });
});