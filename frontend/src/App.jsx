import { useCallback } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import "./css/InputField.css";
import { useEffect } from "react";
import { useState } from "react";
import repeatIcon from './assets/repeat.svg' 


export default function App() {
  const [todos, setTodos] = useState([]);

  function handleChange(e) {
    console.log(e.target.value)
  }
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/tasks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
      let newTodo = data.map((todo) => ({
            id: todo.id,
            title: todo.title,
            details: todo.details,
            date: todo.date,
            time: todo.time,
            repeat: todo.repeat,
        }));
        setTodos([...todos, ...newTodo]);
      });
  }, []);
  const loadAllTodo = () => {
    let todoList = todos.map((todo) => (
      <ul key={`ul_${todo.id}`}>
        <li key={`title_${todo.id}`}>{todo.title}</li>
        <li key={`details_${todo.id}`}>{todo.details}</li>
        <div className="date-time">
          <span>{todo.date}</span>
          <span>{todo.time}</span>
        </div>
        <div className="repeat-delete">
          {todo.repeat ? 
          <img id="repeat-icon" src={repeatIcon} alt="" style={{width:"30px", height:"30px"}}/>
          : ""
        }
          <button id={todo.id} className="delete-todo-button" onClick={deleteTodo}>Delete</button>
        </div>
      </ul>
    ));
    if (todoList.length != 0) {
      return todoList
    }else {
      return <h2>No tasks</h2>
    }
  };

  const deleteTodo = (e) => {
    const todoId = e.target.id
    fetch(`http://localhost:3000/api/v1/tasks/${todoId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'appication/json'
      }
    })
    .then(response => response.json())
    .then((updatedTodos) => setTodos(updatedTodos)
  )}



  return (
    <div className="container">

      <div className="heading">Todo Tasks</div>
      <TodoForm todos={todos} setTodos={setTodos} />
      <div className="todo-card">
        {loadAllTodo()}
      </div>
    </div>
  );
}
