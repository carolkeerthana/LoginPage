const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.querySelector('.btn button');

document.addEventListener('DOMContentLoaded', focusEmailInput);

function focusEmailInput(){
    emailInput.focus();
}

// Define valid credentials (hardcoded for testing)
const validCredentials = {
    "keerthana0497@gmail.com": "Abcd1234",
    "anotheruser@example.com": "Password123"
};

function validateEmail(email) {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
    const lengthRequirement = password.length >= 8;
    const uppercaseRequirement = /[A-Z]/.test(password);
    const lowercaseRequirement = /[a-z]/.test(password);
    const numberRequirement = /[0-9]/.test(password);
    
    return lengthRequirement && uppercaseRequirement && lowercaseRequirement && numberRequirement;
}


function login(email, password) {
   
    // Check if email and password are valid
    if (validCredentials.hasOwnProperty(email) && validCredentials[email] === password) {

        window.location.href = './todo.html';
    } else {
        if (!validateEmail(email) && !validatePassword(password)) {
            alert('Incorrect email and password');
        } else if (!validatePassword(password)){
            alert('Incorrect password');
        }else if (!validateEmail(email)){
        alert('Incorrect email Id');
        // return false;
        }
    }

}
document.addEventListener('DOMContentLoaded', ()=>{
// Add onclick event listener to the login button
loginButton.addEventListener('click', function(event) {
    event.preventDefault();
    // Retrieve email and password from input fields
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    // Call the login function with provided credentials
    login(email, password);
});
});

// Function to check if both email and password fields are empty
function areFieldsEmpty() {
  return emailInput.value.trim() === '' || passwordInput.value.trim() === '';
}

// Function to enable or disable the login button based on field values
function updateLoginButtonState() {
  const fieldsEmpty = areFieldsEmpty();
  loginButton.disabled = fieldsEmpty;
  if (fieldsEmpty) {
      loginButton.classList.add('disabled'); 
  } else {
      loginButton.classList.remove('disabled');
  }
}

emailInput.addEventListener('input', updateLoginButtonState);
passwordInput.addEventListener('input', updateLoginButtonState);

updateLoginButtonState();

  module.exports = {
    validateEmail,
    validatePassword,
    login,
    updateLoginButtonState,
    focusEmailInput
  };
  