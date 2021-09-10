// recieving till number
const till = 174379;

// application pass key given by safaricom
const passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

// creating a timestapm in the format yyyymmddhhmmss
const timeStamp = () => {
  timeKe = new Date().toLocaleString("en-ZA", { timeZone: "Africa/Nairobi" });
  return timeKe.replace(/[^\d]/gi, "");
};

// get timestamp and save it in a constant so that we reuse the exact same timestamp value
const timeS = timeStamp();

// password, a base 64 encoded string
pass = Buffer.from(till + passKey + timeS).toString("base64");

// the call back url
const callPath = `/mpesaResults`;
const callbackUrl = `https://9738-154-159-238-115.ngrok.io${callPath}`;

// add it to the body (which expects the varying data as parameters)
module.exports.config = function (userData) {
  return {
    BusinessShortCode: till,
    Password: pass,
    Timestamp: timeS,
    TransactionType: "CustomerPayBillOnline",
    Amount: userData.amount,
    PartyA: userData.phone,
    PartyB: till,
    PhoneNumber: userData.phone,
    CallBackURL: callbackUrl,
    AccountReference: "CompanyXLTD",
    TransactionDesc: userData.username,
  };
};
