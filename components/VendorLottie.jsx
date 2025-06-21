'use client';

import Lottie from 'lottie-react';

export default function VendorLottie({ image }) {
  return <Lottie animationData={image} loop={true} />;
}
