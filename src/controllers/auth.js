const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../utils/helpers");

const {
  checkEmailExists,
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,
} = require("../queries");

const checkedUserByEmail = async (userEmail) => {
  if (userEmail !== "") {
    const result = await pool.query(checkEmailExists, [userEmail]);
    return result;
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await checkedUserByEmail(email);

    if (loggedInUser.rowCount === 0) {
      return res.status(401).json({ error: "Incorrect login details" });
    }
    const validatePassword = bcrypt.compare(
      password,
      loggedInUser?.rows[0]?.password
    );
    if (!validatePassword) {
      return res.status(401).json({ error: "Incorrect login details" });
    }
    let tokens = jwtTokens(loggedInUser.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    const { password: userPassword, ...rest } = loggedInUser.rows[0];

    return res.status(200).json({ user: { ...rest }, tokens: tokens });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { user_name, email, password } = req.body;
  try {
    const checkedUser = await checkedUserByEmail();
    if (checkedUser.rowCount === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await pool.query(createUserQuery, [
        user_name,
        email,
        hashedPassword,
      ]);
      return res.status(201).send({
        message: "User created successfully!",
        user: user.rows,
      });
    } else {
      return res.status(400).json({ error: "Email already exist" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { id } = parseInt(req.params.id);
  try {
    const checkedUser = await pool.query(getUser, [id]);
    if (checkedUser.rowCount === 0) {
      const deletedUser = await pool.query(deleteUserQuery, [id]);
      res.status(200).send("User deleted succesdfully");
    } else {
      res.status(500).send({ error: "User does not exist" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const resetPassword = (req, res) => {
  const { id } = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(getUser, [id], (error, results) => {
    res.send("User not found");
  });
  pool.query(updateUserQuery, [name, id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send("User updated successfully!");
  });
};

const refreshToken = (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  console.log(refresh_token);
  try {
    if (refresh_token === null)
      return res.status(401).json({ error: "Null refresh token" });
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let token = jwtTokens(user);
        return res.status(200).json({ token: token });
      }
    );
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const deleteToken = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Refresh token deleted" });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  forgotPassword,
  resetPassword,
  refreshToken,
  deleteToken,
};
