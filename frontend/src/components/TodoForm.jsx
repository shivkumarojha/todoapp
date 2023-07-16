import React, { useState } from "react";
import InputField from "./InputField";
import { InputFieldCheckBox } from "./InputField";
export default function TodoForm({ todos, setTodos }) {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    date: "",
    time: "",
    repeat: false,
  });

  const handleInputChange = (e) => {
    const {id, value, type, checked} = e.target
    if(type == "checkbox" && id === "repeat") {
      setFormData({ ...formData, repeat: checked});  
      console.log(checked)
    }else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const addTodo = (e) => {
    e.preventDefault();
    fetch("https://todoapp-d47c.onrender.com/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setFormData({
          title: "",
          details: "",
          date: "",
          time: "",
          repeat: false,
        });
      });
  };

  return (
    <form className="todo-form">
      <InputField
        id="title"
        type="text"
        placeholder="Title"
        value={formData.title || ""}
        handleChange={handleInputChange}
      />
      <InputField
        id="details"
        type="text"
        placeholder="Details"
        value={formData.details || ""}
        handleChange={handleInputChange}
      />
      <InputField
        id="date"
        type="date"
        value={formData.date || ""}
        handleChange={handleInputChange}
      />
      <InputField
        id="time"
        type="time"
        value={formData.time || ""}
        handleChange={handleInputChange}
      />
      <InputFieldCheckBox
        id="repeat"
        type="checkbox"
        checked={formData.repeat}
        handleChange={handleInputChange}
      />
      <span style={{ fontSize: "19px", fontWeight: "bold" }}>Repeat</span>
      <button id="add-task-button" onClick={addTodo}>
        Add a task
      </button>
    </form>
  );
}
