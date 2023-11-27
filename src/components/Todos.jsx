const Todos = ({ todos, error }) => {
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos &&
            todos.map((todo) => (
              <li key={todo.id} className="Todo">
                {todo.title}
              </li>
            ))}
        </ul>
      ) : (
        <p className="Todo">No todo found</p>
      )}
    </>
  );
};

export default Todos;
