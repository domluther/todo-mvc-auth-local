const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');
const { ensureAuth } = require('../middleware/auth');

// Ensure that the user is logged in before showing them the todos page
router.get('/', ensureAuth, todosController.getTodos);

router.post('/createTodo', ensureAuth, todosController.createTodo);

router.put('/markComplete', ensureAuth, todosController.markComplete);

router.put('/markIncomplete', ensureAuth, todosController.markIncomplete);

router.delete('/deleteTodo', ensureAuth, todosController.deleteTodo);

module.exports = router;
