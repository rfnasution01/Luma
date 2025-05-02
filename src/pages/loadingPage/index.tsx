export default function LoadingFallbackPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-gray-700">
      <div className="relative mb-[1.5rem] h-[4rem] w-[4rem] animate-spin rounded-full border-[0.4rem] border-gray-300 border-t-blue-500"></div>
      <p className="font-medium">Loading, please wait...</p>
    </div>
  )
}
