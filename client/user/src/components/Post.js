import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Post.css'
import PostLoader from './PostLoader';

const Post = () => {

    const loadPosts = () => {
        axios.get('http://localhost:8000/posts')
            .then(function (response) {
                const post = response.data.find((post) => post._id === postId);
                setPost(post);
                const latest = response.data.slice(-3)
                setLatestPosts(latest);
            })
            .catch((err) => console.log(err, 'it has an error'))
            .finally(() => setLoading(false))
    }

    const { postId } = useParams();

    const [post, setPost] = useState([]);
    useEffect(() => { loadPosts() }, []);

    const [latestPosts, setLatestPosts] = useState([]);

    const displayLatest = latestPosts.map(latest => {
        return (
            <div className='latest-post'>
                <img
                    src={latest.imageUrl}
                    alt=""
                />
                <h1>{latest.title}</h1>
            </div>
        )
    })

    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();
    
    return (
        <div className="post">
            <Header />
            {isLoading ? <PostLoader />
                : (
                    <div className='post-main'>
                        <div className='post-header' >
                            <img
                                src={post.imageUrl}
                                alt=""
                            />
                            <div className='post-title'>
                                <h1><span>{post.title}</span></h1>
                            </div>
                        </div>
                        <div className='post-body'>
                            <p>{post.text}</p>
                        </div>
                        <div className='latest-posts'>
                            {displayLatest}
                        </div>
                    </div>
                )
            }
            <Footer />
        </div>
    );
}

export default Post;