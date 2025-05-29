import React, { useEffect, useState } from 'react';
import article1 from "../assets/article1.jpg";
import { useParams } from 'react-router';
import { viewBlogArticleApi } from '../Services/allApi';


const BlogPage = () => {
  // Like functionality state
  const [likes, setLikes] = useState(2454);
  const [isLiked, setIsLiked] = useState(false);

  // Comment functionality state
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      text: 'This is exactly what I needed! Thanks for the detailed guide.',
      timestamp: '2h ago'
    }
  ]);

  // Handle like button click
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: 'Current User',
        text: commentText,
        timestamp: 'Just now'
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const {id} = useParams()
const[blogArticle, setBlogArticle]= useState([])
  const viewBlog = async()=>{
    const response = await viewBlogArticleApi(id);
    if(response.status === 201){
      const result = response.data
      setBlogArticle(result)
    }
  }
  useEffect(()=>{
    viewBlog()
  },[])
  console.log(blogArticle)

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        {/* Blog Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
           {blogArticle[0]?.title}
          </h1>
          <div className="text-gray-500 text-sm">
            <time>
              {new Date(blogArticle[0]?.createdAt).toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'short',
              year: 'numeric', 
            })}
            </time>
            <span className="mx-2">•</span>
            <span>5 min read</span>
          </div>
        </header>
        <img
                src={blogArticle[0]?.featuredImage}
                alt="Future of Work"
                className="w-full object-cover object-center h-auto"
              />

        {/* Blog Content */}
        <article className="prose max-w-none mb-12">
          <p className="text-gray-700 leading-7 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, doloribus. Exercitationem doloribus possimus asperiores quibusdam nisi et soluta beatae explicabo minima ducimus enim quae, iste tenetur quidem tempora voluptates. Veritatis.
            Unde, quod repellendus! Minus animi, aliquid numquam culpa consequatur illum earum. Quo repudiandae praesentium illum aspernatur nihil amet! Dolore, magnam enim. Quos reprehenderit perferendis aliquid ullam quidem maxime hic! Consequatur!
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Getting Started</h2>
          <p className="text-gray-700 leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, doloribus quas ratione voluptas amet dolorum aspernatur repellat ab optio rem illum consequatur consectetur quis pariatur obcaecati at laborum nemo cumque!
            Necessitatibus iusto eos, maxime sint omnis veniam. Provident molestiae doloribus labore? Exercitationem corrupti dolorem ea aliquam assumenda esse commodi id minus natus dicta est maiores nulla beatae, in voluptatum labore!
          </p><br />
          <p className="text-gray-700 leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, doloribus quas ratione voluptas amet dolorum aspernatur repellat ab optio rem illum consequatur consectetur quis pariatur obcaecati at laborum nemo cumque!
            Necessitatibus iusto eos, maxime sint omnis veniam. Provident molestiae doloribus labore? Exercitationem corrupti dolorem ea aliquam assumenda esse commodi id minus natus dicta est maiores nulla beatae, in voluptatum labore!
          </p>
        </article>

        {/* Interactions Section */}
        <div className="flex items-center justify-between mb-8 border-t border-b border-gray-200 py-6">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            } transition-colors`}
          >
            <svg 
              className="w-5 h-5" 
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span>{likes} Likes</span>
          </button>

          <button className="text-gray-600 hover:text-blue-600 flex items-center">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
              />
            </svg>
            <span className="ml-2">Share</span>
          </button>
        </div>

        {/* Comments Section */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {comments.length} Comment{comments.length !== 1 ? 's' : ''}
          </h3>

          {/* Existing Comments */}
          <div className="space-y-6 mb-8">
            {comments.map(comment => (
              <div 
                key={comment.id} 
                className="border-b border-gray-100 pb-6 last:border-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {comment.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-gray-700">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Write a thoughtful comment...
            </h4>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              rows="4"
              placeholder="Add to the discussion..."
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Comment
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;