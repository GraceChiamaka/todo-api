const jwt = require("jsonwebtoken");

const jwtTokens = (user_id, user_name, email) => {
  const user = { user_id, user_name, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  return { accessToken, refreshToken };
};
module.exports = { jwtTokens };
