const express = require('express');
const multer = require('multer');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const Blog = require('../models/Blog');
const auth = require('../middleware/auth')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine });

// @route   POST blogs/saveblog
// @desc    Registering user
router.post('/saveblog', 
    [
        auth, 
        upload.single('image')
    ], 
    async (req, res) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }

    try {
        let blog = new Blog();
        let blogdata = JSON.parse(JSON.stringify(req.body))
        
        blog.user = req.user.id;
        blog.title = blogdata.title;
        blog.description = blogdata.description;
        if (req.file !== undefined) {
            blog.imagename = req.file.path;
        }
        
        await blog.save();
        return res.send(true)
    }
    catch(err) {
        console.log(err.message);
        res.status(400).send('Server Error')
    }
})

// @route   GET blogs/getblogs
// @desc    Get List of blogs
router.get('/getblogs', auth,  async (req, res) => {
    try {
        const blog = await Blog.find();

        res.json(blog);
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router