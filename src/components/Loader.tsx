
// export default function Loader() {
//   return (
//     <div className="flex flex-col items-center justify-center w-full h-[60vh]">
//       <img
//         src='/nanma-removebg-preview.png'
//         alt="Loading..."
//         className="w-30 h-30 "
//       />

//       {/* Loader Text */}
//       <p className="mt-3 text-sm font-medium text-gray-600">
//         Loading, please wait...
//       </p>
//     </div>
//   );
// }



export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-35 h-35 border-4 border-[#8e2d26]/30 border-t-[#8e2d26] rounded-full animate-spin" />
        <img
          src="/nanma-removebg-preview.png"
          alt="Loading"
          className="absolute w-25 h-25 object-contain"
        />
      </div>

      {/* Text */}
      <p className="mt-4 text-sm font-medium text-gray-600 tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
}
