const dwolla = require("../utils/dwolla");

const getAllCustomers = (request, response) => {
  dwolla.auth
    .client()
    .then((appToken) => appToken.get("customers"))
    .then((res) => {
      console.log(res.body._embedded.customers);
      return response.json({ result: res.body._embedded.customers });
    })
    .catch((e) => {
      console.error(e);
      return response.status(500).json({ message: "Unable to get customers" });
    });
};

const createCustomerWithFundingSource = async (request, response) => {
  try {
    const {
      // common customer data
      firstName,
      lastName,
      email,
      // verified customer data
      type,
      address1,
      city,
      state,
      postalCode,
      dateOfBirth,
      ssn,
      // funding source
      routingNumber,
      accountNumber,
      bankAccountType,
      name,
    } = request.body;
    const customerResult = await dwolla.post("customers", {
      firstName,
      lastName,
      email,
      type,
      address1,
      city,
      state,
      postalCode,
      dateOfBirth,
      ssn,
    });
    const customerLink = customerResult.headers.get("location");
    const fundingSourceResult = await dwolla.post(
      `${customerLink}/funding-sources`,
      { routingNumber, accountNumber, bankAccountType, name }
    );
    const fundingSourceLink = fundingSourceResult.headers.get("location");
    return response.send({ result: fundingSourceLink });
  } catch (e) {
    console.error(e);
    return response
      .status(500)
      .send({ message: "Unable to create a customer" });
  }
};

const createTransfer = (request, response) => {
  dwolla
    .post("transfers", request.body)
    .then((res) => {
      const transferLink = res.headers.get("location");
      return response.send({ result: transferLink });
    })
    .catch((e) => {
      console.error(e);
      return response
        .status(500)
        .send({ message: "Unable to create a transfer" });
    });
};

const verifyFundingSource = async (request, response) => {
  try {
    const { fundingSourceLink } = request.body;
    await dwolla.post(`${fundingSourceLink}/micro-deposits`);
    await dwolla.post(`${fundingSourceLink}/micro-deposits`, {
      amount1: {
        value: "0.03",
        currency: "USD",
      },
      amount2: {
        value: "0.09",
        currency: "USD",
      },
    });
    return response.send({ result: "success" });
  } catch (e) {
    console.error(e);
    return response
      .status(500)
      .send({ message: "Unable to verify a funding source" });
  }
};

const updateCustomer = (request, response) => {
  const { customerLink, email } = request.body;
  dwolla
    .post(customerLink, { email })
    .then((res) => response.json({ result: res.body.id }))
    .catch((e) =>
      response.status(500).json({ message: "Unable to update customer" })
    );
};

const updateFundingSource = (request, response) => {
  const {
    fundingSourceLink,
    name,
    accountNumber,
    routingNumber,
  } = request.body;
  dwolla
    .post(fundingSourceLink, { name, accountNumber, routingNumber })
    .then((res) => {
      return response.json({ result: res.body });
    })
    .catch((e) => {
      return response
        .status(500)
        .json({ message: "Unable to update funding source" });
    });
};

module.exports = {
  getAllCustomers,
  createCustomerWithFundingSource,
  createTransfer,
  verifyFundingSource,
  updateCustomer,
  updateFundingSource,
};
