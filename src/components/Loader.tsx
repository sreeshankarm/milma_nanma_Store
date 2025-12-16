
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh]">
      <img
        src='/nanma-removebg-preview.png'
        alt="Loading..."
        className="w-30 h-30 "
      />

      {/* Loader Text */}
      <p className="mt-3 text-sm font-medium text-gray-600">
        Loading, please wait...
      </p>
    </div>
  );
}
