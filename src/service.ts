import axios from "axios";
import { Data } from "./types/post";
import { POST_API } from "./path/config";

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${POST_API}/${id}`);
  } catch (error) {
    throw new Error("Failed to delete post with id ${id}: ${error.message}")
  }
};

export const updatePost = async (updatedPost: Data): Promise<void> => {
  try {
    await axios.put(`${POST_API}/${updatedPost.id}`, updatedPost);
  } catch (error) {
    throw new Error("Failed to update post with id ${id}: ${error.message}")
  }
};

export const createPost = async (newPost: Data): Promise<void> => {
  try {
    const response = await axios.post(POST_API, newPost);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create post: ${error.message}");
  }
}