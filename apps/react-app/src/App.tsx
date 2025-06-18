import { useState, useEffect } from 'react';
import type { Todo } from '@monorepo/shared';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo })
    });

    const todo = await response.json();
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT'
    });
    const updatedTodo = await response.json();
    setTodos(todos.map(todo => 
      todo.id === id ? updatedTodo : todo
    ));
  };

  return (
    <div className="container">
      <h1>React Todo App</h1>
      <div className="add-todo">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 