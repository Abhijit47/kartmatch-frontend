import Image from 'next/image';
import BlogImage1 from '../../../public/blog/BlogPageId/Blog.png';
import BlogImage2 from '../../../public/blog/BlogPageId/Blog1.png';
import AuthorAvatar from '../../../public/Profile.png';

const BlogPage = () => {
  return (
    <main className='bg-gray-100 py-12'>
      <div className='max-w-5xl mx-auto px-6 py-24 text-justify '>
        {/* Header */}
        <h2 className='text-4xl font-bold text-center text-gray-900'>
          OUR <span className='text-green-600'>BLOG</span>
        </h2>

        {/* Blog Title & Category */}
        <div className='mt-6 w-full'>
          <span className='bg-red-500 text-white text-sm px-4 py-1 rounded-lg'>
            Category
          </span>
          <h1 className='text-3xl font-semibold mt-3'>
            A good pani puri is like a burst of happiness in your mouth.
          </h1>
        </div>

        {/* Author Details */}
        <div className='mt-4 flex items-center space-x-3 text-gray-600'>
          <Image
            src={AuthorAvatar}
            alt='Anjika'
            className='w-10 h-10 rounded-full object-cover'
          />
          <span className='font-semibold'>Anjika</span>
          <span>•</span>
          <span>April 1st, 2025</span>
        </div>

        {/* Blog Content */}
        <p className='mt-6 text-gray-800 leading-relaxed'>
          There are very few street foods in India that evoke the same level of
          passion and nostalgia as pani puri. This humble yet irresistible snack
          is not just food; it’s an experience—one that tingles your taste buds,
          excites your senses, and leaves you craving for more.
        </p>

        {/* Section 1 - First Image on Right */}
        <h3 className='mt-8 text-2xl font-semibold'>The Magic of Pani Puri</h3>
        <div className='mt-4 flex flex-col md:flex-row items-center gap-6'>
          <p className='text-gray-700 flex-1'>
            The beauty of pani puri lies in its simplicity. A crisp, hollow puri
            is filled with a flavorful mix of spiced potatoes, chickpeas, and
            tangy tamarind chutney, only to be dunked into a chilled, spicy, and
            tangy pani (flavored water). The moment it reaches your mouth, the
            puri shatters, releasing an explosion of flavors that is both
            refreshing and satisfying.
          </p>
          <Image
            src={BlogImage1}
            alt='Pani Puri'
            className='w-80 rounded-lg shadow-md'
          />
        </div>

        {/* Section 2 */}
        <h3 className='mt-8 text-2xl font-semibold'>
          Why Do We Love Pani Puri So Much?
        </h3>
        <p className='mt-4 text-gray-700'>
          <strong>Perfect Balance of Flavors:</strong> Sweet, spicy, tangy, and
          savory, all in one bite. <br />
          <strong>Crunchy & Juicy:</strong> The crispy puri meets the flavorful
          pani, creating an unforgettable texture. <br />
          <strong>Customizable Delight:</strong> From mild to extra spicy, from
          sweet chutney to spicy water. <br />
          <strong>A Social Food:</strong> Whether at a street stall or a family
          gathering, pani puri is best enjoyed with company.
        </p>

        {/* Section 3 - Second Image on Left */}
        <h3 className='mt-8 text-2xl font-semibold'>
          Regional Variations of Pani Puri
        </h3>
        <div className='mt-4 flex flex-col md:flex-row items-center gap-6'>
          <Image
            src={BlogImage2}
            alt='Pani Puri Variations'
            className='w-80 rounded-lg shadow-md'
          />
          <ul className='text-gray-700 list-disc pl-5 flex-1'>
            <li>
              <strong>Gol Gappa (North India)</strong> – Filled with tangy and
              spicy mint water.
            </li>
            <li>
              <strong>Puchka (West Bengal)</strong> – Uses tamarind and mashed
              potatoes for an extra punch.
            </li>
            <li>
              <strong>Gupchup (Odisha, Jharkhand)</strong> – Often smaller in
              size, served with a spicier kick.
            </li>
            <li>
              <strong>Pani Puri (Maharashtra & Gujarat)</strong> – The classic
              version, sometimes paired with ragda (spicy white peas).
            </li>
          </ul>
        </div>

        {/* Final Section */}
        <h3 className='mt-8 text-2xl font-semibold'>
          The Ultimate Pani Puri Experience
        </h3>
        <p className='mt-4 text-gray-700'>
          To truly enjoy pani puri, you must stand by a street vendor, plate in
          hand, waiting for each puri to be freshly filled. The excitement
          builds with every bite, and before you know it, you’re saying,
          “Bhaiya, ek aur dena!”
        </p>
      </div>
    </main>
  );
};

export default BlogPage;
