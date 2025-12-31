import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { commentOnPost } from "../../Reducer/PostReducer/PostAction";

const CommentModal = ({ post, close }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleSubmit = () => {
    if (!isAuthenticated) {
      return toast.error("Please login to post comments.");
    }
    const trimmed = comment.trim();
    if (!trimmed) return;

    if (dispatch(commentOnPost(post._id, comment))) {
      toast.success("comment posted successfully");
    } else {
      toast.error("comment posted failed");
    }

    setComment("");
    close();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4"
      onClick={close}
    >
      <div
        className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b">
          <h2 className="text-base sm:text-xl font-semibold">
            Comments
            {post?.comments?.length > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({post.comments.length})
              </span>
            )}
          </h2>

          <button
            onClick={close}
            className="p-2 rounded-full hover:bg-accent transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-3">
          {post?.comments?.length > 0 ? (
            post.comments.map((c, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg hover:bg-accent/50 transition"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {c.userName?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold">
                      {c.userName || "Anonymous"}
                    </p>
                    {c.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {c.timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-1 break-words">{c.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-sm text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="border-t px-4 sm:px-6 py-3 sm:py-4 bg-muted/20">
          <textarea
            rows={3}
            className="w-full rounded-xl border px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-ring"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-3">
            <button
              onClick={close}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm bg-red-600 hover:bg-secondary/80"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!comment.trim()}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-primary/90 disabled:opacity-50"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
