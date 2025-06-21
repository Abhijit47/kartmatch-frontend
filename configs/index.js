const isDev = process.env.NODE_ENV === 'development' ? true : false;

const BASE_URL = !isDev
  ? process.env.NEXT_PUBLIC_API_BASE_URL_DEV
  : process.env.NEXT_PUBLIC_API_BASE_URL_PROD;

// `https://kartmatch-backend.onrender.com/api/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`;

// `https://kartmatch-backend.onrender.com/api/vendors/${vendorId}`

// 'https://kartmatch-backend.onrender.com/api/forms/submit'

const configs = {
  API_BASE_URL: BASE_URL,
};

export default configs;
