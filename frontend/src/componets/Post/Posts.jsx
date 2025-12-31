"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts, likePost } from "../../Reducer/PostReducer/PostAction"
import Newpost from "./newpost"
import CommentModal from "./CommentModal"
import Error from "../Utils/Error"
import toast from "react-hot-toast"
import Loader from "../Utils/Loader"

const Posts = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const { error, loading, posts, hasMore } = useSelector((state) => state.post)
  const [openPost, setOpenPost] = useState(null)
  const [page, setPage] = useState(1)

  

  const handleLike = (postId) => {
    if (!isAuthenticated) {
      return toast.error("Please login to Like this post.")
    }
    // Then dispatch the actual action
    dispatch(likePost(postId))
    
  }

  const handlePageChange = () => {
    setPage((pre) => pre + 1)
    console.log(page)
  }
  useEffect(() => {
    dispatch(getAllPosts(page))
  }, [dispatch, page])

  useEffect(() => {
    if (posts && posts.length > 0) {
      const likesMap = {}
      posts.forEach((post) => {
        likesMap[post._id] = {
          hasLiked: post.likes?.includes(user?._id) || false,
          count: post.likes?.length || 0,
        }
      })
    }
  }, [posts, user?._id,])


  
  if (loading && page === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <Loader/>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <Error error={error} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Post Input */}
        <div className="mb-6">
          <Newpost />
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => {
              const likeState = {
                hasLiked: post.likes?.includes(user?._id),
                count: post.likes?.length || 0,
              }
              const hasLiked = likeState.hasLiked
              const likesCount = likeState.count
              const commentsCount = post.comments?.length || 0

              return (
                <article
                  key={post._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 p-4 sm:p-5 pb-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                        {post.userId?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                        {post.userId?.name || "Unknown User"}
                      </h3>
                      <time className="text-xs sm:text-sm text-gray-500 mt-0.5 block">
                        {new Date(post.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 sm:px-5 pb-3">
                    <p className="text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                      {post.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 border-t border-gray-100 px-2 sm:px-3 py-1.5">
                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(post._id)
                      }
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all hover:bg-gray-50 active:scale-95 ${
                        hasLiked ? "text-rose-600" : "text-gray-600"
                      } `}
                    >
                       <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill={hasLiked ? "currentColor" : "none"}
                        className={`w-5 h-5 transition ${
                          hasLiked ? "text-rose-600" : "text-gray-600"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                          -1.935 0-3.597 1.126-4.312 2.733
                          -.715-1.607-2.377-2.733-4.313-2.733
                          C5.1 3.75 3 5.765 3 8.25
                          c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <span className="text-sm sm:text-base font-medium">{likesCount > 0 && likesCount}</span>
                    </button>

                    {/* Comment Button */}
                    <button
                      onClick={() => setOpenPost(post)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-gray-600 transition-all hover:bg-gray-50 hover:text-blue-600 active:scale-95"
                      aria-label="View comments"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                        />
                      </svg>
                      <span className="text-sm sm:text-base font-medium">{commentsCount > 0 && commentsCount}</span>
                    </button>
                  </div>
                </article>
              )
            })
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No posts yet</p>
              <p className="text-gray-400 text-sm mt-1">Be the first to share something!</p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          {hasMore ? (
            <button
              onClick={handlePageChange}
              className="px-6 py-2 t bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Load More
            </button>
          ) : (
            <button className="px-6 py-2 t bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
              All caught up
            </button>
          )}
        </div>

        {/* Comment Modal */}
        {openPost && <CommentModal post={openPost} close={() => setOpenPost(null)} />}
      </main>
    </div>
  )
}

export default Posts
