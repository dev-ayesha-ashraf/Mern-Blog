import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full mx-2 border border-[#85053a] hover:border-2 h-[300px] overflow-hidden rounded-lg sm:w-[400px] md:w-[350px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[220px] w-full object-cover group-hover:h-[180px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col'>
        <p className='text-lg font-semibold text-indigo-900'>{post.title}</p>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-120px] left-0 right-0 border border-[#85053a] text-[#85053a] hover:bg-[#85053a] hover:text-white transition-all duration-300 text-center py-1 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
