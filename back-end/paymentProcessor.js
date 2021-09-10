const unirest = require("unirest");
const { config } = require("./helpers/config");
const { getToken } = require("./helpers/authenticate");

tempData = {
  amount: 1,
  phone: 254743665574,
  username: "riunge",
};

function requestMpesa(reqBody, token) {
  return new Promise((resolve, reject) => {
    unirest("POST", "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest")
      .headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      })
      .send(JSON.stringify(reqBody))
      .end((res) => {
        if (res.error) {
          return reject(JSON.parse(res.raw_body));
        }
        return resolve(JSON.parse(res.raw_body));
      });
  });
}

module.exports.processPayment = async (rawUserData) => {
  userData = {
    amount: parseInt(rawUserData.amount),
    phone: parseInt(rawUserData.phone),
    username: rawUserData.user_name,
  };
  let rawToken, response;

  // try and get auth token from mpesa and catch any errors
  try {
    rawToken = await getToken();
    token = rawToken.access_token;
    body = await config(userData);

    // try and request payment processing from mpesa and catch any errors
    response = await requestMpesa(body, token);

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
