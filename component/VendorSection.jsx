'use client';

// import Vendor1 from '../../../public/assets/Vendor1.png'
// import Vendor2 from '../../../public/assets/Vendor2.png'
// import Vendor3 from '../../../public/assets/Vendor3.png'
// import Vendor4 from '../../../public/assets/Vendor4.png'
// import Vendor5 from '../../../public/assets/Vendor5.png'
import Lottie from 'lottie-react';
// import a4 from '../../frontend/Downloads/4.json';
import a4 from '../Downloads/4.json';
import a7 from '../Downloads/7.json';
import chana from '../Downloads/Chanachur.json';
import puchka from '../Downloads/Puchka.json';
import dosa from '../Downloads/dosa.json';

const vendors = [
  {
    image: a7,
    title: 'VADA PAU SELLER',
    item: 'Vada Pau',
  },
  {
    image: a4,
    title: 'GOOGHNI SELLER',
    item: 'Googhni',
  },
  {
    image: dosa, //a6
    title: 'DOSA SELLER',
    item: 'Dosa and Idli',
  },
  {
    image: puchka,
    title: 'PUCHKA SELLER',
    item: 'Chanachur Garam',
  },
  {
    image: chana,
    title: 'CHANACHUR SELLER',
    item: 'Chanachur Garam',
  },
];

const VendorSection = () => {
  return (
    <div className=' py-12 px-6 p-4'>
      {/* Title Section */}
      <h2 className='text-3xl font-bold text-gray-600  mb-8'>
        MEET THE <span className='text-green-600'>VENDORS</span>
      </h2>

      {/* Vendor Cards */}
      <div className='flex flex-wrap  justify-evenly gap-2 '>
        {vendors.map((vendor, index) => (
          <div key={index} className='text-center '>
            {/* Vendor Image */}
            <div className='w-50  mx-auto '>
              {/* <Image
                src={vendor.image}
                alt={vendor.title}
            
                className="rounded-full object-cover"
              /> */}
              <Lottie
                animationData={vendor.image}
                loop={true}
                // width={5}
                // height={5}
                // className="w-30 "
              />
            </div>
            {/* Vendor Card */}
            <div
              className={`p-8 rounded-2xl text-white  font-semibold shadow-3xl bg-[#22343D]`}>
              <h3 className='font-xl'>{vendor.title}</h3>
              <p className='text-lg font-medium'>{vendor.item}</p>
              <p className='text-md'>HYGIENE RATING: 4</p>
              <p className='text-md'>TASTE RATING: 4</p>
              <p className='text-md'>HOSPITALITY: 4</p>
              <button className='mt-2 text-sm '>GET DIRECTIONS</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorSection;
