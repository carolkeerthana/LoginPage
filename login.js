const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const emailErrorMessage = document.getElementById('emailErrorMessage');
const passwordErrorMessage = document.getElementById('passwordErrorMessage');
const loginButton = document.querySelector('.btn button');

document.addEventListener('DOMContentLoaded', focusEmailInput);

function focusEmailInput(){
    if (emailInput) {
    emailInput.focus();
    }
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
    console.log('Login function called');

    // const errorMessageElement = document.getElementById('errorMessage');
     
    // Check if email and password are empty
    // if (email.trim() === '') {
    //     errorMessageElement.innerText = 'Please enter your email Id';
    //     errorMessageElement.style.display = 'block';
    //     return false;
    // }
    
    // if (password.trim() === '') {
    //     errorMessageElement.innerText = 'Please enter your password';
    //     errorMessageElement.style.display = 'block';
    //     return false;
    // }
   
    // Check if email and password are valid
    if (validCredentials.hasOwnProperty(email) && validCredentials[email] === password) {
        // Redirect to Todo page upon successful login
        // redirect('./todo.html');
        // return true;
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
      loginButton.classList.add('disabled'); // Add disabled class
  } else {
      loginButton.classList.remove('disabled'); // Remove disabled class
  }
}

// Event listener for email field input
emailInput.addEventListener('input', updateLoginButtonState);

// Event listener for password field input
passwordInput.addEventListener('input', updateLoginButtonState);

// Update the button state initially
updateLoginButtonState();


    // Event listener for email field blur
    // emailInput.addEventListener('blur', function() {
    //     if (emailInput.value.trim() === '') {
    //         emailErrorMessage.style.display = 'block';
    //     } else if(emailInput>0){
    //         emailErrorMessage.style.display = 'none';
    //     }
    //     if (emailInput.value.trim() !== '') {
    //         passwordInput.focus();
    //     }
    //     passwordErrorMessage.style.display = 'none';
    // });

    // emailInput.addEventListener(focus, function(){
    //     emailErrorMessage.style.display = none;
    // })

    // // Event listener for password field blur
    // passwordInput.addEventListener('blur', function() {
    //     if (passwordInput.value.trim() === '') {
    //         passwordErrorMessage.style.display = 'block';
    //     } else {
    //         passwordErrorMessage.style.display = 'none';
    //     }
    //       // Hide the email error message when interacting with the password field
    //       emailErrorMessage.style.display = 'none';
    // });
    //  // Event listener for password field focus
    // passwordInput.addEventListener('focus', function() {
    //     passwordErrorMessage.style.display = 'none';
    // });

    // Event listener for login button click
//     loginButton.addEventListener('click', function(event) {
//         event.preventDefault(); // Prevent form submission for demonstration purposes
//         if (passwordInput.value.trim() === '') {
//             passwordErrorMessage.style.display = 'block';
//             passwordInput.focus(); // Set focus on the password input field
//         }
//     });
// });

// function helper(){
//     console.log('Helper');
// }

  module.exports = {
    validateEmail,
    validatePassword,
    login,
    updateLoginButtonState,
    focusEmailInput
  };
  