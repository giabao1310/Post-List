import React, { useEffect, useState } from "react";
import { Data } from "../types/post";

interface EditPostProps {
    post: Data;
    updatePost: (updatedPost: Data) => void;
    cancelEdit: () => void;
}

const EditPost: React.FC<EditPostProps> = ({ post: initialPost, updatePost, cancelEdit }) => {
    const [post, setPost] = useState<Data>(initialPost);

    useEffect(() => {
        setPost(initialPost);
    }, [initialPost])

    const [newTitle, setTitle] = useState(post.title);
    const [newBody, setBody] = useState(post.body);

    const handleEdit = () => {
        updatePost({ ...post, title: newTitle, body: newBody });
        cancelEdit();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <span className="close" onClick={cancelEdit}>&times;</span>
                <h2>Edit Post</h2>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Title"
                />
                <textarea
                    value={newBody}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="New Body"
                ></textarea>
                <button onClick={handleEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
            </div>
        </div>
    )
};

export default EditPost;