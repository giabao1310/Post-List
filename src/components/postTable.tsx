import React, { useState } from "react";
import { useFetchPost } from "../hooks/useFetchPost";
import { useDeletePost } from "../hooks/useDeletePost";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { useAddPost } from "../hooks/useAddPost";
import EditPost from "./editPost";
import AddPost from "./addPost";
import Pagination from "./pagination";
import { Data } from "../types/post";
import queryClient from "../queryClient";


const PostTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 7;
    const [editing, setEditing] = useState<Data | null>(null);
    const [adding, setAdding] = useState(false);

    const { data: post, isLoading } = useFetchPost();
    const { mutate: deletePost } = useDeletePost();
    const { mutate: updatePost } = useUpdatePost();
    const { mutate: addPost } = useAddPost();

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = post?.slice(indexOfFirstPost, indexOfLastPost) || [];

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    // Function to update post
    const handleUpdate = (updatedPost: Data) => {
        updatePost(updatedPost,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["posts"]
                    });
                    console.log("Post updated successfully");
                },
            }
        );
        setEditing(null);
    }

    // Function to handle edit post
    const handleEdit = (post: Data) => {
        setEditing(post);
    }

    const cancelEdit = () => {
        setEditing(null);
    }

    // Function to delete post
    const handleDelete = (id: number) => {
        deletePost(id,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["posts"]
                    });
                    console.log("Post deleted successfully");
                },
                onError: (error) => {
                    console.log("Failed to delete post: ", error);
                }
            }
        );
    };

    // Function to add post
    const handleAdd = (newPostData: Omit<Data, 'id' | 'userId'>) => {
        if (!post) return;

        const lastPost = post[post.length - 1];
        const newId = lastPost.id + 1;
        const newUserId = Math.floor(newId / 10) + 1;

        const newPost: Data = {
            userId: newUserId,
            id: newId,
            ...newPostData
        }
        addPost(newPost, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["posts"]
                });
                console.log("Post added successfully");
            }
        });
        setAdding(false);
    };

    const cancelAdd = () => {
        setAdding(false);
    }

    // code for UI below
    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            {editing && (
                <EditPost
                    post={editing}
                    cancelEdit={cancelEdit}
                    updatePost={handleUpdate}
                />
            )}
            {adding && (
                <AddPost
                    addPost={handleAdd}
                    cancelAdd={cancelAdd}
                />
            )}
            <div className='header'>
                <h1>Post List</h1>
                <button className='add-btn' onClick={() => setAdding(true)}>Add</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>UserId</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPost.map(post => (
                        <tr key={post.id}>
                            <td>{post.userId}</td>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td className="action">
                                <button className="edit-btn" onClick={() => handleEdit(post)}>Edit</button>
                                <button className="del-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                postPerPage={postPerPage}
                totalPost={post?.length || 0}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>

    );
};

export default PostTable;