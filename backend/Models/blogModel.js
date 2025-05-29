import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true,
    }, 
    featuredImage: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
},{timestamps:true})

export const Blog = mongoose.model("Blog", blogSchema)