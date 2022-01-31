import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, toggleComplete, handleDelete }) {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <Todo
            className="todo-item"
            key={todo.id}
            handleDelete={handleDelete}
            toggleComplete={toggleComplete}
            todo={todo}
          />
        );
      })}
    </div>
  );
}
