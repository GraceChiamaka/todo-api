const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Bearer token
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader, token);
  if (token === null || token === undefined)
    return res.status(401).json({ error: "Unauthorized, Null token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
