let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");

let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

let form = document.querySelector(".registerContainerForm");




userName.oninput = function () {

    if (userName.value === "") {
        nameError.innerText = "";
    }
    else if (userName.value.length < 3) {
        nameError.innerText = "Please enter at least 3 characters.";
    }
    else {
        nameError.innerText = "";
    }
}

userEmail.oninput = function () {

    if (userEmail.value === "") {
        emailError.innerText = ""
    }
    else if (!userEmail.value.includes("@") || !userEmail.value.includes(".")) {
        emailError.innerText = "Enter valid email."
    }
    else {
        emailError.innerText = ""
    }
}

userPassword.oninput = function () {
    let password = userPassword.value;

    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false;
    let hasSpecialChar = false;
    let specialCharacters = "!@#$%^&*()-_=+{}[]|:;\"'<>,.?/";

    if (password === "") {
        passwordError.innerText = "";
    }
    else if (password.length >= 8) {

        for (let i = 0; i < password.length; i++) {
            let char = password[i];

            if (char >= "A" && char <= "Z") {
                hasUpperCase = true;
            }
            else if (char >= "a" && char <= "z") {
                hasLowerCase = true;
            }
            else if (char >= 0 && char <= 9) {
                hasNumber = true;
            }
            else if (specialCharacters.includes(char)) {
                hasSpecialChar = true;
            }

            if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
                passwordError.innerText = "";
            }
            else {
                passwordError.innerText = "Please enter a strong password with letters, numbers, and symbols.";
            }
        }
    }
    else {
        passwordError.innerText = "Password must be at least 8 characters.";
    }
}


form.onsubmit = function (event) {

    let formValid = true;

    event.preventDefault();


    if (userName.value === "") {
        nameError.innerText = "User name is required.";
        formValid = false;
    }
    else if (userName.value.length < 3) {
        nameError.innerText = "Please enter at least 3 characters.";
        formValid = false;
    }
    else {
        nameError.innerText = "";
    }

    if (userEmail.value === "") {
        emailError.innerText = "User email is required."
        formValid = false;
    }
    else if (!userEmail.value.includes("@")) {
        emailError.innerText = "Enter valid email."
        formValid = false;
    }
    else {
        emailError.innerText = "";
    }

    let password = userPassword.value;

    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false;
    let hasSpecialChar = false;
    let specialCharacters = "!@#$%^&*()-_=+{}[]|:;\"'<>,.?/";

    if (password === "") {
        passwordError.innerText = "Password is required.";
        formValid = false;
    }
    else if (password.length >= 8) {

        for (let i = 0; i < password.length; i++) {
            let char = password[i];

            if (char >= "A" && char <= "Z") {
                hasUpperCase = true;
            }
            else if (char >= "a" && char <= "z") {
                hasLowerCase = true;
            }
            else if (char >= 0 && char <= 9) {
                hasNumber = true;
            }
            else if (specialCharacters.includes(char)) {
                hasSpecialChar = true;
            }

            if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
                passwordError.innerText = "";

            }
            else {
                passwordError.innerText = "Please enter a strong password with letters, numbers, and symbols.";
            }
        }
    }
    else {
        passwordError.innerText = "Password must be at least 8 characters.";
        formValid = false;
    }

    if (formValid) {
        postData();
    }
}



async function postData() {

    let userData = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    }


    try {

        let userCheck = await fetch("https://68218a3c259dad2655af85dc.mockapi.io/users");
        let users = await userCheck.json();

        let emailCheck = users.some(function(user){
            return user.email === userData.email;
        })

        if(emailCheck){
            emailError.innerText = "Email already registered.";
            return;
        }


        let response = await fetch("https://68218a3c259dad2655af85dc.mockapi.io/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        let result = await response.json();
        alert("Registration successful.");

        window.location.href = "../index.html";
    }
    catch (error) {
        alert("Failed to register. Please try again.")
    }

}