const PostModel = require('../models/Post');

const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get all posts'
        })
    }
}

const getOne = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get a post'
        })
    }
}

const remove = async (req, res) => {
    try {
        const postId = req.params.id
        
        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to remove a post!',
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Post not found!',
                })
            }

            res.json({
                success: true,
                message: 'Post deleted!'
            });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get a post'
        })
    }
}

const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            subtitle: req.body.subtitle,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            isPublished: req.body.isPublished,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create new post!'
        })
    }
}

const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                subtitle: req.body.subtitle,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                isPublished: req.body.isPublished,
            },
        );

        res.json({
            success: true,
            message: 'Post updated!'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update a post!'
        })
    }
}

module.exports = {
    getAll,
    getOne,
    remove,
    create,
    update,
}