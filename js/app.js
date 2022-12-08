const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const apiError = document.getElementById("apiError");


const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: new FormData(form),
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();

});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  var firstChar = usernameValue.charAt(0);
  var lastChar = usernameValue.charAt(usernameValue.length - 1);
  if (usernameValue === "") {
    setError(username, "Username is required");
  } else if (usernameValue.length < 5 || usernameValue.length > 15) {
    setError(username, "Username must consist of 5 to 15 characters");
  } else if (
    !/^[A-Za-z0-9]*$/.test(usernameValue) ||
    /^[0-9]*$/.test(firstChar) ||
    /^[0-9]*$/.test(lastChar)
  ) {
    setError(username, "Invalid Username");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 character.");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Please confirm your password");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords doesn't match");
  } else {
    setSuccess(password2);
  }
  debugger;
  if (
    usernameValue !== "" &&
    usernameValue.length >= 5 &&
    usernameValue.length <= 15 &&
    emailValue !== "" &&
    isValidEmail(emailValue) &&
    /^[A-Za-z0-9]*$/.test(usernameValue) &&
    !/^[0-9]*$/.test(firstChar) &&
    !/^[0-9]*$/.test(lastChar) &&
    passwordValue !== "" &&
    passwordValue.length >= 8 &&
    password2Value !== "" &&
    password2Value === passwordValue
  ) {
    debugger;
    fetch(form.action, options)
      .then((data) => {
        if (!data.ok) {
          console.log(data.status);
          throw Error(data.status);
        }
        return data.json();
      })
      .then((update) => {
        console.log(update);
      })
      .catch((e) => {
        console.log(e);
        localStorage.setItem("email", email.value);
        window.location.href = "../Succeed.html";
      });
  }
};


var successEmail = document.getElementById("succeededEmail");
var localEmail = localStorage.getItem("email");
successEmail.innerText = localEmail;




