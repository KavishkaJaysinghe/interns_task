import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// GET /api/todos - fetch all todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

// POST /api/todos - create new todo
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

// PUT /api/todos/:id - update todo
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, isCompleted } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, isCompleted },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/todos/:id - delete todo
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
