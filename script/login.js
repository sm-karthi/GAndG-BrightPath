
let isLogin = localStorage.getItem("isLogin");
if (isLogin) {
    window.location.href = "../pages/dashboard.html";
}

let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");

let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

let form = document.querySelector(".logInContainerForm");


form.onsubmit = function (event) {

    let formValid = true;

    event.preventDefault();


    if (userEmail.value === "") {
        emailError.innerText = "User email is required."
        formValid = false;
    }
    else {
        emailError.innerText = "";
    }

    if (userPassword.value === "") {
        passwordError.innerText = "User Password is required."
        formValid = false;
    }
    else {
        passwordError.innerText = "";
    }


    if (formValid) {
        getData();
    }
}

async function getData() {

    try {
        let response = await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/users?email=${userEmail.value}`);
        let userData = await response.json();

        let user = userData.find(function (u) {
            return u.password === userPassword.value;
        });

        if (!user) {
            emailError.innerText = "Email not found.";
            return;
        }

        localStorage.setItem("isLogin", true);
        localStorage.setItem("email", userEmail.value);

        alert("Login successful.");
        window.location.href = "../pages/dashboard.html";

    }
    catch (error) {
        console.log(error)

    }

}
