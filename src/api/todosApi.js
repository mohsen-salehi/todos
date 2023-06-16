import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:3500",
});

export const getTodos = async () => {
  const resposne = await todosApi.get("/todos");
  return resposne?.data;
};

export const addTodos = async (data) => {
  return await todosApi.post("/todos", data);
};

export const updateTodos = async (data) => {
  return await todosApi.put(`/todos/${data?.id}`, data);
};

export const deleteTodos = async ({ id }) => {
  return await todosApi.delete(`/todos/${id}`, id);
};

export default todosApi;
