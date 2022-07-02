const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagename: {
        type: String
    }
});

module.exports = Blog = mongoose.model('blog', BlogSchema);