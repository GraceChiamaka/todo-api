const createUsersTableQuery = "CREATE TABLE users";
const getUsersQuery = "SELECT * FROM users";
const getUserQuery = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT * FROM users u where u.email = $1";
const createUserQuery =
  "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *";
const deleteUserQuery = "DELETE * FROM users WHERE id = $1";
const updateUserQuery = "UPDATE users SET name=$1 WHERE id = $2";

const getTasksQuery = "SELECT * FROM tasks";
const getTaskByIdQuery = "SELECT * FROM tasks WHERE task_id = $1";
const createTaskQuery =
  "INSERT INTO tasks (user_id, title, description, completed) VALUES ($1, $2, $3, $4) RETURNING *";
const updateTaskQuery =
  "UPDATE tasks SET user_id = $1, title = $2, description = $3, completed = $4 where task_id= $5 RETURNING *";
const deleteTaskQuery = "DELETE FROM tasks where task_id = $1";

module.exports = {
  createUsersTableQuery,
  getUsersQuery,
  getUserQuery,
  checkEmailExists,
  
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,

  getTasksQuery,
  getTaskByIdQuery,
  createTaskQuery,
  updateTaskQuery,
  deleteTaskQuery,
};
