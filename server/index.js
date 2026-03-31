const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Learn Express', done: false }
];

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title required' });
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    done: false
  };

  tasks.push(newTask);
  res.json(newTask);
});

app.patch('/api/tasks/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).json({ error: 'Not found' });

  task.done = !task.done;
  res.json(task);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});