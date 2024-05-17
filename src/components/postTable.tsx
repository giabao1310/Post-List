import React, {useEffect , useState} from "react";
import { Data } from "../types";
import Pagination from "./pagination";



const PostTable: React.FC = () => {
    const [post, setPost] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 7;

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                setPost(data);
                setLoading(false);
            });
        }, []);
        
        const LastPostIndex = currentPage * postPerPage;
        const FirstPostIndex = LastPostIndex - postPerPage;
        const currentPost = post.slice(FirstPostIndex, LastPostIndex);

        const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

        if (loading) {
            return <p>Loading...</p>;
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentPost.map(post => (
                            <tr key={post.id}>
                                <td>{post.userId}</td>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
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