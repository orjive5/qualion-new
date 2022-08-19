import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './NewPost.css'

const NewPost = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/protected', {
            headers: {
            Authorization: token,
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
            navigate('/login')
        })
    }, [])

    const [postTitle, setPostTitle] = useState('');
    const [postSubtitle, setPostSubtitle] = useState('');
    const [postText, setPostText] = useState('');
    const [postTags, setPostTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [postStatus, setPostStatus] = useState('');
    const inputFileRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        axios.post('http://localhost:8000/posts', {
            title: postTitle,
            subtitle: postSubtitle,
            tags: postTags.split(',').map(el => el.trim()),
            text: postText,
            imageUrl: imageUrl,
            }, {
                headers: {
                    Authorization: token,
                }
            })
            .then((response) => {
                console.log(response)
                setPostTitle('');
                setPostSubtitle('');
                setPostText('');
                setPostTags('');
                setPostStatus('Post created successfully!');
            }).catch(err => {
                console.log(err)
            })
    }

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
            setImageUrl(`http://localhost:8000${data.url}`)
            console.log(data)
        } catch (err) {
            console.warn(err);
            alert('Failed to upload a file!')
        }
    }

    return (
        <div className='new-post-form'>
            <h1>Create new post</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Title:
                    <input
                        type='text'
                        required
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                </label>
                <label>Subtitle:
                    <input
                        type='text'
                        required
                        value={postSubtitle}
                        onChange={(e) => setPostSubtitle(e.target.value)}
                    />
                </label>
                <label>Post text:
                    <textarea
                        required
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    >
                    </textarea>
                </label>
                <label>Tags:
                    <input
                        type='text'
                        required
                        value={postTags}
                        onChange={(e) => setPostTags(e.target.value)}
                    >
                    </input>
                </label>
                <label>Upload image:
                    <input
                        ref={inputFileRef}
                        required
                        type='file'
                        filename='img'
                        onChange={handleChangeFile}
                    />
                </label>
                <input type='submit'></input>
            </form>
            <p>{postStatus}</p>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )
}

export default NewPost;