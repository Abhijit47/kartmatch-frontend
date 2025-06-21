import { preferences } from '@/constants';
import PreferencesLottie from './PreferencesLottie';

export default function Preferences() {
  return (
    <div className=' w-full py-10 px-6 '>
      {/* Title Section */}
      <h1 className='text-4xl font-semibold text-center text-gray-600'>
        PICK <span className='text-green-600'>ANY 2</span> Preferences
      </h1>

      {/* Card Section */}
      <div className='mt-10 flex flex-wrap justify-around text-center gap-6'>
        {preferences.map((item, index) => (
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
            {/* <Lottie
                      animationData={item.image}
                      loop={true}
                      width={5}
                      height={5}
                      className='w-30 '
                    /> */}
            <PreferencesLottie image={item.image} />
            <h2 className='text-xl text-white font-semibold '>{item.title}</h2>
            <p className='text-lg text-white px-4 mt-3'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
