"use client";

import React, { useEffect, useState } from "react";
import { UserCircle, MoreVertical, Pencil, Trash2, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getYourPost,
  userPostDelete,
} from "../../Reducer/PostReducer/PostAction";
import { loadUser } from "../../Reducer/UserReducer/userAction";
import { clearDeletePost } from "../../Reducer/PostReducer/postReducer";
import EditPostModal from "../Post/EditPostModal";
import Loader from "../Utils/Loader";

const Profile = () => {
  const dispatch = useDispatch();

  const { user ,loading} = useSelector((state) => state.user);
  const { posts, isDeleted } = useSelector((state) => state.post);

  const [menuOpen, setMenuOpen] = useState(null);
  const [openEdit, setOpenEdit] = useState(null);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getYourPost());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      toast.success("Post deleted successfully");
      dispatch(clearDeletePost());
      dispatch(getYourPost());
    }
  }, [isDeleted, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(userPostDelete(id));
      setMenuOpen(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-muted/30">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* PROFILE CARD */}
        <div className="bg-card  rounded-2xl shadow-lg p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-blue-600 p-1">
              <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                <span className="text-5xl font-bold text-white   select-none">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <a
                  href="/profile/edit"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white shadow hover:bg-primary/90 transition"
                >
                  <Pencil size={16} />
                  Edit Profile
                </a>

                <a
                  href="/profile/change-password"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white shadow hover:bg-secondary/80 transition"
                >
                  <Lock size={16} />
                  Change Password
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* POSTS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Your Posts
            <span className="ml-2 text-muted-foreground font-normal">
              ({posts?.length || 0})
            </span>
          </h2>

          {posts && posts.length > 0 ? (
           
            posts.map((post) => (
              <article
                key={post._id}
                className="relative bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* EDIT MODAL */}
                {openEdit && (
                  <EditPostModal
                    post={openEdit}
                    close={() => setOpenEdit(null)}
                  />
                )}

                {/* MENU BUTTON */}
                <button
                  onClick={() =>
                    setMenuOpen(menuOpen === post._id ? null : post._id)
                  }
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent"
                >
                  <MoreVertical size={20} />
                </button>

                {/* MENU */}
                {menuOpen === post._id && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuOpen(null)}
                    />

                    <div className="absolute top-12 right-4 bg-white border rounded-xl shadow-xl w-40 z-20">
                      <button
                        onClick={() => {
                          setOpenEdit(post);
                          setMenuOpen(null);
                        }}
                        className="flex items-center gap-3 px-4 py-3 w-full hover:bg-accent text-sm"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <div className="border-t" />

                      <button
                        onClick={() => handleDelete(post._id)}
                        className="flex items-center gap-3 px-4 py-3 w-full text-destructive hover:bg-destructive/10 text-sm"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </>
                )}

                {/* CONTENT */}
                <p className="text-foreground whitespace-pre-wrap">
                  {post.content}
                </p>

                <p className="text-sm text-muted-foreground mt-3">
                  Posted on{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </article>
            ))
          ) : (
            <div className="bg-card border rounded-2xl p-12 text-center">
              <p className="text-muted-foreground font-medium">No posts yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start sharing your thoughts with the world!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
