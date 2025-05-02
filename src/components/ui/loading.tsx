import clsx from 'clsx'

export default function Loading({
  height = 'h-[4rem]',
  width = 'w-[4rem]',
}: {
  height?: string
  width?: string
}) {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-white text-gray-700">
      <div
        className={clsx(
          'relative mb-[1.5rem] w-[4rem] animate-spin rounded-full border-[0.4rem] border-gray-300 border-t-blue-500',
          height,
          width,
        )}
      />
      <p className="font-medium">Loading, please wait...</p>
    </div>
  )
}
