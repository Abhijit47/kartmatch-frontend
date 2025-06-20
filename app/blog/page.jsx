import Image from 'next/image';
import Link from 'next/link';
import Blog from '../../public/blog/Blog.png';
import Blog1 from '../../public/Blog1.png';
import Blog3 from '../../public/Blog3.png';
import Blog2 from '../../public/Blog4.png';
import Profile from '../../public/Profile.png';

const blogPosts = [
  {
    id: 1,
    image: Blog1,
    title: 'Samosa: the crispy, spicy hug you need on a bad day.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    id: 2,
    image: Blog2,
    title: 'A good pani puri is like a burst of happiness in your mouth.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    id: 3,
    image: Blog3,
    title: 'If happiness had a flavor, it would be bhel puri.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    id: 4,
    image: Blog1,
    title: 'Samosa: the crispy, spicy hug you need on a bad day.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    id: 5,
    image: Blog2,
    title: 'A good pani puri is like a burst of happiness in your mouth.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    id: 6,
    image: Blog3,
    title: 'If happiness had a flavor, it would be bhel puri.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
];

const blog = () => {
  return (
    <main className='bg-gray-100 mt-24 min-h-screen shadow-lg '>
      <div className=' '>
        <center className='mx-auto p-4 mt-6'>
          <h1 className='text-3xl mt-6 font-semibold text-[#22343DCC] font-Poppins'>
            OUR <span className='text-[#3FA025]'>BLOG</span>
          </h1>
        </center>
        <div className='mt-4 w-full'>
          <div className='relative w-full h-[480px]'>
            <Image
              src={Blog}
              alt='Blog Image'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 p-4'>
          {blogPosts.map((post, index) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              className='bg-[#FFD609] cursor-pointer p-4 rounded-xl shadow-lg'>
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
              <div className='flex items-center gap-2 mt-4'>
                <Image
                  src={Profile}
                  alt={post.author}
                  width={50}
                  height={10}
                  className='rounded-full'
                />
                <span className='text-sm font-medium'>{post.author}</span>
                <span className='text-sm text-gray-700'>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className='flex justify-center items-center space-x-2 mt-6 py-6'>
          {/* Active Page */}
          <button className='px-4 py-2 rounded-lg bg-orange-500 text-white font-medium'>
            1
          </button>

          {/* Other Pages */}
          <button className='px-4 py-2 text-gray-700'>2</button>
          <button className='px-4 py-2 text-gray-700'>3</button>

          {/* Dots */}
          <span className='px-2 text-gray-500'>...</span>

          <button className='px-4 py-2 text-gray-700'>8</button>
          <button className='px-4 py-2 text-gray-700'>9</button>
          <button className='px-4 py-2 text-gray-700'>10</button>
        </div>
      </div>
    </main>
  );
};

export default blog;
