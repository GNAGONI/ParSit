const Client = require("dwolla-v2").Client;

const dwolla = new Client({
  // key: process.env.DWOLLA_APP_KEY,
  // secret: process.env.DWOLLA_APP_SECRET,
  key: "2YCgyLSAlZPaXV4n4NggWcOBcCuhuinOdzlbvMcdKPOxTh1CJX",
  secret: "ZojzrkzqHRbrUOp0p03gPZQS6g6KfwIHQGl2nmJuVxt8YHXRkB",
  environment: "sandbox", // defaults to 'production'
});

module.exports = dwolla;
