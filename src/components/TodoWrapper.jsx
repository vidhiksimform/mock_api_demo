import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import { getApiUrl } from "../utils";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const fetchTodos = () => {
    axios
      .get(getApiUrl("posts"))
      .then(({ data }) => {
        setTodos(data.slice(0, 10));
      })
      .catch(() => setError("Error fetching todos"));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    if (todo.trim() === "") return;

    axios
      .post(getApiUrl("posts"), {
        title: todo,
        body: "testing",
        userId: Math.floor(Math.random() * 10),
      })
      .then((response) => setTodos([response.data, ...todos]))
      .catch((error) => console.log(error));
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      <Todos todos={todos} error={error} />
    </div>
  );
};

export default TodoWrapper;
