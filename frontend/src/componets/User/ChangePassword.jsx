import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { changePassword } from "../../Reducer/UserReducer/userAction";
import { changePasswordReset } from "../../Reducer/UserReducer/userReducer";

const ChangePassword = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const{loading,isUpdated,error}=useSelector((state)=>state.user);
    
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    


    const handleChangePassword=async(e)=>{
        e.preventDefault();
        if(newPassword===confirmPassword){
            dispatch(changePassword({oldPassword,newPassword}))
        }else{
            toast.error("New password not matched")
        }
    }

    useEffect(()=>{
        if(isUpdated){
            toast.success("Password changed Successfully");
            navigate("/profile")

        }
        if(error){
            toast.error(error);
            dispatch(changePasswordReset());
        }
    },[dispatch,isUpdated,error])



  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#eef1f5] px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          {/* Old Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Old Password
            </label>
            <input
              value={oldPassword}
              onChange={(e)=>setOldPassword(e.target.value)}
              type="password"
              placeholder="Enter old password"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Re-enter new password"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
