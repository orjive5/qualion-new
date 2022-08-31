import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Post.css'

const Post = () => {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState([]);
    const [published, setPublished] = useState(true);
    const [postImage, setPostImage] = useState('');
    const [updateImage, setUpdateImage] = useState(false);
    const inputFileRef = useRef(null);
    const [postTitle, setPostTitle] = useState('');
    const [updateTitle, setUpdateTitle] = useState(false);
    const [postSubtitle, setPostSubtitle] = useState('');
    const [updateSubtitle, setUpdateSubtitle] = useState(false);
    const [postText, setPostText] = useState('');
    const [updateText, setUpdateText] = useState(false);
    const [postTags, setPostTags] = useState('');
    const [updateTags, setUpdateTags] = useState(false);

    const loadPosts = () => {
        axios.get('http://localhost:8000/posts')
            .then(function (response) {
                const post = response.data.find((post) => post._id === postId);
                setPost(post);
                setPostImage(post.imageUrl);
                setPostTitle(post.title);
                setPostSubtitle(post.subtitle);
                setPostText(post.text);
                setPostTags(post.tags.map((el => `${el}`)));
                setPublished(post.isPublished);
            })
            .catch((err) => console.log(err, 'it has an error'))
            .finally(() => setLoading(false));
    }

    const timestamp = new Date(post.createdAt).toLocaleDateString(
        'en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        }
    );

    const token = localStorage.getItem('token');
    const headers = { Authorization: token }

    const togglePublished = () => {
        axios.put(`http://localhost:8000/posts/${postId}`, { isPublished: !published }, { headers })
            .then((response) => {
                console.log(response);
                setPublished(!published);
            }).catch(err => {
                console.log(err)
            })
    }

    const updatePost = () => {
        axios.put(`http://localhost:8000/posts/${postId}`, {
            imageUrl: postImage,
            title: postTitle,
            subtitle: postSubtitle,
            text: postText,
            tags: postTags,
        }, { headers })
            .then((response) => {
                setUpdateImage(false);
                setUpdateTitle(false);
                setUpdateSubtitle(false);
                setUpdateText(false);
                setUpdateTags(false);
            }).catch(err => {
                console.log(err)
            })
    }

    const reloadImage = async () => {
        updatePost();
        window.location.reload();
    }


    const deletePost = () => {
        axios.delete(`http://localhost:8000/posts/${postId}`, { headers })
            .then((response) => {
                console.log(response);
                navigate('/');
            }).catch(err => {
                console.log(err);
            })
        const imageName = postImage.replace('http://localhost:8000/uploads/', '')
        axios.delete(`http://localhost:8000/delete-image/${imageName}`, { headers })
            .then((response) => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => { loadPosts() }, []);

    //Handle Tags
    const handleTagEnter = (e) => {
        if (e.key === 'Enter') {
            setPostTags([
                ...postTags,
                e.target.value,
            ])
            e.target.value = ''
        }
    }

    const editOrCloseImage = () => {
        updateImage && loadPosts()
        setUpdateImage(!updateImage);
    }
    const editOrCloseTitle = () => {
        updateTitle && loadPosts()
        setUpdateTitle(!updateTitle);
    }
    const editOrCloseSubtitle = () => {
        updateSubtitle && loadPosts()
        setUpdateSubtitle(!updateSubtitle);
    }
    const editOrCloseText = () => {
        updateText && loadPosts()
        setUpdateText(!updateText);
    }
    const editOrCloseTags = () => {
        updateTags && loadPosts()
        setUpdateTags(!updateTags);
    }

    //Handle image upload
    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const token = localStorage.getItem('token');
            const { data } = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    Authorization: token,
                }
            })
            setPostImage(`http://localhost:8000${data.url}`)
            const imageName = postImage.replace('http://localhost:8000/uploads/', '')
            axios.delete(`http://localhost:8000/delete-image/${imageName}`, { headers })
                .then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.warn(err);
            alert('Failed to upload a file!')
        }
    }

    return (
        <div className="post">
            <Header />
            {isLoading ? <div className="component-loading"><h1>Loading...</h1></div> : (<div className='post-main'>
                <img
                    src={post.imageUrl}
                    alt=""
                    width='200px'
                />
                <div className='post-info'>
                    {/* UPDATE IMAGE */}
                    <button
                        className={updateImage ? 'close-button' : 'update-image-button'}
                        onClick={editOrCloseImage}
                    >
                        {updateImage ? 'Close' : 'Update image'}
                    </button>
                    {updateImage && (
                        <div className='update-image'>
                            <div className='current-image'>
                                <p>Current image:</p>
                                <p>{postImage}</p>
                            </div>
                            <label className='custom-image-upload'>
                                Upload new image
                                <input
                                    name='upload-file'
                                    ref={inputFileRef}
                                    required
                                    type='file'
                                    filename='img'
                                    onChange={handleChangeFile}
                                />
                            </label>
                            <button className='update-button' onClick={reloadImage}>Update</button>
                        </div>
                    )}
                    <hr></hr>
                    {/* UPDATE TITLE */}
                    <h1>{postTitle}</h1>
                    <button
                        className={updateTitle ? 'close-button' : 'update-title-button'}
                        onClick={editOrCloseTitle}
                    >
                        {updateTitle ? 'Close' : 'Update title'}
                    </button>
                    {updateTitle && (
                        <div className='update-title'>
                            <input
                                type='text'
                                placeholder='Enter new title'
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                            <button className='update-button' onClick={updatePost}>Update</button>
                        </div>
                    )}
                    <hr></hr>
                    {/* UPDATE SUBTITLE */}
                    <h2>{postSubtitle}</h2>
                    <button
                        className={updateSubtitle ? 'close-button' : 'update-subtitle-button'}
                        onClick={editOrCloseSubtitle}
                    >
                        {updateSubtitle ? 'Close' : 'Update subtitle'}
                    </button>
                    {updateSubtitle && (
                        <div className='update-subtitle'>
                            <input
                                type='text'
                                placeholder='Enter new title'
                                value={postSubtitle}
                                onChange={(e) => setPostSubtitle(e.target.value)}
                            />
                            <button className='update-button' onClick={updatePost}>Update</button>
                        </div>
                    )}
                    <hr></hr>
                    {/* UPDATE TEXT */}
                    <p>{postText}</p>
                    <button
                        className={updateText ? 'close-button' : 'update-text-button'}
                        onClick={editOrCloseText}
                    >
                        {updateText ? 'Close' : 'Update text'}
                    </button>
                    {updateText && (
                        <div className='update-text'>
                            <textarea
                                rows={20}
                                cols={80}
                                type='text'
                                placeholder='Enter new title'
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}></textarea>
                            <button className='update-button' onClick={updatePost}>Update</button>
                        </div>
                    )}
                    <hr></hr>
                    {/* UPDATE TAGS */}
                    <div className='display-tags'>
                        <h2>Tags:</h2>
                        <div className='displayed-tags'>
                            {postTags.length !== 0 && postTags.map(el => {
                                return (
                                    <p key={el}>#{el}</p>
                                )
                            })}
                        </div>
                    </div>
                    <button
                        className={updateTags ? 'close-button' : 'update-tags-button'}
                        onClick={editOrCloseTags}
                    >
                        {updateTags ? 'Close' : 'Update tags'}
                    </button>
                    {updateTags && (
                        <div className='update-tags'>
                            <div className='add-tags'>
                                <input
                                    placeholder='Press enter to add a tag'
                                    type='text'
                                    onKeyDown={handleTagEnter}
                                >
                                </input>
                            </div>
                            <div className='added-tags'>
                                {postTags.length !== 0 && postTags.map(el => {
                                    return (
                                        <div key={el} className='added-tag'>
                                            <p>{el}</p>
                                            <div
                                                className='close-tag'
                                                onClick={() => { setPostTags(postTags.filter(e => e !== el)) }}
                                            >
                                                &times;
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className='update-button' onClick={updatePost}>Update</button>
                        </div>
                    )}
                    <hr></hr>
                    {/* UPDATE PUBLISHED */}
                    <p>Published: {published ? 'true' : 'false'}</p>
                    <button onClick={togglePublished}>{published ? 'Unpublish post' : 'Publish post'}</button>
                    <hr></hr>
                    {/* TIMESTAMP */}
                    <p>{timestamp}</p>
                    <hr></hr>
                    {/* VIEW POST */}
                    <button
                        onClick={() => window.open(`http://localhost:3000/posts/${postId}`, '_blank', 'noopener,noreferrer')}
                    >
                        View post
                    </button>
                    <hr></hr>
                    {/* DELETE POST */}
                    <button onClick={deletePost} className='delete-post'>Delete post</button>
                </div>
            </div>)}
            <Footer />
        </div>
    );
}

export default Post;