# TSKS TodoAPI

### Description

A simple todo api made with Node JS & Express to manage productivity.

UI Page
[TSKS HomePage](https://tskstask.netlify.app/)

### Documentation

[API DOC](https://documenter.getpostman.com/view/5506562/Uz59PfWV)

[Live API URL](https://taskmep.herokuapp.com/)

### Available API Endpoints

- API route to create new user

  - POST: `/api/v1/auth/signup` (user_name, email, password)

- API route to login user

  - POST: `/api/v1/auth/login` (email, password)

- API route to get all tasks

  - POST: `/api/v1/tasks` (Bearer `token`)

- API route to get single task details

  - POST: `/api/v1/tasks/:id` (taskId)

- API route to create new task

  - POST: `/api/v1/tasks` (title, description, completed )

- API route to update a task

  - POST: `/api/v1/tasks/:id` (title, description, completed )

- API route to delete a task

  - POST: `/api/v1/tasks/:id`
