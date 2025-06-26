import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: String,
        require: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required: true
    },
}, { timestamps: true })

export const commentModel = mongoose.model('comments', commentSchema)