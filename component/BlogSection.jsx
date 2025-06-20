import Image from 'next/image';
import Link from 'next/link';
import Blog1 from '../public/Blog1.png';
import Blog3 from '../public/Blog3.png';
import Blog2 from '../public/Blog4.png';
import Profile from '../public/Profile.png';

const blogPosts = [
  {
    image: Blog1,
    title: 'Samosa: the crispy, spicy hug you need on a bad day.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    image: Blog2,
    title: 'A good pani puri is like a burst of happiness in your mouth.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    image: Blog3,
    title: 'If happiness had a flavor, it would be bhel puri.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
];

const BlogSection = () => {
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
};

export default BlogSection;
