const inputs = document.querySelectorAll("input"),
verifyButton = document.getElementById("verify-button");

// iterate over all inputs
inputs.forEach((input, index1) => {
input.addEventListener("keyup", (e) => {

  const currentInput = input,
    nextInput = input.nextElementSibling,
    prevInput = input.previousElementSibling;

  // if the value has more than one character then clear it
  if (currentInput.value.length > 1) {
    currentInput.value = "";
    return;
  }
  // if the next input is disabled and the current value is not empty 
  //  enable the next input and focus on it
  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
    nextInput.removeAttribute("disabled");
    nextInput.focus();
  }

  // if the backspace key is pressed
  if (e.key === "Backspace") {
    // iterate over all inputs again
    inputs.forEach((input, index2) => {
      // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
      // and the previous element exists, set the disabled attribute on the input and focus on the previous element
      if (index1 <= index2 && prevInput) {
        input.setAttribute("disabled", true);
        input.value = "";
        prevInput.focus();
      }
    });
  }
  //if the fourth input( which index number is 3) is not empty and has not disable attribute then
  //add active class if not then remove the active class.
  if (!inputs[5].disabled && inputs[5].value !== "") {
    verifyButton.classList.add("active");
    return;
  }
  verifyButton.classList.remove('active')
});
});

//focus the first input which index is 0 on window load
window.addEventListener("load", () => inputs[0].focus());

function verifyOTP() {

  const digit1 = document.getElementById('digit1').value;
  const digit2 = document.getElementById('digit2').value;
  const digit3 = document.getElementById('digit3').value;
  const digit4 = document.getElementById('digit4').value;
  const digit5 = document.getElementById('digit5').value;
  const digit6 = document.getElementById('digit6').value;


  const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;

  fetch('/verify-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({otp}),
  })
 
}

function ResendOtp() {
  window.location.href = '/resend-otp'
}