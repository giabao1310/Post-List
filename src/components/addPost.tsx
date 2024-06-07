import { Data } from "../types/post";
import React, { useState } from "react";

interface addPostProps {
    addPost: (newPost: Omit<Data, 'id' | 'userId'>) => void;
    cancelAdd: () => void;
}

const AddPost: React.FC<addPostProps> = ({ addPost, cancelAdd }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleAdd = () => {
        if (title.trim() && body.trim()) {
            addPost({ title, body });
        }
    };

    return (
        <div className="pop-up">
            <div className="popup-inner">
                <span className="close" onClick={cancelAdd}>&times;</span>
                <h2>Add New Post</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Body"
                ></textarea>
                <button onClick={handleAdd}>Add</button>
                <button onClick={cancelAdd}>Cancel</button>
            </div>
        </div>


    );
}

export default AddPost;