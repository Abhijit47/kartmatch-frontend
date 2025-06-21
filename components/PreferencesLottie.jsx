'use client';

import Lottie from 'lottie-react';

export default function PreferencesLottie({ image }) {
  return (
    <Lottie
      animationData={image}
      loop={true}
      width={5}
      height={5}
      className='w-30 '
    />
  );
}
