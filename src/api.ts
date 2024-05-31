import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(error);
  }
};