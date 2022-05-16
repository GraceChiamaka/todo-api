const pool = require("../db");
const bcrypt = require("bcrypt");

const {
  getUsersQuery,
  getUserQuery,
  checkEmailExists,
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,
} = require("../queries");

const getUsers = async (req, res) => {
  try {
    const users = await pool.query(getUsersQuery);
    return res.json({ users: users.rows });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(getUserQuery, [id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
};

const checkedUserByEmail = async (userEmail) => {
  const result = await pool.query(checkEmailExists, [userEmail]);
  return result.rowCount;
};

const createUser = async (req, res) => {
  const { user_name, email, password } = req.body;
  try {
    const checkedUser = checkedUserByEmail();
    if (checkedUser === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await pool.query(createUserQuery, [
        user_name,
        email,
        hashedPassword,
      ]);
      return res.status(201).json({
        message: "User created successfully!",
        user: user.rows,
      });
    } else {
      return res.json("Email already exist");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = parseInt(req.params.id);
  try {
    const checkedUser = await pool.query(getUser, [id]);
    if (checkedUser.rowCount === 0) {
      const deletedUser = await pool.query(deleteUserQuery, [id]);
      return res.status(200).json("User deleted succesdfully");
    } else {
      return res.status(500).json({ error: "User does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = (req, res) => {
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
};
