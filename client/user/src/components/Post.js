import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import HeaderSimple from './HeaderSimple';
import Footer from './Footer';
import './Post.css'
import PostLoader from './PostLoader';

const Post = () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [post, setPost] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

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

    const displayLatest = latestPosts.map(latest => {
        const changePost = () => {
            navigate(`/posts/${latest._id}`);
            navigate(0);
        }
        return (
            <div onClick={changePost} className='latest-post' key={latest._id}>
                <img
                    src={latest.imageUrl}
                    alt=""
                />
                <h1>{latest.title}</h1>
            </div>
        )
    })

    useEffect(() => { loadPosts() }, []);
    useEffect(() => {
        window.scrollTo({top: 0, left: 0});
    }, [isLoading]) 
    
    return (
        <div className="post">
            <HeaderSimple />
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
                        <div className='post-container'>
                            <div className='post-body'>
                                <p>{post.text}</p>
                            </div>
                            <div className='latest-posts'>
                                {displayLatest}
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer />
        </div>
    );
}

export default Post;