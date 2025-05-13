import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

export const Profile = () => {
    const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
    const [selectedImage, setSelectedImage] = useState(null)
    const fileInputRef = useRef();

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log("file object:", file);
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setSelectedImage(base64Image)
            await updateProfile({ profilePic: base64Image })
        }

    };

    return (
        <div className="min-h-screen pt-20 " >
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-primary">Profile</h1>
                        <p className="mt-2 text-sm text-gray-400">Your profile information</p>
                    </div>

                    {/* Profile Image Upload */}
                   <div className="flex justify-center relative">
  <div className="w-44 h-44 rounded-full bg-base-100 flex items-center justify-center overflow-hidden relative border-2 border-gray-200">
    <img
      src={selectedImage || authUser?.data?.profilePic || "/default-avatar.png"}
      alt="profile"
      className="w-full h-full object-cover"
    />
    <div
      onClick={() => fileInputRef.current.click()}
      className="absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer hover:bg-primary-focus transition-colors"
    >
      <Camera className="text-white w-10 h-10" />
    </div>
    <input
      type="file"
      id="avatar-upload"
      accept="image/*"
      onChange={handleImage}
      ref={fileInputRef}
      disabled={isUpdatingProfile}
      className="hidden"
    />
  </div>
</div>
                    <h1 className="text-center"> {isUpdatingProfile ? "...Loading" : "Click The Camera Icon To Upload Image"} </h1>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium block mb-1">Full Name</label>
                            <input
                                type="text"
                                defaultValue={authUser?.data?.fullname || ""}
                                className="input input-bordered w-full"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1">Email Address</label>
                            <input
                                type="email"
                                disabled
                                defaultValue={authUser?.data?.email || ""}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* account information part  */}
                    <div className="space-y-2 bg-base-300 mt-6 p-6">
                        <h1 className="text-center text-xl font-bold">Account Information </h1>

                        <div className=" flex items-center justify-between py-2 border-b mt-6">

                            <span className="font-semibold text-md">Created At  </span>
                            <span>{authUser?.data?.createdAt.split("T")[0]}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b mt-4">

                            <span className="font-semibold text-md">Updated At   </span>
                            <span>{authUser?.data?.updatedAt.split("T")[0]}</span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b mt-4">
                            <span>Status  </span>
                            <span className="text-green-500">Active</span>

                        </div>



                    </div>

                    <div className=" text-center">
                        <button className="btn btn-primary w-1/2" onClick={() => logout()}> logout</button>
                    </div>



                </div>
            </div>
        </div>
    );
};
