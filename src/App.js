import React, { useState, useEffect, useRef } from "react";
import uuid from "react-uuid";
import TodoList from "./components/TodoList";
import "./index.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleComplete = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoName = todoNameRef.current.value;
    const todoInfo = { id: uuid(), name: todoName, complete: false };
    if (todoName.trim().length > 0) {
      setTodos((prevTodos) => {
        return [...prevTodos, todoInfo];
      });
    } else {
      alert("Enter a todo");
    }
    todoNameRef.current.value = "";
  };

  const handleClearCompletedTodos = () => {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const input = document.querySelector(".todo-input");
  const warning = document.querySelector(".warning");
  const limit = 50;
  const checkCodeLength = () => {
    if (warning.textContent === 0) {
      warning.textContent = 0 + "/" + limit;
      let textLength = input.value.length;
      warning.textContent = textLength + "/" + limit;
    } else {
      warning.textContent = 0 + "/" + limit;
    }
  };

  return (
    <div className="todo-app">
      <form className="todo-form" onSubmit={handleSubmit}>
        <h1>Todo List</h1>
        <input
          label="Task"
          className="todo-input"
          ref={todoNameRef}
          type="text"
          name="todo-name"
          onChange={checkCodeLength}
          maxLength="50"
          placeholder="Add a todo"
        />
        <button className="todo-button">Add</button>
        <p className="warning">0/{limit}</p>
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          handleDelete={handleDelete}
        />
      </form>
      <div>
        <div className="task-left ">
          {todos.filter((todo) => !todo.complete).length} tasks left
        </div>
        <button className="todo-button" onClick={handleClearCompletedTodos}>
          Clear completed todos
        </button>
      </div>
    </div>
  );
}
