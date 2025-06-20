'use client';

// import Hand from "../../../public/assets/Hand.png";
// import Tongue from "../../../public/assets/Tongue.png";
// import Man from "../../../public/assets/Man.png";
import Lottie from 'lottie-react';
// import a1 from '../../../Downloads/1.json';
import a1 from '../Downloads/1.json';
import a2 from '../Downloads/2.json';
import a3 from '../Downloads/3.json';

const cardData = [
  {
    image: a1,
    title: 'HYGIENE',
    description:
      'Good hygiene is the secret ingredient in every perfect plate of chaat!',
    color: '#3FA025',
  },
  {
    image: a2,
    title: 'TASTE',
    description: "It's the ultimate balance of flavors, isn't it?",
    color: '#3FA025',
    scaleUp: true,
  },
  {
    image: a3,
    title: 'HOSPITALITY',
    description: 'Chaat vendor’s stall feels like the calm in the storm.',
    color: '#3FA025',
  },
];

const Preferences = () => {
  return (
    <div className=' w-full py-10 px-6 '>
      {/* Title Section */}
      <h1 className='text-4xl font-semibold text-gray-600'>
        PICK <span className='text-green-600'>ANY 2</span> Preferences
      </h1>

      {/* Card Section */}
      <div className='mt-10 flex flex-wrap justify-around text-center gap-6'>
        {cardData.map((item, index) => (
          <div
            key={index}
            className='flex flex-col items-center p-2 h-min-content w-70 rounded-4xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300'
            style={{ backgroundColor: item.color }}>
            {/* <Image
              src={item.image}
              alt={item.title}
              width={item.title === "TASTE" ? 80 : 40}
              height={item.title === "TASTE" ? 20 : 40}
              className="object-contain"
            /> */}
            <Lottie
              animationData={item.image}
              loop={true}
              width={5}
              height={5}
              className='w-30 '
            />
            <h2 className='text-xl text-white font-semibold '>{item.title}</h2>
            <p className='text-lg text-white px-4 mt-3'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preferences;
