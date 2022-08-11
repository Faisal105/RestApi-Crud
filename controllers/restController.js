let todos = require('../model/todo.model');
let lastTaskId = 7;
const TaskValidation = require('../validation/taskValidation');
module.exports = {
	allTask: (req, res) => {
		res.json({ todos: todos });
		console.log(todos);
	},
	singleTask: (req, res, next) => {
		const taskId = parseInt(req.params.taskId);
		console.log(taskId);
		console.log(typeof taskId);
		const task = todos.find((task) => task.id === taskId);
		if (task) {
			res.json({ task: task });
		} else {
			next({ status: 404, message: 'task not found' });
		}
	},
	addTask: (req, res, next) => {
		const errors = TaskValidation.validate(req.body, { abortEarly: false });
		if (errors.error) {
			const allErrors = errors.error.details.map((err) => err.message);
			next({ status: 500, message: allErrors });
			return;
		}
		console.log(errors.error);
		const task = req.body;
		task.id = lastTaskId;
		lastTaskId++;
		todos.push(task);
		console.log(req.body);
		res.json({ success: true, message: 'Task added successfully' });
	},
	updateTask: (req, res, next) => {
		const todoId = req.body.todoId;
		const todoDone = req.body.todoDone;
		const todo = todos.find((todo) => todo.id === todoId);
		if (todo) {
			todo.done = todoDone;
			res.json({ success: true, message: `todo updated to ${todoDone}` });
		} else {
			next({ status: 404, message: 'todo  not found' });
		}
	},
	deleteTask: (req, res) => {
		const todoId = parseInt(req.params.taskId);
		console.log(todoId);
		const newTask = todos.filter((task) => task.id != todoId);
		todos = newTask;
		console.log(todos);
		res.json({ success: 1, message: 'Task deleted ' });
	},
};
