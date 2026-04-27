// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { changePasswordApi } from "../api/auth.api";
// import { ToastContainer } from "react-toastify";

// interface ChangePasswordForm {
//   existingpassword: string;
//   password: string;
//   password_confirmation: string;
// }

// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const [show, setShow] = useState({
//     old: false,
//     new: false,
//     confirm: false,
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<ChangePasswordForm>({
//     mode: "onBlur",
//   });

//   const onSubmit = async (data: ChangePasswordForm) => {
//     try {
//       await changePasswordApi(data);
//       toast.success("Password changed successfully");

//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 1000);
//     } catch (err: any) {
//       if (err?.response?.data?.invalidexistingpassword) {
//         toast.error("Current password is incorrect");
//       } else if (err?.response?.data?.errors?.password) {
//         toast.error(err.response.data.errors.password[0]);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex justify-center -mt-14 mb-4">
//           <img
//             src="/nanma.png"
//             alt="Nanma"
//             className="w-24 h-24 rounded-full border-4 border-white"
//           />
//         </div>

//         <h2 className="text-center text-xl font-semibold mb-6 text-[#8e2d25]">
//           Change-Password
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* CURRENT PASSWORD */}
//           <div className="mb-4">
//             <label className="text-sm font-medium">Current Password</label>
//             <div className="relative mt-1">
//               <input
//                 type={show.old ? "text" : "password"}
//                 placeholder="Current Password"
//                 {...register("existingpassword", {
//                   required: "Current password is required",
//                 })}
//                 className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm
//                 ${
//                   errors.existingpassword ? "border-red-400" : "border-gray-300"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShow({ ...show, old: !show.old })}
//                 className="absolute right-3 top-2.5 text-gray-400"
//               >
//                 {show.old ? <Eye size={18} /> : <EyeOff size={18} />}
//               </button>
//             </div>
//             {errors.existingpassword && (
//               <p className="text-xs text-red-500">
//                 {errors.existingpassword.message}
//               </p>
//             )}
//           </div>

//           {/* NEW PASSWORD */}
//           <div className="mb-4">
//             <label className="text-sm font-medium">New Password</label>
//             <div className="relative mt-1">
//               <input
//                 type={show.new ? "text" : "password"}
//                 placeholder="New Password"
//                 {...register("password", {
//                   required: "New password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Min 6 characters",
//                   },
//                   maxLength: {
//                     value: 20,
//                     message: "Max 20 characters",
//                   },
//                 })}
//                 className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm
//                 ${errors.password ? "border-red-400" : "border-gray-300"}`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShow({ ...show, new: !show.new })}
//                 className="absolute right-3 top-2.5 text-gray-400"
//               >
//                 {show.new ? <Eye size={18} /> : <EyeOff size={18} />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-xs text-red-500">{errors.password.message}</p>
//             )}
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div className="mb-6">
//             <label className="text-sm font-medium">Confirm Password</label>
//             <div className="relative mt-1">
//               <input
//                 type={show.confirm ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 {...register("password_confirmation", {
//                   required: "Confirm password is required",
//                   validate: (val) =>
//                     val === watch("password") || "Passwords do not match",
//                 })}
//                 className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm
//                 ${
//                   errors.password_confirmation
//                     ? "border-red-400"
//                     : "border-gray-300"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShow({ ...show, confirm: !show.confirm })}
//                 className="absolute right-3 top-2.5 text-gray-400"
//               >
//                 {show.confirm ? <Eye size={18} /> : <EyeOff size={18} />}
//               </button>
//             </div>
//             {errors.password_confirmation && (
//               <p className="text-xs text-red-500">
//                 {errors.password_confirmation.message}
//               </p>
//             )}
//           </div>

//           <div className="flex gap-3">
//             {/* CANCEL */}
//             <button
//               type="button"
//               onClick={() => navigate("/signin")}
//               disabled={isSubmitting}
//               className={`
//       w-1/2 rounded-lg py-2.5 text-sm font-semibold
//       border border-gray-300 text-gray-700
//       hover:bg-gray-100 transition
//       ${isSubmitting ? "cursor-not-allowed opacity-60" : ""}
//     `}
//             >
//               Cancel
//             </button>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`
//       w-1/2 rounded-lg py-2.5 text-sm font-semibold text-white
//       transition
//       ${
//         isSubmitting
//           ? "bg-gray-400 cursor-not-allowed"
//           : "bg-[#8e2d25] hover:bg-[#b91c1c]"
//       }
//     `}
//             >
//               {isSubmitting ? "Updating..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//             <ToastContainer position="top-right" autoClose={1200} />

//     </div>
//   );
// };

// export default ChangePassword;

// import { Lock, Save, Eye, EyeOff } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { changePasswordApi } from "../api/auth.api";

// interface ChangePasswordForm {
//   existingpassword: string;
//   password: string;
//   password_confirmation: string;
// }

// const ChangePassword: React.FC = () => {
//   const [show, setShow] = useState({
//     old: false,
//     new: false,
//     confirm: false,
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<ChangePasswordForm>();

//   const onSubmit = async (data: ChangePasswordForm) => {
//     try {
//       await changePasswordApi(data);
//       toast.success("Password updated successfully");
//     } catch (err: any) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-300 p-4 space-y-4">

//       {/* Title */}
//       <h3 className="font-semibold flex items-center gap-2">
//         <Lock size={16} />
//         Change Password
//       </h3>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//         {/* Current Password */}
//         <div className="space-y-1">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock size={16} className="text-gray-400" />
//             </div>

//             <input
//               type={show.old ? "text" : "password"}
//               {...register("existingpassword", {
//                 required: "Current password required",
//               })}
//               className="w-full h-10 border border-gray-300 rounded-xl pl-10 pr-10 text-sm
//                          focus:outline-none focus:ring-2 focus:ring-sky-200"
//               placeholder="Current Password"
//             />

//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//               <button
//                 type="button"
//                 onClick={() => setShow({ ...show, old: !show.old })}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 {show.old ? <Eye size={16} /> : <EyeOff size={16} />}
//               </button>
//             </div>
//           </div>

//           {errors.existingpassword && (
//             <p className="text-xs text-red-500">
//               {errors.existingpassword.message}
//             </p>
//           )}
//         </div>

//         {/* New Password */}
//         <div className="space-y-1">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock size={16} className="text-gray-400" />
//             </div>

//             <input
//               type={show.new ? "text" : "password"}
//               {...register("password", {
//                 required: "New password required",
//                 minLength: { value: 6, message: "Min 6 characters" },
//               })}
//               className="w-full h-10 border border-gray-300 rounded-xl pl-10 pr-10 text-sm
//                          focus:outline-none focus:ring-2 focus:ring-sky-200"
//               placeholder="New Password"
//             />

//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//               <button
//                 type="button"
//                 onClick={() => setShow({ ...show, new: !show.new })}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 {show.new ? <Eye size={16} /> : <EyeOff size={16} />}
//               </button>
//             </div>
//           </div>

//           {errors.password && (
//             <p className="text-xs text-red-500">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div className="space-y-1">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock size={16} className="text-gray-400" />
//             </div>

//             <input
//               type={show.confirm ? "text" : "password"}
//               {...register("password_confirmation", {
//                 required: "Confirm password required",
//                 validate: (val) =>
//                   val === watch("password") || "Passwords do not match",
//               })}
//               className="w-full h-10 border border-gray-300 rounded-xl pl-10 pr-10 text-sm
//                          focus:outline-none focus:ring-2 focus:ring-sky-200"
//               placeholder="Confirm Password"
//             />

//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//               <button
//                 type="button"
//                 onClick={() =>
//                   setShow({ ...show, confirm: !show.confirm })
//                 }
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 {show.confirm ? <Eye size={16} /> : <EyeOff size={16} />}
//               </button>
//             </div>
//           </div>

//           {errors.password_confirmation && (
//             <p className="text-xs text-red-500">
//               {errors.password_confirmation.message}
//             </p>
//           )}
//         </div>

//         {/* Save Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full h-11 bg-[#8b0000] text-white rounded-xl font-semibold
//                      flex items-center justify-center gap-2
//                      disabled:opacity-60 hover:bg-[#b91c1c] transition"
//         >
//           <Save size={16} className="shrink-0" />
//           <span>{isSubmitting ? "Saving..." : "Update Password"}</span>
//         </button>

//       </form>
//     </div>
//   );
// };

// export default ChangePassword;

import { Lock, Save, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordApi } from "../../api/auth.api";

interface ChangePasswordForm {
  existingpassword: string;
  password: string;
  password_confirmation: string;
}

const ChangePassword: React.FC = () => {
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>();

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      const res = await changePasswordApi(data);

      // ✅ Success
      if (res?.data?.success === 1) {
        toast.success("Password updated successfully");

        // Reset form fields
        reset();

        // Hide all passwords again
        setShow({
          old: false,
          new: false,
          confirm: false,
        });

        return;
      }
    } catch (error: any) {
      const response = error?.response?.data;

      // ❌ Invalid current password
      if (response?.invalidexistingpassword === 1) {
        toast.error("Current password is incorrect");
        return;
      }

      // ❌ Backend validation errors
      if (response?.errors) {
        const firstError = Object.values(response.errors)[0] as string[];
        toast.error(firstError[0]);
        return;
      }

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-4 space-y-4">
      {/* Title */}
      <h3 className="font-semibold flex items-center gap-2">
        <Lock size={16} />
        Change Password
      </h3>
      <div className="border-t border-gray-300 pt-3 space-y-2"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Current Password */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-gray-400" />
            </div>

            <input
              type={show.old ? "text" : "password"}
              {...register("existingpassword", {
                required: "Current password required",
              })}
              className="w-full h-10 border border-gray-300 rounded-xl pl-10 pr-10 text-sm
                         focus:outline-none focus:ring-2 focus:ring-sky-200"
              placeholder="Current Password"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShow({ ...show, old: !show.old })}
                className="text-gray-400 hover:text-gray-600"
              >
                {show.old ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          {errors.existingpassword && (
            <p className="text-xs text-red-500">
              {errors.existingpassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-gray-400" />
            </div>

            <input
              type={show.new ? "text" : "password"}
              {...register("password", {
                required: "New password required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters allowed",
                },
              })}
              className="w-full h-10 border border-gray-300 rounded-xl pl-10 pr-10 text-sm
                         focus:outline-none focus:ring-2 focus:ring-sky-200"
              placeholder="New Password"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShow({ ...show, new: !show.new })}
                className="text-gray-400 hover:text-gray-600"
              >
                {show.new ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-gray-400" />
            </div>

            <input
              type={show.confirm ? "text" : "password"}
              {...register("password_confirmation", {
                required: "Confirm password required",
                validate: (val) =>
                  val === watch("password") || "Passwords do not match",
              })}
              className="w-full h-10 border border-gray-300 rounded-xl pl-10 pr-10 text-sm
                         focus:outline-none focus:ring-2 focus:ring-sky-200"
              placeholder="Confirm Password"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                className="text-gray-400 hover:text-gray-600"
              >
                {show.confirm ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          {errors.password_confirmation && (
            <p className="text-xs text-red-500">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-[#8b0000] text-white rounded-xl font-semibold
                     flex items-center justify-center gap-2
                     disabled:opacity-60 hover:bg-[#b91c1c] transition cursor-pointer"
        >
          <Save size={16} className="shrink-0" />
          <span>{isSubmitting ? "Saving..." : "Update Password"}</span>
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
