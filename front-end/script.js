const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const fullNameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phoneNumber");
const amountInput = document.getElementById("amount");

async function sendData(data) {
  const rawResponse = await fetch("http://127.0.0.1:3000/app", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await rawResponse.json();
  console.log(res);
}

function mpesaNumberCheck(number) {
  // return prefix eg 07 | +254 | 254
  returnPrefix = "254";

  // the actual regex to check the mpesa number
  re =
    /^((?:254|\+254|0)((?<xa>7(?:(?:[01249][0-9])|(?:5[7-9])|(6[8-9]))[0-9]{6})|(?<xb>1(?:(?:[1][0-1]))[0-9]{6})))$/;

  // check if our input matches the regex
  if (re.test(number)) {
    var x = number.match(re);
    if (x.groups.xa) {
      return returnPrefix + x.groups.xa;
    } else if (x.groups.xb) {
      return returnPrefix + x.groups.xb;
    }
  } else return "The value is not a valid Mpesa Number";
}

// define the app
function app(event) {
  event.preventDefault();
  // fetch input value
  var usernameVal = usernameInput.value;
  var fullNameVal = fullNameInput.value;
  var amountVal = amountInput.value;
  var phoneVal = phoneInput.value;
  // Check if the number is a valid mpesa number
  mpesaNo = mpesaNumberCheck(phoneVal);
  // package the data
  data = {
    user_name: usernameVal,
    full_name: fullNameVal,
    amount: amountVal,
    phone: mpesaNo,
  };
  // send the input to our server
  sendData(data);
}

// the trigger or thing to start our app
form.addEventListener("submit", app, true);
