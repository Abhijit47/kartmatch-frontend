import Link from 'next/link';

const Swipe = () => {
  return (
    <div className='relative bg-yellow-400  text-center p-10 leading-loose'>
      <h2 className='text-3xl md:text-5xl font-bold text-green-700 '>
        Keep Swiping to discover the
      </h2>
      <h2 className='text-3xl md:text-5xl font-bold text-green-700 '>
        burst of flavours!
      </h2>
      <p className='text-green-700 mt-4 text-xl md:text-2xl '>
        Ah, chaat taste—it's the ultimate balance of flavors, isn't it? The
        combination of sweet, sour,
      </p>
      <p className='text-green-700  text-xl md:text-2xl '>
        salty, spicy, and tangy can make your taste buds do a little happy
        dance!
      </p>
      <div className='mt-6'>
        <Link href='/swipe'>
          <button className='bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700'>
            Swipe Right →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Swipe;
