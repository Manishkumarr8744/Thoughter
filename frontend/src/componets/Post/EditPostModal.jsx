import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getYourPost, updateUserPost } from "../../Reducer/PostReducer/PostAction";
import { clearUpdated } from "../../Reducer/PostReducer/postReducer";

const EditPostModal = ({ post, close }) => {    
  const dispatch = useDispatch();
  const {loading,error, isUpdated}=useSelector((state)=>state.post);

  const [content, setcontent] = useState(post.content || "");

  const handleSubmit = () => {
    const trimmedcontent= content.trim();
    if (!trimmedcontent ) return;
    dispatch(updateUserPost(post._id, content));
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Post updated successfully");
      dispatch(clearUpdated());
      dispatch(getYourPost());
      close();
    }
    if(error){
      toast.error(error);
      close();
    }
    
  }, [dispatch, error,isUpdated]);

  return (
    <div
      className="
        fixed inset-0 
        bg-black/40 
        flex items-center justify-center 
        z-50
      "
    >
      <div
        className="
          bg-white 
          rounded-xl 
          shadow-2xl 
          w-[70%] max-w-2xl 
          p-6
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Edit Post</h2>
          <button className="text-gray-600 hover:text-red-600" onClick={close}>
            ✖
          </button>
        </div>


        {/* Description Textarea */}
        <textarea
          className="
            w-full 
            border 
            rounded-lg 
            p-2 
            focus:ring focus:ring-blue-300 
            outline-none
          "
          rows="4"
          placeholder="Edit description..."
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        ></textarea>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-4 space-x-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            onClick={close}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
