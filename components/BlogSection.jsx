import Image from 'next/image';
import Link from 'next/link';

import { blogPosts } from '@/constants';
import Profile from '../public/Profile.png';

export default function BlogSection() {
  return (
    <div className=' py-12 px-6'>
      {/* Title Section */}
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-600'>
          FROM OUR <span className='text-green-600'>BLOG</span>
        </h2>
        <Link href='/blog'>
          <button className='bg-orange-500 cursor-pointer text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600'>
            View All →
          </button>
        </Link>
      </div>

      {/* Blog Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {blogPosts.map((post, index) => (
          <div key={index} className='bg-[#FFD609] p-4 rounded-xl shadow-lg'>
            <div className='w-full h-82 overflow-hidden rounded-lg'>
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className='w-full h-full object-cover'
              />
            </div>
            <span className='bg-red-600 text-white text-sm px-3 py-1 rounded-full mt-4 inline-block'>
              Category
            </span>
            <h3 className='text-2xl font-bold mt-2'>{post.title}</h3>
            <div className='flex items-center gap-3 mt-4'>
              <Image
                src={Profile}
                alt={post.author}
                width={50}
                height={90}
                className='rounded-full object-cover'
              />
              <div className='flex gap-6 justify-evenly'>
                <span className='text-sm font-medium'>{post.author}</span>
                <span className='text-sm text-gray-700'>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
