import Image from 'next/image';
import Link from 'next/link';

import Hero1 from '../public/Hero1.png';
import banner from '../public/banner.png';

const Hero = () => {
  return (
    <section className='relative bg-[#F51F1F] min-h-screen flex items-center justify-center px-4 md:px-10 lg:px-16 overflow-hidden'>
      <div className='relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-6xl mx-auto'>
        {/* Left Side Content */}
        <div className='w-full lg:w-1/2 flex flex-col gap-5 items-start justify-center relative py-10'>
          {/* Decorative Image */}
          <div className='absolute -top-10 -left-15 hidden md:block z-20'>
            <Image src={Hero1} alt='Hero Decorative' width={220} height={250} />
          </div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-8 lg:mt-40 font-bold font-serif z-10'>
            It's a MATCH!
          </h1>

          <p className='text-sm sm:text-base md:text-lg lg:text-xl max-w-md z-10'>
            Street food is a love affair—hot, spicy, and oh-so-satisfying.
          </p>

          <Link href='/blog' passHref>
            <div className='bg-[#FF9534] mt-4 md:mt-6 text-white text-base sm:text-lg md:text-xl py-3 px-6 sm:py-4 sm:px-10 rounded-md hover:bg-white hover:text-black transition duration-300 z-10 cursor-pointer'>
              More info →
            </div>
          </Link>
        </div>

        {/* Right Side Content */}
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center gap-4 mt-6 lg:mt-0 z-10'>
          {/* Lottie Animation */}
          <div className='w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] aspect-square overflow-hidden flex items-center justify-center'>
            <iframe
              src='https://lottie.host/embed/4b9ce18c-2165-4f73-9d33-7fcd67b65620/asJHwsbvBb.lottie'
              className='w-full h-full'
              frameBorder='0'
              allowFullScreen
              title='Street Food Animation'></iframe>
          </div>

          {/* Banner Image */}
          <div className='w-full max-w-[360px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px] h-[140px] sm:h-[180px] md:h-[220px] lg:h-[280px] mt-[-120px] sm:mt-[-160px] md:mt-[-200px] lg:mt-[-250px] overflow-hidden'>
            <Image
              src={banner}
              alt='Banner'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
