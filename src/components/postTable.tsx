import React, { useState } from "react";
import { useFetchPost } from "../hooks/useFetchPost";
import { useDeletePost } from "../hooks/useDeletePost";
import { useUpdatePost } from "../hooks/useUpdatePost";
import EditPost from "./editPost";
import Pagination from "./pagination";
import { Data } from "../types/post";


const PostTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1); 
    const postPerPage = 7;
    const [editing, setEditing] = useState<Data | null>(null);

    const { data: post, isLoading } = useFetchPost();
    const { mutate: deletePost } = useDeletePost();
    const { mutate: updatePost } = useUpdatePost();

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = post?.slice(indexOfFirstPost, indexOfLastPost) || [];

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    // Function to update post
    const handleUpdate = (updatedPost: Data) => {
        updatePost(updatedPost);
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
        deletePost(id);
    };

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