import React from "react";
import { Checkbox, ListItem, Typography } from "@material-ui/core";

export default function Todo({ todo, toggleComplete, handleDelete }) {
  function handleCheckBoxClick() {
    toggleComplete(todo.id);
  }

  const handleDeleteClick = () => {
    handleDelete(todo.id);
  };

  return (
    <ListItem className="List-item">
      <Typography
        className="List-item todo-item"
        style={{
          textDecoration: todo.complete ? "line-through" : null,
        }}
      >
        {todo.name}
      </Typography>
      <Checkbox
        type="checkbox"
        checked={todo.complete}
        onChange={handleCheckBoxClick}
      />
      <button className="delete-icon" onClick={handleDeleteClick}>
        X
      </button>
    </ListItem>
  );
}
