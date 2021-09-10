const unirest = require("unirest");

module.exports.getToken = function () {
  return new Promise((resolve, reject) => {
    unirest("GET", "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials")
      .headers({
        Authorization: "Basic cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==",
      })
      .send()
      .end((res) => {
        if (res.error) {
          return reject(res.error);
        }
        return resolve(JSON.parse(res.raw_body));
      });
  });
};
