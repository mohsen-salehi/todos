import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getTodos,
  addTodos,
  deleteTodos,
  updateTodos,
} from "../../api/todosApi";
import { useState } from "react";

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery("todos", getTodos, {
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  const addTodoMutation = useMutation(addTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const updateTodoMutation = useMutation(updateTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form
      className='w-full  flex flex-wrap justify-center p-2 items-center'
      onSubmit={handleSubmit}
    >
      <div className='w-full'>
        <input
          type='text'
          className='w-full p-3 my-2 outline-none shadow-inner border rounded-lg '
          value={newTodo}
          onInput={(e) => setNewTodo(e?.target?.value)}
          placeholder='Enter New Todo'
        />
      </div>
      <button
        type='submit'
        className='bg-green-500 rounded-xl shadow-inner p-4 w-full'
      >
        Add
      </button>
    </form>
  );

  let content;

  if (isLoading) return (content = "Loading...");
  else if (isError) return (content = "Error...");
  else content = todos;
  return (
    <main className='w-full rounded-lg shadow-inner  h-screen overflow-auto flex flex-wrap justify-center content-start p-2'>
      <h1 className='w-full shadow-inner rounded-lg text-7xl text-center'>
        Todo List{" "}
      </h1>
      {newItemSection}
      <ul className='w-full'>
        {content
          ? content.map((item) => (
              <li
                key={item?.id}
                className='w-full flex justify-between rounded-xl shadow-inner p-4'
              >
                <input
                  checked={item?.completed}
                  id={item?.title}
                  type='checkbox'
                  className='checked:accent-yellow-300 rounded-md mx-1'
                  onChange={() =>
                    updateTodoMutation.mutate({
                      ...item,
                      completed: !item?.completed,
                    })
                  }
                />
                <label htmlFor={item?.title}>{item?.title}</label>
                <button
                  onClick={() =>
                    deleteTodoMutation.mutate({
                      id: item?.id,
                    })
                  }
                  className='bg-red-600 h-5 w-5 m-0 flex justify-center items-center font-bold rounded-lg '
                >
                  X
                </button>
              </li>
            ))
          : error}
      </ul>
    </main>
  );
}

export default TodoList;
