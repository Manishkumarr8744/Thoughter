import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, getAllPosts } from "../../Reducer/PostReducer/PostAction";
import { clearCreated } from "../../Reducer/PostReducer/newPostReducer";

const Newpost = () => {
  const dispatch = useDispatch();

  const { loading, isCreated, error } = useSelector((state) => state.newPost);
  const {user,isAuthenticated} = useSelector((state)=>state.user);

  const [content, setContent] = useState("");

  const handlePost = () => {
    if(!isAuthenticated){
      return toast.error("Please login to create a post.");
    }
    if (!content.trim()) return toast.error("Post cannot be empty!");

    dispatch(createNewPost(content));
  };

  useEffect(() => {
    if (isCreated) {
      toast.success("Post created successfully!");
      dispatch(getAllPosts());
      setContent("");
      dispatch(clearCreated());
    }

    if (error) {
      toast.error(error);
    }
  }, [isCreated, error]);

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-white/50 text-gray-800 p-5 rounded-2xl shadow-lg mb-8 transition hover:shadow-2xl">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="💭 What's on your mind?"
        className="w-full p-3 bg-white/40 border border-gray-300 rounded-xl placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows="3"
      ></textarea>

      <div className="flex justify-end mt-3">
        <button
          onClick={handlePost}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
          } text-white font-semibold px-5 py-2 rounded-lg shadow transition`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default Newpost;
