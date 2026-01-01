export const BlogSkeleton = () => {
  return (
    <div className='w-full max-w-screen-xl animate-pulse'>
      <div className='border-b border-slate-200 pb-4 pt-6'>
        <div className='flex items-center gap-2'>
          <div className='h-3 w-32 bg-gray-300 rounded-full' />
          <div className='h-3 w-24 bg-gray-300 rounded-full' />
        </div>

        <div className='mt-4 h-4 w-64 bg-gray-300 rounded-full' />
        <div className='mt-2 h-3 w-80 bg-gray-200 rounded-full' />
        <div className='mt-4 h-3 w-40 bg-gray-200 rounded-full' />
      </div>
    </div>
  );
};
