import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';

const Post = () => {

    const loadPosts = () => {
        axios.get('http://localhost:8000/posts')
            .then(function (response) {
                const post = response.data.find((post) => post._id === postId);
                setPost(post);
            })
            .catch((err) => console.log(err, 'it has an error'));
    }

    const { postId } = useParams();

    const [post, setPost] = useState([]);
    useEffect(() => { loadPosts() }, []);
    

    const navigate = useNavigate();
    
    return (
        <div className="post">
            <img
                src={post.imageUrl}
                alt=""
                width='200px'
            />
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default Post;