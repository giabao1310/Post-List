import React, { useEffect, useState } from "react";
import { Data } from "../types";
import Pagination from "./pagination";
import { deletePost } from "../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const PostTable: React.FC = () => {
    const [post, setPost] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 7;
    const url = "https://jsonplaceholder.typicode.com/posts";
    const queryClient = useQueryClient();

    const {mutate} = useMutation({ 
        mutationFn: (id: number) =>  deletePost(id), 
        onSuccess: () => queryClient.invalidateQueries({queryKey:["posts"]})
    });

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await axios.get(url);
                setPost(response.data);
                setLoading(false);
            }
            catch(error){
                console.error("Error fetching data: ", error);
            }
        }

        fetchPost();
    }, []);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = post.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleDelete = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                setPost((prevPosts) => prevPosts.filter(post => post.id !== id));
            }
        });
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
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
                                <button className="edit-btn">Edit</button>
                                <button className="del-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                postPerPage={postPerPage}
                totalPost={post.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default PostTable;