const { admin, fcm } = require("../utils/admin");

const sendMessage = (request, response) => {
  const { registrationToken } = request.body;
  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    token: registrationToken,
  };
  fcm
    .send(message)
    .then((res) => {
      console.log("Successfully sent message:", res);
      return;
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      return;
    });
  return response.send({ result: "success" });
};

module.exports = { sendMessage };
