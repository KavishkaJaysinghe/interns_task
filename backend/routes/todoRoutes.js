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
    const { title, description, status, priority, assignee, dueDate, tags, isCompleted } = req.body;
    const todo = new Todo({ title, description, status, priority, assignee, dueDate, tags, isCompleted });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/todos/:id - partial update (e.g., just status)
router.patch('/:id', async (req, res, next) => {
  try {
    const update = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// PUT /api/todos/:id - update todo (only update provided fields)
router.put('/:id', async (req, res, next) => {
  try {
    const update = {};
    const fields = ['title', 'description', 'status', 'priority', 'assignee', 'dueDate', 'tags', 'isCompleted'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    });
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: update },
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
