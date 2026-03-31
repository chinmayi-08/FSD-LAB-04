import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api';

export default function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(`${API}/tasks`)
      .then(res => setTasks(res.data))
      .catch(() => alert("Backend not running"));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await axios.post(`${API}/tasks`, { title: text });
    setTasks([...tasks, res.data]);
    setText('');
  };

  const toggleTask = async (id) => {
    const res = await axios.patch(`${API}/tasks/${id}/toggle`);
    setTasks(tasks.map(t => t.id === id ? res.data : t));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React + Express Lab</h1>

      {/* Counter */}
      <h2>Counter</h2>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>

      {/* Tasks */}
      <h2>Tasks</h2>

      <form onSubmit={addTask}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
        />
        <button>Add</button>
      </form>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(t.id)}
            />
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}