const createUsersTableQuery = "CREATE TABLE users";
const getUsersQuery = "SELECT * FROM users";
const getUserQuery = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT * FROM users u where u.email = $1";
const createUserQuery =
  "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *";
const deleteUserQuery = "DELETE * FROM users WHERE id = $1";
const updateUserQuery = "UPDATE users SET name=$1 WHERE id = $2";

module.exports = {
  createUsersTableQuery,
  getUsersQuery,
  getUserQuery,
  checkEmailExists,
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,
};
